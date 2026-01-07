import { cn } from '../../lib/utils';

export function Section({ className, id, children, ...props }) {
    return (
        <section id={id} className={cn("py-16 md:py-24 px-4 container mx-auto", className)} {...props}>
            {children}
        </section>
    );
}
