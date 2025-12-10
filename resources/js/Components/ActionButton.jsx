import React from 'react';

export default function ActionButton({ children, onClick, variant = 'primary', className = '', href }) {
    const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 hover:bg-blue-600",
        secondary: "bg-white text-brand-primary border border-brand-primary/20 hover:bg-brand-soft/10",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        outline: "border-2 border-white/40 text-white hover:bg-white/10"
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </Component>
    );
}
