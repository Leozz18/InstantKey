import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registrati" />

            <h1 className="text-2xl font-bold text-white text-center">Crea il tuo account</h1>
            <p className="text-center text-slate-400 text-sm mt-1">Inizia a giocare in pochi secondi</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Nome</label>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                        autoFocus
                        className="input-field"
                        required
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        className="input-field"
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        className="input-field"
                        required
                    />
                    {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Conferma password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        className="input-field"
                        required
                    />
                    {errors.password_confirmation && <p className="mt-1 text-xs text-rose-400">{errors.password_confirmation}</p>}
                </div>

                <button type="submit" disabled={processing} className="btn-primary w-full">
                    {processing ? 'Creazione...' : 'Crea account'}
                </button>

                <p className="text-center text-sm text-slate-400">
                    Hai già un account?{' '}
                    <Link href={route('login')} className="text-brand-400 hover:text-brand-300 font-semibold">
                        Accedi
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
