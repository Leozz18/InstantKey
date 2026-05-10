import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function TicketsIndex({ tickets }) {
    return (
        <SiteLayout>
            <Head title="Supporto" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold mb-2">I miei Ticket</h1>
                <p className="text-slate-400 mb-8">Storico delle tue richieste di supporto</p>

                {tickets.data.length === 0 ? (
                    <div className="card text-center py-16">
                        <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mt-4 text-2xl font-bold">Nessun ticket aperto</h3>
                        <p className="mt-2 text-slate-400">Tutto funziona alla grande! In caso di problemi con una chiave, apri un ticket dalla pagina dell'ordine.</p>
                        <Link href={route('orders.index')} className="mt-6 btn-primary inline-flex">Vedi i miei ordini</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tickets.data.map((t) => (
                            <div key={t.id} className="card">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-bold">{t.subject}</h3>
                                            <StatusBadge status={t.status} />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">
                                            #{t.id} · {new Date(t.created_at).toLocaleString('it-IT')}
                                        </p>
                                    </div>
                                    {t.order_item && (
                                        <Link href={route('orders.show', t.order_item.order.id)} className="text-xs text-brand-400 hover:text-brand-300 shrink-0">
                                            Vedi ordine →
                                        </Link>
                                    )}
                                </div>
                                <p className="text-sm text-slate-300">{t.message}</p>
                                {t.admin_response && (
                                    <div className="mt-4 p-3 rounded-lg bg-brand-500/10 border border-brand-500/30">
                                        <p className="text-xs uppercase tracking-wider text-brand-400 font-bold mb-1">Risposta admin</p>
                                        <p className="text-sm text-slate-200">{t.admin_response}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}

function StatusBadge({ status }) {
    const map = {
        open: ['badge-warning', 'Aperto'],
        in_progress: ['badge-info', 'In lavorazione'],
        resolved: ['badge-success', 'Risolto'],
        closed: ['badge bg-slate-500/20 text-slate-300 border border-slate-500/40', 'Chiuso'],
    };
    const [cls, label] = map[status] || ['badge', status];
    return <span className={cls}>{label}</span>;
}
