import React from 'react';

export default function PremiumCard({ children, className = '', title, subtitle, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white/80 backdrop-blur-md 
                border border-white/50 
                rounded-3xl shadow-premium 
                p-6 transition-all duration-300
                ${onClick ? 'cursor-pointer hover:shadow-premium-hover hover:scale-[1.02]' : ''}
                ${className}
            `}
        >
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
