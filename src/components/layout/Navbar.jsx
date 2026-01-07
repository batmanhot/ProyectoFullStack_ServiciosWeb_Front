import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { scrollToSection } from '../../hooks/useScrollToSection';

const navItems = [
    { name: 'Inicio', href: 'home' },
    { name: 'Servicios', href: 'services' },
    { name: 'Portafolio', href: 'portfolio' },
    { name: 'Stack', href: 'stack' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId);
        setIsOpen(false);
    };

    return (
        <nav 
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
            role="navigation"
            aria-label="Navegación principal"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a 
                    href="#" 
                    className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
                    aria-label="DevStudio - Inicio"
                >
                    <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span>DevStudio</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="text-sm font-medium text-muted-foreground relative py-1 px-2 group cursor-pointer bg-transparent border-none"
                            aria-label={`Ir a ${item.name}`}
                        >
                            {item.name}
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                        </motion.button>
                    ))}
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleNavClick('contact')}
                        aria-label="Ir a la sección de contacto"
                    >
                        Contáctame
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav"
                >
                    {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-nav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-white/10"
                        role="navigation"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-sm font-medium hover:text-primary transition-colors text-left bg-transparent border-none cursor-pointer"
                                    aria-label={`Ir a ${item.name}`}
                                >
                                    {item.name}
                                </button>
                            ))}
                            <Button 
                                onClick={() => handleNavClick('contact')}
                                className="w-full"
                                aria-label="Ir a la sección de contacto"
                            >
                                Contáctame
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
