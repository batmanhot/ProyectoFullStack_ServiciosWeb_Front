# DevStudio - Desarrollo Web Frontend

Proyecto profesional de portafolio y landing page para una agencia de desarrollo de software.

## 🚀 Mejoras Implementadas (Enero 2026)

### ✅ Validación de Formulario
- **React Hook Form + Zod**: Validación robusta del lado del cliente
- Validación en tiempo real con mensajes de error personalizados
- Estados de carga y feedback visual
- Almacenamiento temporal en localStorage (preparado para backend futuro)

### ✅ SEO Mejorado
- **React Helmet Async**: Gestión de meta tags dinámicos
- Meta tags Open Graph para redes sociales
- Twitter Card tags para mejor compartición
- JSON-LD Structured Data para schema.org
- Canonical URLs
- Keywords y descripción optimizada
- lang="es" en HTML

### ✅ Accesibilidad (A11y)
- Atributos `aria-label`, `aria-hidden`, `aria-invalid` agregados
- Atributos `aria-describedby` en campos de error
- Roles semánticos (role="navigation", role="list", etc.)
- `aria-expanded` y `aria-controls` en menú móvil
- Mejor contraste de colores en mensajes de error
- Navegación con teclado mejorada
- `aria-busy` en botón de envío durante carga

### ✅ Componentes Reutilizables
Nuevos componentes UI para mejor mantenibilidad:
- **Input.jsx**: Input con validación integrada
- **Textarea.jsx**: Textarea con validación integrada
- **SelectInput.jsx**: Select con validación integrada
- Todos con soporte completo para errores

### ✅ Sistema de Scroll Mejorado
- Hook `useScrollToSection()` para navegación limpia
- Scroll suave nativo (CSS `scroll-behavior: smooth`)
- Sin hardcoding de `document.getElementById()`
- Mejor separación de responsabilidades

### ✅ Sistema de Notificaciones
- **Sonner**: Notificaciones toast elegantes
- Feedback visual para éxito/error del formulario
- Mensajes personalizados y duración configurable

### ✅ Mejoras CSS
- Colores **secondary** y **accent** diferenciados
  - Secondary: Violeta (280 85% 60%)
  - Accent: Ámbar (38 92% 50%)
- Smooth scroll habilitado globalmente
- Variables CSS bien organizadas

### ✅ Configuración Meta Tags Base
- Favicon y apple-touch-icon
- Theme color
- Keywords
- Author
- Canonical URL

## 📦 Dependencias Nuevas

```json
{
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "react-helmet-async": "^2.x",
  "sonner": "^1.x"
}
```

## 🏗️ Estructura de Archivos

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx (mejorado)
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx (mejorado)
│   │   ├── Services.jsx (mejorado)
│   │   ├── Contact.jsx (completamente reescrito)
│   │   ├── Portfolio.jsx
│   │   ├── SocialProof.jsx
│   │   └── TechStack.jsx
│   ├── ui/
│   │   ├── Button.jsx (mejorado)
│   │   ├── Input.jsx (NUEVO)
│   │   ├── Textarea.jsx (NUEVO)
│   │   ├── SelectInput.jsx (NUEVO)
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Section.jsx
│   │   └── Background.jsx
│   └── SEO.jsx (NUEVO)
├── hooks/
│   └── useScrollToSection.js (NUEVO)
├── schemas/
│   └── contact.schema.js (NUEVO)
├── lib/
│   └── utils.js
├── App.jsx (mejorado)
└── main.jsx
```

## 🎨 Colores Actualizados

```css
--primary: 217 91% 60%;          /* Azul */
--secondary: 280 85% 60%;        /* Violeta */
--accent: 38 92% 50%;            /* Ámbar */
--background: 240 10% 3.9%;      /* Casi negro */
--foreground: 0 0% 98%;          /* Casi blanco */
--muted: 240 3.7% 15.9%;         /* Gris oscuro */
```

## ✨ Características Destacadas

### Formulario de Contacto
- ✅ Validación completa con Zod
- ✅ Mensajes de error contextuales
- ✅ Estado de envío con spinner
- ✅ Notificación toast al completar
- ✅ Almacenamiento en localStorage (demo)
- ✅ Preparado para integración con API backend

### SEO
- ✅ Meta tags dinámicos
- ✅ Open Graph para compartición
- ✅ Schema.org estructurado
- ✅ Canonical URLs
- ✅ Sitio multiidioma listo (lang="es")

### Accesibilidad
- ✅ WCAG 2.1 AA compatible
- ✅ Navegación por teclado
- ✅ Lector de pantalla amigable
- ✅ Contraste de colores mejorado
- ✅ Etiquetas semánticas HTML5

## 🔧 Próximas Mejoras (Backend)

- [ ] Integración con API backend
- [ ] Autenticación de usuario
- [ ] Sistema de pagos
- [ ] Email real (SendGrid/Resend)
- [ ] Database (PostgreSQL/MongoDB)
- [ ] Analytics avanzado

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 📝 Notas

- Los datos del formulario se guardan en localStorage para demo (reemplazar con API)
- React Helmet maneja los meta tags dinámicamente
- Scroll smooth habilitado con CSS nativo
- Todos los componentes son accesibles por defecto

## 👨‍💻 Autor

DevStudio - Desarrollo Full Stack de Alto Nivel
