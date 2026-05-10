import { Head } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function Contact() {
    const [sent, setSent] = useState(false);

    return (
        <SiteLayout>
            <Head title="Contatti" />

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-extrabold mb-2">Contattaci</h1>
                <p className="text-slate-400 mb-10">Hai domande? Siamo qui per aiutarti.</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                    <div className="card text-center">
                        <div className="text-3xl mb-2">📧</div>
                        <p className="text-xs uppercase tracking-wider text-slate-400">Email</p>
                        <p className="font-semibold mt-1">support@instantkey.com</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">💬</div>
                        <p className="text-xs uppercase tracking-wider text-slate-400">Live chat</p>
                        <p className="font-semibold mt-1">Lun-Ven 9-18</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">⚡</div>
                        <p className="text-xs uppercase tracking-wider text-slate-400">Tempo risposta</p>
                        <p className="font-semibold mt-1">&lt; 2 ore</p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                    className="card space-y-4"
                >
                    {sent && (
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-sm">
                            Messaggio ricevuto! Ti risponderemo entro 2 ore.
                        </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Nome</label>
                            <input className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input type="email" className="input-field" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Oggetto</label>
                        <input className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Messaggio</label>
                        <textarea rows="6" className="input-field" required />
                    </div>
                    <button type="submit" className="btn-primary w-full">Invia messaggio</button>
                </form>
            </div>
        </SiteLayout>
    );
}
