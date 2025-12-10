import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Relations({ auth }) {
    const [relations, setRelations] = useState([]);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        context_notes: '',
    });

    useEffect(() => {
        fetchRelations();
    }, []);

    const fetchRelations = async () => {
        try {
            const response = await axios.get(route('relations.index'));
            setRelations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('relations.store'), {
            onSuccess: () => {
                reset();
                fetchRelations();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Family Folders</h2>}
        >
            <Head title="Family & Relations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Add New Relation Form */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add New Family Member</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Create a folder for a specific person (e.g., "Daughter", "Mom").
                                </p>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Name / Relation</label>
                                    <input
                                        type="text"
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. Maria (Daughter)"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Context Notes</label>
                                    <textarea
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.context_notes}
                                        onChange={(e) => setData('context_notes', e.target.value)}
                                        placeholder="Things the avatar should know about this person..."
                                    />
                                </div>

                                <div>
                                    <button
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        Create Folder
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* List Existing Relations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relations.map((relation) => (
                            <div key={relation.id} className="p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg border-l-4 border-indigo-500">
                                <h3 className="text-lg font-bold dark:text-white">{relation.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{relation.context_notes}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                                        {relation.memories_count} Memories
                                    </span>
                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await axios.post(route('relations.invite', relation.id));
                                                navigator.clipboard.writeText(res.data.url);
                                                alert('Invite Link Copied to Clipboard!');
                                            } catch (e) {
                                                alert('Failed to generate invite.');
                                            }
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
                                    >
                                        Share Invite 🔗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
