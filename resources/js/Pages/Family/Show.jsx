import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PremiumCard from '@/Components/PremiumCard';
import ActionButton from '@/Components/ActionButton';
import AvatarVisual from '@/Components/AvatarVisual';
import ProgressBar from '@/Components/ProgressBar';
import MemoryItem from '@/Components/MemoryItem';

export default function Show({ relation }) {
    const messagesEndRef = React.useRef(null);
    const scrollContainerRef = React.useRef(null);

    React.useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [relation.memories]); // Auto-scroll on new message

    const { data, setData, post, processing, reset } = useForm({
        content: '',
        type: 'fact', // fact, story, preference
    });

    const addMemory = (e) => {
        e.preventDefault();
        post(route('memories.store', relation.id), {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    // Voice Recording Logic
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const startRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        // Simulate timer
        const timer = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);
        window.recordingTimer = timer;
    };

    const stopRecording = () => {
        setIsRecording(false);
        clearInterval(window.recordingTimer);
        // Simulate processing -> adding text
        setData('content', "Recorded memory: User mentioned that " + relation.name + " enjoys hiking on weekends.");
    };

    return (
        <DashboardLayout>
            <Head title={relation.name + " - Family Folder"} />

            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <Link href="/family" className="text-sm font-medium text-gray-400 hover:text-brand-primary flex items-center gap-1">
                        &larr; Back to Family Folders
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Sidebar: Profile */}
                    <div className="lg:col-span-1 space-y-6">
                        <PremiumCard className="text-center">
                            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-400">
                                {relation.name.charAt(0)}
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">{relation.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">Added December 10, 2025</p>

                            <div className="mt-6 text-left space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Relationship Confidence</label>
                                    <ProgressBar progress={70} colorClass="bg-green-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Context</label>
                                    <p className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded-xl">
                                        {relation.context_notes || "No context notes provided."}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <Link href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
                                    <span className="font-medium flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-brand-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        Invite Link
                                    </span>
                                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Inactive</span>
                                </Link>
                            </div>
                        </PremiumCard>
                    </div>

                    {/* Main Content: Memories */}
                    <div className="lg:col-span-2 space-y-6">
                        <PremiumCard title="Memory Bank" subtitle={`What the avatar knows about ${relation.name}`}>
                            <div ref={scrollContainerRef} className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {relation.memories && relation.memories.map((memory) => (
                                    <MemoryItem key={memory.id} memory={memory} />
                                ))}
                                {(!relation.memories || relation.memories.length === 0) && (
                                    <div className="text-center py-10 text-gray-400 italic">
                                        No memories recorded yet. Add one below.
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Add Memory Input */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Teach the avatar something new</label>
                                    <span className="text-xs font-semibold text-brand-primary bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                                        Free Plan: 5 min/month left
                                    </span>
                                </div>

                                {!isRecording ? (
                                    <form onSubmit={addMemory} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="flex-grow rounded-xl border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                                            placeholder={`e.g. ${relation.name} loves chocolate cake.`}
                                            required={!isRecording}
                                        />
                                        <button
                                            type="button"
                                            onClick={startRecording}
                                            className="bg-gray-100 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300"
                                            title="Record Audio"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                                            </svg>
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-brand-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50"
                                        >
                                            Add
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex flex-col gap-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                                <span className="font-mono text-red-600 font-bold text-lg">
                                                    00:0{recordingTime}
                                                </span>
                                            </div>
                                            <span className="text-xs text-red-400">Recording...</span>
                                        </div>

                                        {/* Mock Voice Wave */}
                                        <div className="h-8 flex gap-1 items-center justify-center">
                                            {[...Array(10)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-red-300 rounded-full animate-pulse"
                                                    style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                                                ></div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={stopRecording}
                                                className="flex-grow bg-red-100 text-red-700 py-2 rounded-lg font-medium hover:bg-red-200 border border-red-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={stopRecording}
                                                className="flex-grow bg-brand-primary text-white py-2 rounded-lg font-medium hover:bg-blue-600 shadow-md"
                                            >
                                                Process & Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </PremiumCard>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
