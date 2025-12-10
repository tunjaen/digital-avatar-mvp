import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AvatarVisual from '@/Components/AvatarVisual';
import VoiceWave from '@/Components/VoiceWave';

export default function Welcome({ relation, avatarName = "Avatar", ownerName = "Your Relative" }) {
    const [started, setStarted] = useState(false);
    const [state, setState] = useState('idle'); // idle, listening, speaking

    // Simulate interaction similar to Chat/Room but simplified
    const toggleInteraction = () => {
        if (state === 'idle') {
            setState('listening');
        } else if (state === 'listening') {
            setTimeout(() => {
                setState('speaking');
                setTimeout(() => {
                    setState('idle');
                }, 3000);
            }, 1000);
        }
    };

    if (!started) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-brand-bg to-white flex flex-col items-center justify-center p-6 text-center font-sans">
                <Head title={`Talking to ${avatarName}`} />

                <div className="mb-10 relative">
                    <AvatarVisual size="xl" className="shadow-2xl" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Hi {relation?.name || 'Guest'}, I'm {avatarName}.
                </h1>
                <p className="text-lg text-gray-500 max-w-md mx-auto mb-12 leading-relaxed">
                    I'm a digital version of {ownerName}. I can remember our past conversations and talk to you just like they would.
                </p>

                <div className="space-y-6 w-full max-w-xs mx-auto">
                    <button
                        onClick={() => setStarted(true)}
                        className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl shadow-xl shadow-brand-primary/40 hover:scale-105 transition-transform"
                    >
                        Start Conversation
                    </button>

                    <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>15 minutes available this month</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col">
            <Head title={`Talking to ${avatarName}`} />

            {/* Simple Header */}
            <div className="p-6 flex justify-between items-center z-10">
                <button onClick={() => setStarted(false)} className="text-gray-400 hover:text-gray-600">
                    Exit
                </button>
                <div className="w-8 h-8 rounded-full border-2 border-brand-primary items-center justify-center flex text-xs font-bold text-brand-primary">
                    15
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 -mt-10">
                <AvatarVisual
                    size="xl"
                    isSpeaking={state === 'speaking'}
                    className="mb-12 shadow-2xl"
                />

                <div className="h-20 flex items-center justify-center w-full max-w-md">
                    <VoiceWave isListening={state === 'listening'} isSpeaking={state === 'speaking'} />
                </div>

                <p className="text-gray-400 h-8 mb-8 font-medium animate-pulse">
                    {state === 'listening' ? "I'm listening..." : state === 'speaking' ? "Speaking..." : "Tap the mic to talk"}
                </p>

                <button
                    onClick={toggleInteraction}
                    className={`
                        w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
                         ${state === 'listening'
                            ? 'bg-red-500 text-white scale-110'
                            : 'bg-white text-brand-primary hover:scale-105'}
                    `}
                >
                    {state === 'listening' ? (
                        <div className="w-8 h-8 bg-white rounded-lg" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
