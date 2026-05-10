import SiteLayout from '@/Layouts/SiteLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <SiteLayout>
            <Head title="Profilo" />

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <h1 className="text-4xl font-extrabold">Il mio profilo</h1>

                <div className="card">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                </div>

                <div className="card">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="card border-rose-500/30">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </SiteLayout>
    );
}
