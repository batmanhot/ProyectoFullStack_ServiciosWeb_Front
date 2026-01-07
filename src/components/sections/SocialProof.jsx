const brands = [
    { name: "React", icon: "/icons/REACT-LOGO.webp" },
    { name: "Node.js", icon: "/icons/NODEJS-LOGO.webp" },
    { name: "Next.js", icon: "/icons/NEXTJS-LOGO.webp" },
    { name: "Express", icon: "/icons/EXPRESS-LOGO.webp" },
    { name: "AWS", icon: "/icons/AWS-LOGO.webp" },
    { name: "Python", icon: "/icons/PYTHON.webp" }
];

export function SocialProof() {
    return (
        <div className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-foreground">
                    Tecnologías y Frameworks de confianza
                </h2>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {brands.map((brand) => (
                        <div 
                            key={brand.name} 
                            className="flex items-center gap-3 group opacity-50 hover:opacity-100 transition-opacity duration-300"
                            title={brand.name}
                        >
                            <img
                                src={brand.icon}
                                alt={brand.name}
                                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                                loading="lazy"
                            />
                            <span className="text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                                {brand.name.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
