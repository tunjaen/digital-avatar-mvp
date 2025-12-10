import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AvatarVisual from '@/Components/AvatarVisual';
import VoiceWave from '@/Components/VoiceWave';
import ActionButton from '@/Components/ActionButton';

export default function Room({ avatar }) {
    const [state, setState] = useState('idle'); // idle, listening, thinking, speaking
    const [transcript, setTranscript] = useState('');
    const [history, setHistory] = useState([]);

    // Simulation logic
    const toggleInteraction = () => {
        if (state === 'idle') {
            setState('listening');
            setTranscript('');
        } else if (state === 'listening') {
            setState('thinking');
            setTimeout(() => {
                setState('speaking');
                setTranscript("Hello! It's great to see you. I've been organizing our family photos.");
                setTimeout(() => {
                    setState('idle');
                    setHistory(prev => [...prev, { role: 'avatar', content: "Hello! It's great to see you. I've been organizing our family photos." }]);
                }, 4000);
            }, 1500);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Chat with Avatar" />

            <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">

                {/* Header Area */}
                <div className="flex justify-between items-center mb-4">
                    <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Link>
                    <div className="text-sm font-medium text-gray-500">
                        {state === 'idle' && 'Ready'}
                        {state === 'listening' && 'Listening...'}
                        {state === 'thinking' && 'Thinking...'}
                        {state === 'speaking' && 'Speaking...'}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                {/* Main Avatar Area */}
                <div className="flex-grow flex flex-col items-center justify-center relative">

                    {/* Dynamic Background Glow */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-b from-brand-soft/20 to-transparent rounded-3xl -z-10 transition-opacity duration-1000
                        ${state === 'listening' ? 'opacity-50' : 'opacity-20'}
                    `}></div>

                    <AvatarVisual
                        size="xl"
                        isSpeaking={state === 'speaking'}
                        className="mb-12 shadow-2xl rounded-full"
                    />

                    {/* Speech Output Bubble */}
                    {(transcript || state === 'thinking') && (
                        <div className={`
                            max-w-lg text-center p-6 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg mb-8 transition-all duration-500
                            ${state === 'thinking' ? 'animate-pulse' : ''}
                        `}>
                            {state === 'thinking' ? (
                                <span className="text-gray-400 italic">Thinking...</span>
                            ) : (
                                <p className="text-xl font-medium text-gray-800 leading-relaxed">
                                    "{transcript}"
                                </p>
                            )}
                        </div>
                    )}

                    {/* Voice Wave Visualization */}
                    <div className="h-16 mb-8">
                        <VoiceWave
                            isListening={state === 'listening'}
                            isSpeaking={state === 'speaking'}
                        />
                    </div>

                </div>

                {/* Bottom Controls */}
                <div className="flex justify-center pb-8">
                    <button
                        onClick={toggleInteraction}
                        className={`
                            h-20 w-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                            ${state === 'listening'
                                ? 'bg-red-500 text-white scale-110 shadow-red-500/30'
                                : 'bg-brand-primary text-white hover:bg-blue-600 hover:scale-105 shadow-brand-primary/30'}
                        `}
                    >
                        {state === 'listening' ? (
                            // Stop / Square icon
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <rect x="6" y="6" width="12" height="12" rx="2" />
                            </svg>
                        ) : (
                            // Mic icon
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                            </svg>
                        )}
                    </button>
                    {state === 'listening' && (
                        <p className="absolute bottom-2 text-xs text-gray-400 animate-pulse">Tap to stop</p>
                    )}
                </div>

            </div>
        </DashboardLayout>
    );
}
