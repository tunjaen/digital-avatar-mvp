import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PremiumCard from '@/Components/PremiumCard';
import ActionButton from '@/Components/ActionButton';
import AvatarVisual from '@/Components/AvatarVisual';
import ProgressBar from '@/Components/ProgressBar';

export default function Invite({ relations = [] }) {
    const [selectedRelation, setSelectedRelation] = useState(null);
    const [minutes, setMinutes] = useState(15);
    const [generatedLink, setGeneratedLink] = useState('');

    const generateLink = () => {
        if (!selectedRelation) return;

        axios.post(route('relations.invite', selectedRelation.id))
            .then(res => {
                setGeneratedLink(res.data.url);
            })
            .catch(err => {
                console.error(err);
                alert("Could not generate link. Please try again.");
            });
    };

    return (
        <DashboardLayout>
            <Head title="Share your Avatar" />

            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-brand-primary flex items-center gap-1">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Share your Digital Self</h1>
                    <p className="text-gray-500 mt-2">Give a loved one access to talk to your avatar.</p>
                </div>

                <PremiumCard className="space-y-8">

                    {/* 1. Select Person */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">1. Select Recipient</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {relations.length > 0 ? (
                                relations.map((relation) => (
                                    <div
                                        key={relation.id}
                                        onClick={() => { setSelectedRelation(relation); setGeneratedLink(''); }}
                                        className={`
                                            p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all
                                            ${selectedRelation?.id === relation.id
                                                ? 'border-brand-primary bg-blue-50/50 ring-2 ring-brand-primary/20'
                                                : 'border-gray-200 hover:border-brand-primary/50'}
                                        `}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${selectedRelation?.id === relation.id ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {relation.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-900">{relation.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500 mb-2">No family members found.</p>
                                    <Link href="/family" className="text-brand-primary font-medium hover:underline">
                                        Create a Family Folder first
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Configure Access */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">2. Monthly Access Limit</label>
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-3xl font-bold text-brand-primary">{minutes} <span className="text-lg text-gray-500 font-normal">minutes</span></span>
                                <span className="text-sm text-gray-400">Resets monthly</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="120"
                                step="5"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>5 min</span>
                                <span>2 hours</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Generate */}
                    <div className="pt-4">
                        {!generatedLink ? (
                            <ActionButton onClick={generateLink} className="w-full justify-center">
                                Generate Secure Link
                            </ActionButton>
                        ) : (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
                                <p className="text-green-800 font-medium text-center mb-3">Link Generated Successfully!</p>
                                <div className="flex gap-2">
                                    <input
                                        readOnly
                                        value={generatedLink}
                                        className="flex-grow bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-2 focus:outline-none"
                                    />
                                    <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </PremiumCard>
            </div>
        </DashboardLayout>
    );
}
