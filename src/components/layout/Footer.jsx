import { Code2 } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-white/10 py-12">
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 font-bold text-xl">
                    <Code2 className="h-6 w-6 text-primary" />
                    <span>DevStudio</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                    Transformando ideas en experiencias digitales excepcionales.
                </p>
                <p className="text-xs text-muted-foreground/50">
                    © {new Date().getFullYear()} DevStudio. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
