import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import PremiumCard from '@/Components/PremiumCard';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <DashboardLayout>
            <Head title="Profile" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                    <p className="text-gray-500">Manage your profile, password, and account security.</p>
                </div>

                <PremiumCard title="Profile Information" subtitle="Update your account's profile information and email address.">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </PremiumCard>

                <PremiumCard title="Update Password" subtitle="Ensure your account is using a long, random password to stay secure.">
                    <UpdatePasswordForm className="max-w-xl" />
                </PremiumCard>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-600 mb-6">
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                    </p>
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </DashboardLayout>
    );
}
