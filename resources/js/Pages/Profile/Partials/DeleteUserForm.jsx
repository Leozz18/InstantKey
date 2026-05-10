import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        reset();
    };

    return (
        <section className={`space-y-4 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-rose-400">Elimina account</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Una volta eliminato, l'account non potrà essere recuperato. Esporta i dati che vuoi conservare prima di procedere.
                </p>
            </header>

            <button onClick={() => setConfirming(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-700">
                Elimina account
            </button>

            {confirming && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur" onClick={closeModal}>
                    <form onSubmit={submit} className="card max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-white">Sei sicuro di voler eliminare l'account?</h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Tutti i dati saranno eliminati definitivamente. Inserisci la tua password per confermare.
                        </p>

                        <input
                            ref={passwordInput}
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="input-field mt-4"
                        />
                        {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}

                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" onClick={closeModal} className="btn-secondary">Annulla</button>
                            <button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 font-semibold text-white hover:bg-rose-700">
                                Elimina definitivamente
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
