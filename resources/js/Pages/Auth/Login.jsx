import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/translations';

export default function Login({ status, canResetPassword }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title={t('login')} />

            <h1 className="text-2xl font-bold text-white text-center">{t('welcome_back')}</h1>
            <p className="text-center text-slate-400 text-sm mt-1">{t('login_desc')}</p>

            {status && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-sm text-emerald-300">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">{t('email')}</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        autoFocus
                        className="input-field"
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">{t('password')}</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                        className="input-field"
                        required
                    />
                    {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500/40"
                        />
                        <span className="text-sm text-slate-300">{t('remember_me')}</span>
                    </label>
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm text-brand-400 hover:text-brand-300">
                            {t('forgot_password')}
                        </Link>
                    )}
                </div>

                <button type="submit" disabled={processing} className="btn-primary w-full">
                    {processing ? t('logging_in') : t('login')}
                </button>

                <p className="text-center text-sm text-slate-400">
                    {t('no_account')}{' '}
                    <Link href={route('register')} className="text-brand-400 hover:text-brand-300 font-semibold">
                        {t('register')}
                    </Link>
                </p>

                <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-500">
                    <strong className="text-slate-400">{t('demo_accounts')}</strong><br />
                    Admin: admin@instantkey.test / password<br />
                    User: demo@instantkey.test / password
                </div>
            </form>
        </GuestLayout>
    );
}
