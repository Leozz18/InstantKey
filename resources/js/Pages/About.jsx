import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function About() {
    return (
        <SiteLayout>
            <Head title="Chi siamo" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-extrabold mb-6">Chi siamo</h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                    INSTANT KEY è una piattaforma e-commerce ad alte prestazioni specializzata nella distribuzione automatizzata di licenze digitali per videogiochi.
                </p>

                <div className="card mb-6">
                    <h2 className="text-2xl font-bold mb-3">La nostra missione</h2>
                    <p className="text-slate-300">
                        Risolvere i due principali problemi del mercato delle chiavi digitali: la lentezza nella consegna e i prezzi gonfiati degli store ufficiali. Grazie a un'architettura moderna (Laravel + React + Inertia.js) e a un sistema di consegna automatizzato, garantiamo l'erogazione del codice di attivazione in meno di 5 secondi dal pagamento.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="card">
                        <h3 className="font-bold text-lg mb-2">Approvvigionamento smart</h3>
                        <p className="text-sm text-slate-300">Acquistiamo le chiavi durante i sale stagionali e dai mercati internazionali a basso costo, mantenendo prezzi vantaggiosi per i giocatori europei.</p>
                    </div>
                    <div className="card">
                        <h3 className="font-bold text-lg mb-2">Sicurezza certificata</h3>
                        <p className="text-sm text-slate-300">HTTPS/TLS obbligatorio, autenticazione 2FA opzionale con TOTP, CSRF protection nativa Laravel, rate limiting sugli endpoint critici.</p>
                    </div>
                    <div className="card">
                        <h3 className="font-bold text-lg mb-2">Consegna istantanea</h3>
                        <p className="text-sm text-slate-300">Pipeline automatizzata che preleva la chiave dal pool del database non appena il gateway di pagamento conferma la transazione.</p>
                    </div>
                    <div className="card">
                        <h3 className="font-bold text-lg mb-2">Supporto reattivo</h3>
                        <p className="text-sm text-slate-300">Sistema di ticketing che verifica automaticamente la validità della chiave e, se invalida, eroga una sostituzione immediata.</p>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-brand-500/10 to-accent-500/10 border-brand-500/40">
                    <h2 className="text-2xl font-bold mb-3">Stack tecnologico</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                        <div><span className="text-slate-400">Frontend:</span> <strong>React 18</strong></div>
                        <div><span className="text-slate-400">SPA bridge:</span> <strong>Inertia.js</strong></div>
                        <div><span className="text-slate-400">Styling:</span> <strong>TailwindCSS</strong></div>
                        <div><span className="text-slate-400">Backend:</span> <strong>Laravel 11</strong></div>
                        <div><span className="text-slate-400">Linguaggio:</span> <strong>PHP 8.3</strong></div>
                        <div><span className="text-slate-400">DB:</span> <strong>MariaDB / SQLite</strong></div>
                        <div><span className="text-slate-400">Auth:</span> <strong>Breeze + 2FA</strong></div>
                        <div><span className="text-slate-400">Pagamenti:</span> <strong>Stripe + PayPal</strong></div>
                        <div><span className="text-slate-400">Search:</span> <strong>Meilisearch</strong></div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
