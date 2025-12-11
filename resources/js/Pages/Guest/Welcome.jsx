import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AvatarVisual from '@/Components/AvatarVisual';
import VoiceWave from '@/Components/VoiceWave';

export default function Welcome({ relation, avatarName = "Avatar", ownerName = "Your Relative" }) {
    const [started, setStarted] = useState(false);
    const [state, setState] = useState('idle'); // idle, listening, speaking, thinking
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Mock Conversation Flow
    const addMessage = (text, sender) => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        addMessage(inputText, 'user');
        setInputText('');
        setState('thinking');

        // Simulate AI Response
        setTimeout(() => {
            setState('speaking');
            setTimeout(() => {
                addMessage("That's really interesting! Tell me more about that.", 'avatar');
                setState('idle');
            }, 3000);
        }, 1500);
    };

    const toggleVoiceInteraction = () => {
        if (state === 'idle') {
            setState('listening');
            // Simulate voice recognition delay
            setTimeout(() => {
                setState('thinking');
                addMessage("I'm doing great, thanks for asking!", 'user'); // Mock recognized text
                setTimeout(() => {
                    setState('speaking');
                    setTimeout(() => {
                        addMessage("I'm so glad to hear that. I've been thinking about you.", 'avatar');
                        setState('idle');
                    }, 3000);
                }, 1500);
            }, 2000);
        }
    };

    if (!started) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-brand-bg to-white flex flex-col items-center justify-center p-6 text-center font-sans tracking-tight">
                <Head title={`Talking to ${avatarName}`} />

                <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                    <AvatarVisual size="xl" className="shadow-2xl relative z-10" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    Hi {relation?.name || 'Guest'}, I'm {avatarName}.
                </h1>
                <p className="text-lg text-gray-500 max-w-md mx-auto mb-12 leading-relaxed font-medium">
                    I'm a digital version of {ownerName}. I can remember our past conversations and talk to you just like they would.
                </p>

                <div className="space-y-6 w-full max-w-xs mx-auto relative z-20">
                    <button
                        onClick={() => setStarted(true)}
                        className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl shadow-xl shadow-brand-primary/40 hover:scale-105 hover:shadow-brand-primary/50 transition-all duration-300"
                    >
                        Start Conversation
                    </button>

                    <div className="flex justify-center items-center gap-2 text-sm text-gray-400 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>15 minutes available this month</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-brand-bg relative overflow-hidden flex flex-col font-sans">
            <Head title={`Talking to ${avatarName}`} />

            {/* Header */}
            <div className="p-4 md:p-6 flex justify-between items-center z-10 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
                <button
                    onClick={() => setStarted(false)}
                    className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    End Chat
                </button>
                <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 items-center justify-center flex text-xs font-bold text-brand-primary">
                    15 mins left
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col relative overflow-hidden">

                {/* 1. Avatar Visual (Fixed Top/Center) */}
                <div className="flex-none flex justify-center py-6 transition-all duration-500 ease-in-out">
                    <AvatarVisual
                        size={messages.length > 0 ? "lg" : "xl"}
                        isSpeaking={state === 'speaking'}
                        className="shadow-2xl shadow-brand-primary/20 transition-all duration-500"
                    />
                </div>

                {/* 2. Transcript (Scrollable) */}
                <div className="flex-grow overflow-y-auto px-4 md:px-6 space-y-4 custom-scrollbar pb-40">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-10 animate-in fade-in zoom-in duration-500">
                            <p>Start talking to {avatarName}...</p>
                        </div>
                    )}
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`
                                max-w-[80%] p-4 rounded-2xl text-base leading-relaxed shadow-sm
                                ${msg.sender === 'user'
                                    ? 'bg-brand-primary text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}
                            `}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {state === 'thinking' && (
                        <div className="flex justify-start animate-in fade-in">
                            <div className="bg-white text-gray-500 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div className="h-4" /> {/* Spacer */}
                </div>
            </div>

            {/* Bottom Controls (Input + Voice) */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 z-20 pb-8">
                <div className="max-w-3xl mx-auto flex items-end gap-3">

                    {/* Voice Button */}
                    <button
                        onClick={toggleVoiceInteraction}
                        className={`
                            flex-none w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                             ${state === 'listening'
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-brand-primary text-white hover:bg-blue-600'}
                        `}
                    >
                        {state === 'listening' ? (
                            <div className="w-4 h-4 bg-white rounded-sm" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                            </svg>
                        )}
                    </button>

                    {/* Text Input */}
                    <form onSubmit={handleTextSubmit} className="flex-grow relative">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={state === 'listening' ? "Listening..." : "Type a message..."}
                            disabled={state === 'listening'}
                            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-brand-primary focus:ring-brand-primary rounded-xl transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-primary hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </button>
                    </form>

                </div>

                {/* Visualizer (Optional Mini-view when listening) */}
                {state !== 'idle' && (
                    <div className="h-6 flex items-center justify-center gap-1 mt-2 opacity-50">
                        <VoiceWave isListening={state === 'listening'} isSpeaking={state === 'speaking'} />
                    </div>
                )}
            </div>
        </div>
    );
}
