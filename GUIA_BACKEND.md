# 🔌 Guía de Integración Backend

Este documento explica cómo integrar el backend cuando estés listo.

## 📦 Estado Actual del Frontend

El frontend está **100% funcional** y usa `localStorage` como almacenamiento temporal:

```javascript
// En Contact.jsx
const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
submissions.push({ ...data, timestamp: new Date().toISOString() });
localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
```

## 🔄 Pasos para Integración Backend

### Paso 1: Crear Endpoint API

Crea un endpoint en tu backend (Node.js, Python, etc.):

```javascript
// Ejemplo con Express.js
app.post('/api/contact', async (req, res) => {
  const { name, email, projectType, message } = req.body;
  
  try {
    // Validar en backend también
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Campos requeridos' });
    }
    
    // Guardar en database
    const submission = await ContactSubmission.create({
      name,
      email,
      projectType,
      message,
      timestamp: new Date(),
    });
    
    // Enviar email
    await sendEmail(email, submission);
    
    res.json({ success: true, id: submission.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar' });
  }
});
```

### Paso 2: Actualizar Contact.jsx

Reemplaza `localStorage` con llamada a API:

```javascript
// En src/components/sections/Contact.jsx
const onSubmit = async (data) => {
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error('Error en servidor');
    
    const result = await response.json();
    
    setSubmitStatus('success');
    reset();
    toast.success('¡Mensaje enviado exitosamente!');
    
  } catch (error) {
    setSubmitStatus('error');
    toast.error('Error al enviar el mensaje');
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Paso 3: Configurar CORS (si es necesario)

Si el backend está en otro dominio:

```javascript
// Backend (Express.js)
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
}));
```

### Paso 4: Variables de Entorno

Crea `.env.local` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
```

Usa en el código:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const response = await fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  body: JSON.stringify(data),
});
```

### Paso 5: Manejo de Errores

Mejora el manejo de errores:

```javascript
const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSubmitStatus(null);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.status === 400) {
      throw new Error('Datos inválidos');
    }
    if (response.status === 500) {
      throw new Error('Error del servidor. Intenta más tarde.');
    }
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    
    const result = await response.json();
    
    setSubmitStatus('success');
    reset();
    toast.success('¡Mensaje enviado! Te contactaré pronto.');
    
  } catch (error) {
    setSubmitStatus('error');
    
    if (error.name === 'AbortError') {
      toast.error('La solicitud tardó demasiado. Intenta de nuevo.');
    } else {
      toast.error(error.message || 'Error al enviar el mensaje');
    }
    
    console.error('Form error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Paso 6: Envío de Emails

Usa servicios como SendGrid o Resend:

**Opción A: SendGrid**

```javascript
// Backend
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (toEmail, data) => {
  await sgMail.send({
    to: toEmail,
    from: 'noreply@devstudio.com',
    subject: 'Confirmación de tu contacto',
    html: `
      <h1>Hola ${data.name}</h1>
      <p>Recibimos tu mensaje. Te contactaremos pronto.</p>
    `,
  });
  
  // Email al admin
  await sgMail.send({
    to: 'admin@devstudio.com',
    from: 'noreply@devstudio.com',
    subject: `Nuevo contacto: ${data.name}`,
    html: `
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Tipo:</strong> ${data.projectType}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `,
  });
};
```

**Opción B: Resend (más moderno)**

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (toEmail, data) => {
  await resend.emails.send({
    from: 'DevStudio <onboarding@resend.dev>',
    to: toEmail,
    subject: 'Confirmación de tu contacto',
    html: `<h1>Hola ${data.name}</h1>...`,
  });
};
```

## 🗄️ Estructura de Database

### Ejemplo con PostgreSQL

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  project_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread', -- unread, contacted, closed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON contact_submissions(email);
CREATE INDEX idx_created_at ON contact_submissions(created_at);
```

### Con Mongoose (MongoDB)

```javascript
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, match: /.+@.+\..+/ },
  projectType: { type: String, required: true },
  message: { type: String, required: true, maxlength: 2000 },
  status: { type: String, enum: ['unread', 'contacted', 'closed'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactSubmission', contactSchema);
```

## 🔐 Seguridad

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // 3 requests por IP
  message: 'Demasiados contactos. Intenta más tarde.',
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  // ...
});
```

### Sanitización

```javascript
const xss = require('xss');
const validator = require('validator');

const cleanData = {
  name: xss(validator.escape(data.name)),
  email: validator.isEmail(data.email) ? data.email : null,
  message: xss(validator.escape(data.message)),
};
```

## 📊 Admin Panel (Opcional)

Crear dashboard para ver contactos:

```javascript
// GET /api/admin/submissions
app.get('/api/admin/submissions', authenticateAdmin, async (req, res) => {
  const { page = 1, status = 'unread' } = req.query;
  
  const submissions = await ContactSubmission.find({ status })
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ createdAt: -1 });
  
  res.json(submissions);
});

// PUT /api/admin/submissions/:id
app.put('/api/admin/submissions/:id', authenticateAdmin, async (req, res) => {
  const submission = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  
  res.json(submission);
});
```

## 🧪 Testing

Prueba el formulario con curl:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "projectType": "web",
    "message": "Necesito un sitio web profesional para mi empresa"
  }'
```

## 📋 Checklist de Integración

- [ ] Backend API creado y testeado
- [ ] Endpoint `/api/contact` funcional
- [ ] CORS configurado
- [ ] Variables de entorno configuradas
- [ ] Emails configurados (SendGrid/Resend)
- [ ] Database schema creado
- [ ] Contact.jsx actualizado
- [ ] Pruebas en desarrollo
- [ ] Pruebas en producción
- [ ] Monitoreo de errores (Sentry)

## 🚀 Despliegue

### Frontend (Vercel)

```bash
npm run build
# Conecta Vercel a tu repositorio Git
```

### Backend (Heroku, Railway, etc.)

```bash
# Variables de entorno necesarias:
DATABASE_URL=postgresql://...
SENDGRID_API_KEY=...
JWT_SECRET=...
CORS_ORIGIN=https://tudominio.com
```

---

¡Cuando el backend esté listo, el frontend se integrará sin problemas! 🎉
