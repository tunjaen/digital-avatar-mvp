import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, avatar }) {
    const [activeTab, setActiveTab] = useState('basic');

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        step: 'basic',
        name: avatar?.name || '',
        voice_id: avatar?.voice_id || '',
        expressiveness_level: avatar?.expressiveness_level || 'balanced',
        voice_sample: null,
        data: avatar?.personality_profiles?.basic || {},
    });

    const handleSubmit = (e, step) => {
        e.preventDefault();
        setData('step', step);

        // We use post with method spoofing for file uploads, if needed. 
        // Here we just use post and handle it in update
        post(route('avatar.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        setData('voice_sample', e.target.files[0]);
    };

    // State for nested personality sliders if not in flat data
    // We'll manage them via the main 'data' object or separate fields. 
    // For MVP transparency, we'll map them to the 'data' JSON blob.

    // Safety check for data initialization
    const initialIntermediate = avatar?.personality_profiles?.intermediate || {
        empathy: 50,
        humor: 50,
        verbosity: 50
    };

    const handleSliderChange = (key, value) => {
        const newData = { ...initialIntermediate, ...data.data, [key]: value };
        // We update the main data blob which gets sent as 'data' param
        setData('data', newData);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Avatar Configuration</h2>}
        >
            <Head title="Configure Avatar" />

            <div className="py-12 bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Premium Tabs */}
                    <div className="flex justify-center space-x-8 mb-8">
                        {['basic', 'intermediate', 'advanced'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 ${activeTab === tab
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Glassmorphism Card */}
                    <div className="glass-card p-8 rounded-2xl animate-float" style={{ animationDuration: '10s' }}>

                        {activeTab === 'basic' && (
                            <section className="max-w-2xl mx-auto">
                                <header className="text-center mb-8">
                                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Core Identity
                                    </h2>
                                    <p className="mt-2 text-gray-400">
                                        Establish the foundational presence of your digital self.
                                    </p>
                                </header>

                                <form onSubmit={(e) => handleSubmit(e, 'basic')} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Avatar Name</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Voice ID (ElevenLabs)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                value={data.voice_id}
                                                onChange={(e) => setData('voice_id', e.target.value)}
                                                placeholder="e.g. 21m00Tcm4TlvDq8ikWAM"
                                            />
                                            {data.voice_id && (
                                                <span className="flex items-center text-green-400 text-xl">✓</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700 border-dashed hover:border-indigo-500 transition-colors">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Clone Your Voice</label>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-400
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-600 file:text-white
                                                hover:file:bg-indigo-700
                                                cursor-pointer"
                                        />
                                        <p className="mt-2 text-xs text-gray-500">Upload a high-quality recording (1-2 mins) for instant cloning.</p>
                                        {errors.voice_sample && <div className="text-red-400 text-xs mt-1">{errors.voice_sample}</div>}
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            disabled={processing}
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all"
                                        >
                                            Save Identity
                                        </button>
                                    </div>
                                    {recentlySuccessful && <p className="text-center text-green-400 text-sm animate-pulse">Changes Saved Successfully</p>}
                                </form>
                            </section>
                        )}

                        {activeTab === 'intermediate' && (
                            <section className="max-w-2xl mx-auto">
                                <header className="text-center mb-10">
                                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                        Personality Matrix
                                    </h2>
                                    <p className="mt-2 text-gray-400">
                                        Fine-tune the behavioral parameters of your avatar.
                                    </p>
                                </header>

                                <form onSubmit={(e) => handleSubmit(e, 'intermediate')} className="space-y-10">

                                    {/* Empathy Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-300 font-medium">
                                            <span>Logical / Stoic</span>
                                            <span className="text-teal-400">Empathy Level</span>
                                            <span>Emotional / Warm</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            defaultValue={initialIntermediate.empathy}
                                            onChange={(e) => handleSliderChange('empathy', e.target.value)}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    {/* Humor Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-300 font-medium">
                                            <span>Serious</span>
                                            <span className="text-teal-400">Humor & Wit</span>
                                            <span>Playful</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            defaultValue={initialIntermediate.humor}
                                            onChange={(e) => handleSliderChange('humor', e.target.value)}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    {/* Verbosity Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-300 font-medium">
                                            <span>Concise</span>
                                            <span className="text-teal-400">Verbosity</span>
                                            <span>Detailed</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            defaultValue={initialIntermediate.verbosity}
                                            onChange={(e) => handleSliderChange('verbosity', e.target.value)}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button
                                            disabled={processing}
                                            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1 transition-all"
                                        >
                                            Update Matrix
                                        </button>
                                    </div>
                                    {recentlySuccessful && <p className="text-center text-green-400 text-sm animate-pulse">Matrix Updated</p>}
                                </form>
                            </section>
                        )}

                        {activeTab === 'advanced' && (
                            <section className="max-w-2xl mx-auto text-center">
                                <header className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                                        Deep Memory
                                    </h2>
                                    <p className="mt-2 text-gray-400">
                                        Manage long-term knowledge and critical life events.
                                    </p>
                                </header>
                                <div className="p-10 border-2 border-dashed border-gray-700 rounded-xl bg-gray-800/30">
                                    <p className="text-gray-500 italic">Advanced memory editing features coming in v1.1</p>
                                    <p className="text-xs text-gray-600 mt-2">Use "Family Folders" to add specific memories for now.</p>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
