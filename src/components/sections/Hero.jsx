import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { ArrowRight, Code2 } from 'lucide-react';
import { scrollToSection } from '../../hooks/useScrollToSection';

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    }),
};

export function Hero() {
    const words = ["Transformo", "datos", "en", "decisiones", "y", "visiones", "en", "software."];

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" id="home">

            {/* 3D Floating Element Mockup */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
                    aria-hidden="true"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full dashed"
                    aria-hidden="true"
                />
            </div>

            <Section className="relative z-10 text-center flex flex-col items-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                        <Code2 className="w-4 h-4" aria-hidden="true" />
                        Desarrollo Full Stack de Alto Nivel
                    </span>
                </motion.div>

                <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                    {words.map((word, i) => (
                        <motion.span
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            key={i}
                            className="inline-block mr-3 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Soluciones robustas para problemas complejos. No solo escribo código; diseño la arquitectura que tu negocio necesita para escalar sin límites.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <Button 
                        size="lg" 
                        className="text-lg px-8 h-12 shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)]"
                        onClick={() => scrollToSection('contact')}
                        aria-label="Agendar una consultoría gratuita"
                    >
                        Agenda una consultoría gratuita
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="text-lg px-8 h-12 border-white/10 hover:bg-white/5"
                        onClick={() => scrollToSection('portfolio')}
                        aria-label="Ver portafolio"
                    >
                        Ver Portafolio
                    </Button>
                </motion.div>
            </Section>
        </div>
    );
}
