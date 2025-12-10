import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import ActionButton from '@/Components/ActionButton';
import ToggleSwitch from '@/Components/ToggleSwitch';

export default function Personality({ auth }) {
    const [tone, setTone] = useState(50); // 0 = Serious, 100 = Playful
    const [warmth, setWarmth] = useState(75); // 0 = Distant, 100 = Warm
    const [useEmojis, setUseEmojis] = useState(true);

    return (
        <DashboardLayout>
            <Head title="Personality Tuning" />

            <div className="max-w-2xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/avatar/config" className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Personality Tuning</h1>
                        <p className="text-sm text-gray-500">Fine-tune how your avatar interacts.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-10">

                    {/* Slider Question 1 */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-gray-900">Tone of Voice</label>
                            <span className="text-sm text-brand-primary font-medium">
                                {tone < 30 ? 'Serious' : tone > 70 ? 'Playful' : 'Balanced'}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>More Serious</span>
                            <span>More Playful</span>
                        </div>
                        <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                            "A more playful tone will use more jokes and casual language, while a serious tone maintains professionalism."
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Slider Question 2 */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-gray-900">Emotional Warmth</label>
                            <span className="text-sm text-brand-primary font-medium">
                                {warmth}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={warmth}
                            onChange={(e) => setWarmth(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Analytical</span>
                            <span>Empathetic</span>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Toggle Question */}
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="font-semibold text-gray-900 block">Use Emojis</label>
                            <p className="text-sm text-gray-500">Allow the avatar to visual express emotions in text.</p>
                        </div>
                        <ToggleSwitch enabled={useEmojis} setEnabled={setUseEmojis} />
                    </div>

                    <div className="pt-6">
                        <ActionButton className="w-full">Save Changes</ActionButton>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
