import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

const stackCategories = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"]
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express", "NestJS", "Python", "Django"]
    },
    {
        title: "Data & Analytics",
        skills: ["Power BI", "Power Query", "SQL Server", "SSIS", "Analysis Services"]
    },
    {
        title: "Base de Datos",
        skills: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "SQL Server"]
    },
    {
        title: "Infraestructura & Cloud",
        skills: ["AWS", "Docker", "Render"]
    },
    {
        title: "Móviles",
        skills: ["React Native"]
    }
];

export function TechStack() {
    return (
        <Section id="stack" className="bg-muted/5 relative overflow-hidden">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Stack Tecnológico</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Dominio completo del ciclo de vida del desarrollo software.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {stackCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full hover:border-primary/30 transition-colors bg-white/5 border-white/5">
                            <h3 className="text-xl font-bold mb-6 text-primary">{category.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-md bg-background/50 border border-white/10 text-xs font-medium text-foreground/80 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
