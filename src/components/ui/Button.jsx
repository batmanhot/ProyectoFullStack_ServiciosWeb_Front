import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
};

export function Button({ 
    className, 
    variant = "primary", 
    size = "default", 
    children,
    disabled = false,
    type = "button",
    ...props 
}) {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                size === "default" && "h-10 px-4 py-2",
                size === "sm" && "h-9 rounded-md px-3",
                size === "lg" && "h-11 rounded-md px-8",
                className
            )}
            type={type}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
}
