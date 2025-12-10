import React from 'react';

export default function AvatarVisual({ size = 'md', isSpeaking = false, className = '' }) {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-24 h-24',
        lg: 'w-48 h-48',
        xl: 'w-64 h-64',
        full: 'w-full h-full'
    };

    return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size] || sizeClasses.md} ${className}`}>
            {/* Outer Glow */}
            <div className={`absolute inset-0 bg-brand-soft/30 rounded-full blur-2xl transition-all duration-500 ${isSpeaking ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

            {/* Inner Circle / Avatar Placeholder */}
            <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-tr from-brand-lavender to-brand-soft p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {/* Placeholder illustration */}
                    <div className="w-3/4 h-3/4 bg-brand-primary/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1/2 h-1/2 text-brand-primary">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Speaking Ripple Effect */}
            {isSpeaking && (
                <>
                    <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 border border-brand-primary/10 rounded-full animate-ping delay-150"></div>
                </>
            )}
        </div>
    );
}
