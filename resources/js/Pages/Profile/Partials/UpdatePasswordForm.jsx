import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-white">Aggiorna password</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Usa una password lunga e casuale per mantenere il tuo account sicuro.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Password attuale</label>
                    <input
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        className="input-field"
                    />
                    {errors.current_password && <p className="mt-1 text-xs text-rose-400">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Nuova password</label>
                    <input
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        className="input-field"
                    />
                    {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Conferma nuova password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        className="input-field"
                    />
                    {errors.password_confirmation && <p className="mt-1 text-xs text-rose-400">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={processing} className="btn-primary">
                        Aggiorna password
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-400">Password aggiornata.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
