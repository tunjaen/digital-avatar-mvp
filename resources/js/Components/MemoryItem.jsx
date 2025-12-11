import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MemoryItem({ memory }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(memory.content);

    const handleUpdate = () => {
        router.patch(route('memories.update', memory.id), {
            content: editContent
        }, {
            onSuccess: () => setIsEditing(false),
            preserveScroll: true
        });
    };

    return (
        <div className="p-4 rounded-xl border border-gray-100 bg-white/50 hover:bg-white hover:shadow-sm transition-all group">
            {isEditing ? (
                <div className="flex gap-2 items-start">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full rounded-lg border-gray-300 text-sm focus:border-brand-primary focus:ring-brand-primary"
                        rows="2"
                    />
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={handleUpdate}
                            className="bg-brand-primary text-white p-1.5 rounded-lg hover:bg-blue-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => { setIsEditing(false); setEditContent(memory.content); }}
                            className="bg-gray-200 text-gray-600 p-1.5 rounded-lg hover:bg-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <p className="text-gray-800">{memory.content}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-brand-primary transition-opacity p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            )}
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <span>Type: {memory.type}</span>
                <span>{new Date(memory.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}
