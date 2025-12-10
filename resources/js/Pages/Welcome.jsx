import { Head, Link } from '@inertiajs/react';
import AvatarVisual from '@/Components/AvatarVisual';
import ActionButton from '@/Components/ActionButton';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className="bg-brand-bg relative min-h-screen font-sans selection:bg-brand-primary selection:text-white overflow-hidden">
            <Head title="Welcome to Digital Avatar" />

            {/* Background Gradients */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand-soft/20 rounded-full blur-[100px]"></div>
            <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-brand-lavender/20 rounded-full blur-[100px]"></div>

            <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col min-h-screen">

                {/* Header / Nav */}
                <header className="flex justify-between items-center py-8 z-10">
                    <div className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        Avatar<span className="text-brand-primary">Digital</span>
                    </div>
                    <nav className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2.5 rounded-xl font-medium bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-grow flex items-center justify-center py-12 lg:py-0">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left: Text Content */}
                        <div className="space-y-8 text-center lg:text-left animate-in slide-in-from-bottom-8 duration-700">
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                                Your digital <br />
                                legacy, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-lavender">preserved forever.</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Create a personalized digital avatar that learns your voice, personality, and memories. Stay connected with your loved ones, anytime, anywhere.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <ActionButton href={auth.user ? route('dashboard') : route('register')} className="w-full sm:w-auto px-8 py-4 text-lg">
                                    {auth.user ? 'Enter Dashboard' : 'Create Your Avatar'}
                                </ActionButton>
                                <a href="#features" className="text-gray-500 hover:text-gray-900 font-medium px-6 py-3">
                                    Learn how it works
                                </a>
                            </div>

                            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${(i + 2) * 100}`}></div>
                                    ))}
                                </div>
                                <span>Trusted by 10,000+ early adopters</span>
                            </div>
                        </div>

                        {/* Right: Visual */}
                        <div className="relative flex justify-center lg:justify-end animate-in fade-in duration-1000 delay-300">
                            {/* Decor elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gray-200 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-gray-100 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                            {/* Main Avatar Card */}
                            <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white/50 w-full max-w-md transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <AvatarVisual size="xl" isSpeaking={true} />
                                    <div className="mt-8 text-center space-y-4 w-full">
                                        <div className="bg-gray-100 h-4 w-3/4 mx-auto rounded-full animate-pulse"></div>
                                        <div className="bg-gray-100 h-4 w-1/2 mx-auto rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="mt-8 flex gap-4 w-full justify-center">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                            </svg>
                                        </div>
                                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="py-8 text-center text-gray-400 text-sm">
                    &copy; 2025 Digital Avatar Project. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
