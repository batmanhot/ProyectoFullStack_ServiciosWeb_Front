import { useState } from 'react';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal'; // Import Modal
import { ArrowUpRight, Calendar, CheckCircle2 } from 'lucide-react';

const projects = [
    {
        title: "Optimización E-commerce",
        problem: "Sitio lento y alta tasa de abandono.",
        solution: "Reescritura en Next.js y optimización de base de datos.",
        result: "Reducción de carga en 3s y aumento de ventas del 25%.",
        tags: ["Next.js", "PostgreSQL", "AWS"],
        image: "/images/ecommerce.png",
        fullStory: {
            background: "La empresa 'ModaDirecta' se enfrentaba a una crisis durante el Black Friday. Su antigua plataforma monolítica no soportaba más de 500 usuarios concurrentes, colapsando bajo presión y generando pérdidas estimadas en $50k por hora de caída.",
            challenge: "El reto no era solo técnico, sino de negocio: necesitaban migrar sin detener las ventas diarias. La base de datos estaba desnormalizada y las consultas tardaban hasta 4 segundos en completarse.",
            execution: "Implementamos una arquitectura headless con Next.js en el frontend para renderizado estático (SSG) de catálogos. Dividimos el backend en microservicios clave y optimizamos queries SQL, indexando correctamente las tablas de inventario.",
            outcome: "En el siguiente Black Friday, el sitio soportó 15,000 usuarios simultáneos sin un solo milisegundo de inactividad. La velocidad de carga pasó de 4.5s a 0.8s, disparando la conversión móvil."
        }
    },
    {
        title: "Dashboard Analítico Fintech",
        problem: "Datos dispersos y reportería manual.",
        solution: "Dashboard en tiempo real con React y D3.js.",
        result: "Ahorro de 20 horas semanales en análisis manual.",
        tags: ["React", "D3.js", "Python"],
        image: "/images/fintech.png",
        fullStory: {
            background: "El departamento de tesorería de 'FinGlobal' dependía de 40 hojas de cálculo de Excel diferentes para generar su reporte de liquidez diario. Este proceso manual tomaba 4 horas cada mañana, con alto riesgo de error humano.",
            challenge: "Centralizar fuentes de datos heterogéneas (APIs bancarias, ERP legado y CSVs) en una única fuente de verdad visual que se actualizara en tiempo real.",
            execution: "Construimos un pipeline de datos ETL con Python que alimentaba una base de datos analítica. Para el frontend, diseñamos componentes de D3.js encapsulados en React, permitiendo interactividad profunda (drill-down) en gráficos financieros complejos.",
            outcome: "El reporte ahora se genera automáticamente a las 8:00 AM. El equipo financiero recuperó 20 horas semanales que ahora dedican a estrategia en lugar de 'copiar y pegar' datos."
        }
    },
    {
        title: "App de Gestión Logística",
        problem: "Errores humanos por procesos en papel.",
        solution: "WebApp progresiva (PWA) con modo offline.",
        result: "Eliminación del 90% de errores de inventario.",
        tags: ["PWA", "Node.js", "Mongo"],
        image: "/images/logistics.png",
        fullStory: {
            background: "En los almacenes de 'LogiTrans', los operarios usaban planillas de papel para el picking. La sincronización con el sistema central se hacía al final del turno, provocando discrepancias constantes de stock.",
            challenge: "Crear una solución digital para un entorno hostil (almacenes sin buena conectividad WiFi) y para usuarios no nativos digitales.",
            execution: "Desarrollamos una Progressive Web App (PWA) con estrategia 'Offline-First'. La app almacena las transacciones localmente en IndexedDB y sincroniza en segundo plano cuando detecta conexión. Diseñamos una interfaz UI de alto contraste con botones grandes para uso con guantes.",
            outcome: "Los errores de inventario cayeron un 90% en el primer mes. La visibilidad del stock pasó de ser 'diaria' a 'tiempo real', optimizando la ruta de los camiones de reparto."
        }
    }
];

export function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <Section id="portfolio" className="bg-background">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de Éxito</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    No solo entrego código, entrego resultados medibles.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <Card key={index} delay={index * 0.1} className="flex flex-col h-full hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden border-white/5">
                        {/* Project Image */}
                        <div className="h-48 w-full overflow-hidden relative group cursor-pointer" onClick={() => setSelectedProject(project)}>
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 flex-grow text-sm">
                                <div>
                                    <span className="font-semibold text-foreground">Problema:</span>
                                    <p className="text-muted-foreground line-clamp-2">{project.problem}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-foreground">Solución:</span>
                                    <p className="text-muted-foreground line-clamp-2">{project.solution}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-between group"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    Ver Historia Completa
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal de Detalles */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div>
                        <div className="h-64 w-full relative">
                            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Story Section */}
                            <div>
                                <h4 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                                    El Contexto
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    {selectedProject.fullStory.background}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-red-400">⚡</span> El Desafío
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                                        {selectedProject.fullStory.challenge}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-green-400">💡</span> La Solución
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                                        {selectedProject.fullStory.execution}
                                    </p>
                                </div>
                            </div>

                            {/* Outcome Box */}
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Impacto y Resultados
                                </h4>
                                <p className="text-foreground font-medium leading-relaxed">
                                    {selectedProject.fullStory.outcome}
                                </p>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-white/5">
                                <Button onClick={() => document.getElementById('contact').scrollIntoView() || setSelectedProject(null)}>
                                    Quiero un resultado así
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </Section>
    );
}
