import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function TicketsIndex({ tickets }) {
    return (
        <SiteLayout>
            <Head title="Gestione Ticket" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold">Ticket di Supporto</h1>
                        <p className="text-slate-400">Gestisci le richieste di assistenza e le chiavi non funzionanti</p>
                    </div>
                    <Link href={route('admin.dashboard')} className="btn-ghost">
                        Torna alla Dashboard
                    </Link>
                </div>

                <div className="card overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-4 font-semibold">ID</th>
                                <th className="p-4 font-semibold">Utente</th>
                                <th className="p-4 font-semibold">Prodotto (Ordine)</th>
                                <th className="p-4 font-semibold">Data</th>
                                <th className="p-4 font-semibold">Stato</th>
                                <th className="p-4 font-semibold">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {tickets.data.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-900/50 transition">
                                    <td className="p-4 text-slate-500 font-mono">#{ticket.id}</td>
                                    <td className="p-4">
                                        <div className="font-semibold">{ticket.user?.name}</div>
                                        <div className="text-xs text-slate-500">{ticket.user?.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-semibold">{ticket.order_item?.product?.title || 'Prodotto eliminato'}</div>
                                    </td>
                                    <td className="p-4 text-slate-400">
                                        {new Date(ticket.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="p-4">
                                        {ticket.status === 'open' ? (
                                            <span className="badge-warning">Aperto</span>
                                        ) : (
                                            <span className="badge-success">Risolto</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Link href={route('admin.tickets.show', ticket.id)} className="btn-ghost text-xs py-1 px-2">
                                            {ticket.status === 'open' ? 'Gestisci' : 'Visualizza'}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {tickets.data.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        Nessun ticket presente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {tickets.links && tickets.links.length > 3 && (
                        <div className="mt-6 flex flex-wrap gap-1 justify-center">
                            {tickets.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-brand-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
}
