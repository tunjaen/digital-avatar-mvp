import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PremiumCard from '@/Components/PremiumCard';
import ActionButton from '@/Components/ActionButton';
import AvatarVisual from '@/Components/AvatarVisual';

export default function Index({ relations }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        context_notes: '',
    });
    const [showModal, setShowModal] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('family.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Family Folders" />

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Family Folders</h1>
                        <p className="text-gray-500 mt-1">Manage who your avatar knows and what it remembers about them.</p>
                    </div>
                    <ActionButton onClick={() => setShowModal(true)}>
                        + Add New Member
                    </ActionButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relations.map((relation) => (
                        <PremiumCard
                            key={relation.id}
                            onClick={() => window.location.href = route('family.show', relation.id)}
                            className="cursor-pointer hover:bg-white transition-colors group relative"
                        >
                            <div className="flex items-center gap-4">
                                <AvatarVisual size="sm" className="w-16 h-16" />
                                {/* Ideally this would be their uploaded photo, using avatar visual as placeholder */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                                        {relation.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{relation.memories_count} memories saved</p>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-lg text-gray-500">Family</span>
                                <span className="px-2 py-1 bg-green-50 text-xs rounded-lg text-green-600">Active</span>
                            </div>
                        </PremiumCard>
                    ))}

                    {relations.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No family members added yet.</p>
                            <button onClick={() => setShowModal(true)} className="text-brand-primary font-bold mt-2 hover:underline">Add the first one</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Modal for MVP */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Family Member</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                    placeholder="e.g. Grandma Alice"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Relationship / Context</label>
                                <textarea
                                    value={data.context_notes}
                                    onChange={(e) => setData('context_notes', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                    placeholder="Briefly describe who this is..."
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-brand-primary text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-brand-primary/30"
                                >
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
