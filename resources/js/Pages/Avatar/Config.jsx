import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PremiumCard from '@/Components/PremiumCard';
import ProgressBar from '@/Components/ProgressBar';
import AvatarVisual from '@/Components/AvatarVisual';
import ActionButton from '@/Components/ActionButton';

export default function Config({ auth }) {
    // Mock data - would normally come from props
    const completion = {
        voice: 100,
        personality: 40,
        memory: 25,
        family: 80
    };

    return (
        <DashboardLayout>
            <Head title="Configure Avatar" />

            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center mb-10">
                    <AvatarVisual size="lg" className="mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900">Configure Your Digital Self</h1>
                    <p className="text-gray-500 mt-2">Customize how your avatar speaks, thinks, and remembers.</p>
                </div>

                {/* Voice Section */}
                <PremiumCard className="relative overflow-hidden group">
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                            </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-xl font-bold text-gray-900">Voice Synthesis</h3>
                            <p className="text-gray-500 text-sm mt-1">Status: <span className="text-green-600 font-medium">Cloned & Active</span></p>
                            <div className="mt-4 w-full max-w-xs mx-auto sm:mx-0">
                                <ProgressBar progress={completion.voice} label="Voice Model Accuracy" colorClass="bg-green-500" />
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <ActionButton variant="secondary">Retrain Voice</ActionButton>
                        </div>
                    </div>
                </PremiumCard>

                {/* Personality Section */}
                <PremiumCard className="relative overflow-hidden group transition-all hover:bg-white">
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-xl font-bold text-gray-900">Personality & Traits</h3>
                            <p className="text-gray-500 text-sm mt-1">Define how you express yourself.</p>
                            <div className="mt-4 w-full max-w-xs mx-auto sm:mx-0">
                                <ProgressBar progress={completion.personality} label="Profile Completeness" colorClass="bg-purple-500" />
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <ActionButton href="/avatar/edit/personality">Continue Setup</ActionButton>
                        </div>
                    </div>
                </PremiumCard>

                {/* Memory & Family */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <PremiumCard className="hover:bg-blue-50/30 cursor-pointer" onClick={() => window.location.href = '/family'}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900">Family Folders</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">Manage what your avatar knows about specific people.</p>
                        <ProgressBar progress={completion.family} label="Relationships Mapped" />
                    </PremiumCard>

                    <PremiumCard className="hover:bg-amber-50/30 cursor-pointer" onClick={() => { }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900">Life Memories</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">General knowledge about your past, career, and tastes.</p>
                        <ProgressBar progress={completion.memory} label="Timeline Filled" colorClass="bg-amber-500" />
                    </PremiumCard>
                </div>
            </div>
        </DashboardLayout>
    );
}
