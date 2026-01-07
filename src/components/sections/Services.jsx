import { Code, Database, LineChart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

const services = [
    {
        icon: <Code className="h-10 w-10 text-primary mb-4" />,
        title: "Desarrollo de Software",
        description: "Construcción de productos digitales escalables (Web & Mobile). Aplicamos arquitecturas modernas (microservicios, arquitectura limpia) y metodologías ágiles (Scrum, Kanban) para entregas rápidas y de calidad."
    },
    {
        icon: <Database className="h-10 w-10 text-primary mb-4" />,
        title: "Arquitectura de Datos",
        description: "Diseño y optimización de Bases de Datos (SQL/NoSQL) con patrones arquitectónicos robusto, garantizando integridad, seguridad y rapidez en tus operaciones."
    },
    {
        icon: <LineChart className="h-10 w-10 text-primary mb-4" />,
        title: "BI & Analytics",
        description: "Conversión de datos crudos en dashboards accionables con metodologías data-driven para que tomes decisiones estratégicas basadas en información real."
    }
];

export function Services() {
    return (
        <Section id="services" className="bg-muted/10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluciones Integrales</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Enfoque estratégico para potenciar tu negocio con tecnología de punta.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
                {services.map((service, index) => (
                    <article key={index} role="listitem">
                        <Card delay={index * 0.1} className="hover:border-primary/50 transition-colors">
                            <span aria-hidden="true">{service.icon}</span>
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </Card>
                    </article>
                ))}
            </div>
        </Section>
    );
}
