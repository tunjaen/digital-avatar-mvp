import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AvatarVisual from '@/Components/AvatarVisual';
import PremiumCard from '@/Components/PremiumCard';
import ProgressBar from '@/Components/ProgressBar';
import ActionButton from '@/Components/ActionButton';

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* Left Column: Avatar & Status */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    <PremiumCard className="flex flex-col items-center text-center">
                        <div className="mb-6">
                            <AvatarVisual size="xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">My Digital Self</h2>
                        <p className="text-sm text-gray-500 mb-6">Online • Ready to chat</p>

                        <div className="w-full space-y-2 mb-6 text-left">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Customization</p>
                            <ProgressBar progress={65} label="Overall Completion" />
                        </div>

                        <ActionButton href="/avatar/config" className="w-full">
                            Configure Avatar
                        </ActionButton>
                    </PremiumCard>

                    <PremiumCard title="Quick Stats">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Interactions</span>
                                <span className="font-bold text-gray-900">24</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Family Members</span>
                                <span className="font-bold text-gray-900">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Minutes Used</span>
                                <span className="font-bold text-gray-900 text-brand-primary">45 / 100</span>
                            </div>
                        </div>
                    </PremiumCard>
                </div>

                {/* Right Column: Content */}
                <div className="md:col-span-8 lg:col-span-9 space-y-8">

                    {/* Welcome Section */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {auth.user.name}</h1>
                        <p className="text-gray-500 text-lg">Your avatar has been learning from your recent interactions.</p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <PremiumCard
                            title="Cloned Voice"
                            subtitle="Status: Active and Ready"
                            className="bg-gradient-to-br from-white to-blue-50/50"
                            onClick={() => window.location.href = '/avatar/config'}
                        >
                            <div className="h-24 flex items-center justify-center text-brand-primary/20 mb-2">
                                {/* Visual placeholder for voice wave */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                </svg>
                            </div>
                        </PremiumCard>

                        <PremiumCard
                            title="Family Folders"
                            subtitle="3 Active Connections"
                            className="bg-gradient-to-br from-white to-indigo-50/50"
                            onClick={() => window.location.href = '/family'}
                        >
                            <div className="h-24 flex items-center justify-center text-brand-lavender mb-2">
                                <div className="flex -space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
                                </div>
                            </div>
                        </PremiumCard>
                    </div>

                    {/* Active Memories / Recent Activity */}
                    <PremiumCard title="Recent Memory Updates">
                        <div className="space-y-4">
                            {[
                                { text: "Learned that you prefer coffee over tea in the mornings.", time: "2 hours ago" },
                                { text: "Added 'Cousin Maria' to the family tree.", time: "1 day ago" },
                                { text: "Updated voice tone to be slightly more empathetic.", time: "2 days ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-brand-primary shrink-0"></div>
                                    <div>
                                        <p className="text-gray-800 text-sm font-medium">{item.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PremiumCard>

                    <div className="flex justify-end">
                        <Link href="/share" className="text-brand-primary font-medium hover:text-blue-700 flex items-center gap-2">
                            Send Avatar to a loved one
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
