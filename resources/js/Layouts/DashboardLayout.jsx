import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-brand-bg font-sans text-gray-900 selection:bg-brand-primary selection:text-white">
            {/* Minimalist Top Nav */}
            <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-xl font-bold tracking-tight text-brand-primary">
                                Avatar<span className="text-gray-900">Digital</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm font-medium text-gray-500 hidden sm:block">
                                Hello, {auth.user.name}
                            </div>
                            <img
                                className="h-8 w-8 rounded-full border border-gray-200"
                                src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=random`}
                                alt={auth.user.name}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
