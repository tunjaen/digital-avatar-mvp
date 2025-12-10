import React from 'react';

export default function VoiceWave({ isListening = false, isSpeaking = false }) {
    if (!isListening && !isSpeaking) return null;

    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`
                        w-1.5 rounded-full bg-brand-primary
                        ${isSpeaking ? 'animate-[bounce_1s_infinite]' : 'h-1.5'}
                        ${isListening && !isSpeaking ? 'animate-pulse h-3 bg-brand-soft' : ''}
                    `}
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? undefined : (isListening ? '12px' : '4px')
                    }}
                ></div>
            ))}
        </div>
    );
}
