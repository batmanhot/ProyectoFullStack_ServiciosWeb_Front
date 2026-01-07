import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { SelectInput } from '../ui/SelectInput';
import { Mail, Clock, DollarSign, Check, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../../schemas/contact.schema';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const projectOptions = [
    { value: "web", label: "Desarrollo Web / App" },
    { value: "data", label: "Consultoría de Datos" },
    { value: "bi", label: "Dashboards / BI" },
    { value: "other", label: "Otro" }
];

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(contactFormSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulación de envío - sin backend en esta fase
            // En producción, aquí iría una llamada a tu API backend
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Guardar datos en localStorage para referencia (puede ser reemplazado por backend)
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push({
                ...data,
                timestamp: new Date().toISOString(),
            });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            setSubmitStatus('success');
            reset();
            toast.success('¡Mensaje enviado exitosamente!', {
                description: 'Te contactaré pronto para discutir tu proyecto.',
                duration: 5000,
            });
        } catch (error) {
            setSubmitStatus('error');
            toast.error('Error al enviar el mensaje', {
                description: 'Por favor intenta nuevamente más tarde.',
                duration: 5000,
            });
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <Section id="contact" className="bg-background relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hablemos de tu Proyecto</h2>
                        <p className="text-muted-foreground">
                            Cuéntame sobre tus desafíos y encontremos la mejor solución.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4">¿Por qué trabajar conmigo?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Clock 
                                        className="h-6 w-6 text-primary mt-1 flex-shrink-0" 
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <span className="font-semibold block">Tiempos Claros</span>
                                        <span className="text-sm text-muted-foreground">Entregas puntuales y comunicación constante.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <DollarSign 
                                        className="h-6 w-6 text-primary mt-1 flex-shrink-0" 
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <span className="font-semibold block">Presupuesto Transparente</span>
                                        <span className="text-sm text-muted-foreground">Sin costos ocultos ni sorpresas finales.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail 
                                        className="h-6 w-6 text-primary mt-1 flex-shrink-0" 
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <span className="font-semibold block">Soporte Directo</span>
                                        <span className="text-sm text-muted-foreground">Hablas directamente conmigo, no con intermediarios.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <Card className="p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                                {submitStatus === 'success' && (
                                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-green-700 dark:text-green-400">¡Éxito!</p>
                                            <p className="text-xs text-green-600 dark:text-green-400">Tu mensaje fue enviado correctamente.</p>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-red-700 dark:text-red-400">Error</p>
                                            <p className="text-xs text-red-600 dark:text-red-400">Hubo un problema al enviar tu mensaje.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="name"
                                        label="Nombre"
                                        placeholder="Tu nombre"
                                        required
                                        error={errors.name?.message}
                                        {...register('name')}
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        label="Email"
                                        placeholder="tu@email.com"
                                        required
                                        error={errors.email?.message}
                                        {...register('email')}
                                    />
                                </div>

                                <SelectInput
                                    id="projectType"
                                    label="Tipo de Proyecto"
                                    options={projectOptions}
                                    required
                                    error={errors.projectType?.message}
                                    {...register('projectType')}
                                />

                                <Textarea
                                    id="message"
                                    label="Detalles"
                                    placeholder="Breve descripción de lo que necesitas..."
                                    className="min-h-[120px]"
                                    required
                                    error={errors.message?.message}
                                    {...register('message')}
                                />

                                <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isSubmitting || !isValid}
                                    aria-busy={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="inline-block animate-spin mr-2">⏳</span>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Mensaje'
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </Section>
        </>
    );
}
