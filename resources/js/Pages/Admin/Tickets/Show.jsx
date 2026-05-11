import { Head, Link, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function TicketsShow({ ticket }) {
    const { data, setData, post, processing, errors } = useForm({
        resolution: '',
        replace_key: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tickets.resolve', ticket.id));
    };

    return (
        <SiteLayout>
            <Head title={`Gestione Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold flex items-center gap-3">
                            Ticket #{ticket.id}
                            {ticket.status === 'open' ? (
                                <span className="badge-warning text-sm mt-1">Aperto</span>
                            ) : (
                                <span className="badge-success text-sm mt-1">Risolto</span>
                            )}
                        </h1>
                        <p className="text-slate-400">Aperto da {ticket.user?.name} il {new Date(ticket.created_at).toLocaleDateString('it-IT')}</p>
                        <p className="text-white font-bold mt-2">Oggetto: {ticket.subject}</p>
                    </div>
                    <Link href={route('admin.tickets.index')} className="btn-ghost">
                        Torna ai Ticket
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Dettagli Segnalazione</h2>
                            <div className="bg-slate-900 rounded p-4 border border-slate-800 text-slate-300 whitespace-pre-wrap">
                                {ticket.message}
                            </div>
                        </div>

                        {ticket.status === 'open' && (
                            <div className="card border-brand-500/40">
                                <h2 className="text-xl font-bold mb-4">Risoluzione</h2>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Messaggio di Risoluzione (inviato all'utente)</label>
                                        <textarea
                                            className="input-field min-h-[120px]"
                                            value={data.resolution}
                                            onChange={e => setData('resolution', e.target.value)}
                                            required
                                            placeholder="Spiega come è stato risolto il problema..."
                                        ></textarea>
                                        {errors.resolution && <p className="text-rose-500 text-xs mt-1">{errors.resolution}</p>}
                                    </div>

                                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={data.replace_key} 
                                                onChange={e => setData('replace_key', e.target.checked)} 
                                                className="mt-1 rounded bg-slate-800 border-slate-700 text-brand-500 focus:ring-brand-500" 
                                            />
                                            <div>
                                                <span className="block font-semibold">Sostituisci Chiave</span>
                                                <span className="text-sm text-slate-400">La chiave attuale verrà marcata come 'invalid' e ne verrà assegnata automaticamente una nuova dal pool (se disponibile).</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button type="submit" disabled={processing} className="btn-primary">
                                            Risolvi Ticket
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {ticket.status === 'resolved' && (
                            <div className="card border-emerald-500/40 bg-emerald-500/5">
                                <h2 className="text-xl font-bold mb-4 text-emerald-400">Dettagli Risoluzione</h2>
                                <div className="text-slate-300 whitespace-pre-wrap">
                                    {ticket.admin_response || "Nessuna nota fornita."}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="font-bold mb-4 text-slate-300 border-b border-slate-800 pb-2">Info Ordine</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Prodotto</span>
                                    <span className="font-semibold">{ticket.orderItem?.product?.title}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Piattaforma</span>
                                    <span>{ticket.orderItem?.product?.platform?.name}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Chiave Assegnata</span>
                                    <code className="bg-slate-900 px-2 py-1 rounded text-brand-400 select-all border border-slate-800 inline-block mt-1">
                                        {ticket.orderItem?.key?.key_code || 'N/A'}
                                    </code>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Stato Chiave</span>
                                    {ticket.orderItem?.key?.status === 'invalid' ? (
                                        <span className="text-rose-400">Invalida</span>
                                    ) : (
                                        <span className="text-emerald-400">Venduta</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="font-bold mb-4 text-slate-300 border-b border-slate-800 pb-2">Info Utente</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Nome</span>
                                    <span className="font-semibold">{ticket.user?.name}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500 text-xs uppercase tracking-wider">Email</span>
                                    <span>{ticket.user?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
