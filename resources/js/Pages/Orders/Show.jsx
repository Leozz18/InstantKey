import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function OrdersShow({ order }) {
    const [revealed, setRevealed] = useState({});
    const [copied, setCopied] = useState({});
    const [ticketModal, setTicketModal] = useState(null);

    const reveal = (id) => setRevealed({ ...revealed, [id]: true });

    const copy = (id, text) => {
        navigator.clipboard?.writeText(text);
        setCopied({ ...copied, [id]: true });
        setTimeout(() => setCopied((prev) => ({ ...prev, [id]: false })), 2000);
    };

    return (
        <SiteLayout>
            <Head title={`Ordine ${order.order_number}`} />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
                <Link href={route('orders.index')} className="btn-ghost mb-6">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                    Torna agli ordini
                </Link>

                <div className="card mb-6 bg-gradient-to-br from-emerald-500/10 to-brand-500/10 border-emerald-500/40">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold">Pagamento confermato!</h1>
                            <p className="text-slate-300 mt-1">Le tue chiavi sono state assegnate e sono visibili qui sotto.</p>
                            <p className="text-xs text-slate-400 mt-2">Ordine <span className="font-mono text-slate-200">{order.order_number}</span> · {new Date(order.paid_at || order.created_at).toLocaleString('it-IT')}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Le tue chiavi</h2>
                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div key={item.id} className="card">
                            <div className="flex items-start gap-4">
                                <Link href={route('products.show', item.product.slug)} className="shrink-0">
                                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-800">
                                        {item.product.image_url && (
                                            <img src={item.product.image_url} alt={item.product.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link href={route('products.show', item.product.slug)} className="font-bold hover:text-brand-400 transition">
                                        {item.product.title}
                                    </Link>
                                    {item.product.platform && (
                                        <span
                                            className="badge-platform text-[10px] mt-1 inline-flex"
                                            style={{ borderColor: item.product.platform.color, color: item.product.platform.color }}
                                        >
                                            {item.product.platform.name}
                                        </span>
                                    )}
                                    <p className="mt-1 text-sm text-slate-400">€ {Number(item.unit_price).toFixed(2)}</p>
                                </div>
                            </div>

                            {item.key ? (
                                <div className="mt-5 p-4 rounded-lg bg-slate-950 border border-slate-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Chiave di attivazione</span>
                                        <span className="badge-success text-[10px]">Consegnata</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 font-mono text-base lg:text-lg p-3 rounded bg-slate-900 border border-slate-800 select-all break-all">
                                            {revealed[item.id] ? item.key.key_code : '••••• ••••• ••••• ••••• •••••'}
                                        </code>
                                        {!revealed[item.id] ? (
                                            <button onClick={() => reveal(item.id)} className="btn-secondary !py-3">
                                                Mostra
                                            </button>
                                        ) : (
                                            <button onClick={() => copy(item.id, item.key.key_code)} className="btn-secondary !py-3">
                                                {copied[item.id] ? '✓ Copiata' : 'Copia'}
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-3 text-xs text-slate-500">
                                        Riscatta questa chiave nel client {item.product.platform?.name} per attivare il gioco. Conservala in un luogo sicuro.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/40 text-sm text-rose-300">
                                    Chiave non ancora assegnata. Contatta il supporto.
                                </div>
                            )}

                            {!item.ticket && item.key && (
                                <button
                                    onClick={() => setTicketModal(item.id)}
                                    className="mt-3 text-xs text-slate-400 hover:text-brand-400 transition"
                                >
                                    La chiave non funziona? Apri un ticket →
                                </button>
                            )}
                            {item.ticket && (
                                <div className="mt-3 text-xs text-amber-300">
                                    Ticket #{item.ticket.id} aperto · stato: {item.ticket.status}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="card mt-6">
                    <h2 className="font-bold text-lg mb-4">Riepilogo pagamento</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-400">Subtotale</span><span>€ {Number(order.subtotal).toFixed(2)}</span></div>
                        {Number(order.discount_amount) > 0 && (
                            <div className="flex justify-between text-emerald-400">
                                <span>Sconto {order.discount_code?.code ? `(${order.discount_code.code})` : ''}</span>
                                <span>−€ {Number(order.discount_amount).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between"><span className="text-slate-400">Metodo</span><span className="uppercase">{order.payment_method}</span></div>
                        <div className="border-t border-slate-800 pt-3 mt-3 flex justify-between text-xl font-extrabold">
                            <span>Totale pagato</span>
                            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                                € {Number(order.total_price).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {ticketModal && (
                <TicketModal
                    orderItemId={ticketModal}
                    onClose={() => setTicketModal(null)}
                />
            )}
        </SiteLayout>
    );
}

function TicketModal({ orderItemId, onClose }) {
    const form = useForm({
        order_item_id: orderItemId,
        subject: 'Chiave non funzionante',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('tickets.store'), {
            onSuccess: () => onClose(),
            preserveScroll: true,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur" onClick={onClose}>
            <div className="card max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Apri ticket di supporto</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Oggetto</label>
                        <input
                            value={form.data.subject}
                            onChange={(e) => form.setData('subject', e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Descrivi il problema</label>
                        <textarea
                            value={form.data.message}
                            onChange={(e) => form.setData('message', e.target.value)}
                            rows="5"
                            className="input-field"
                            placeholder="Spiega cosa è successo quando hai provato a riscattare la chiave..."
                            required
                        />
                        {form.errors.message && <p className="text-rose-400 text-sm mt-1">{form.errors.message}</p>}
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button type="button" onClick={onClose} className="btn-secondary">Annulla</button>
                        <button type="submit" disabled={form.processing} className="btn-primary">
                            {form.processing ? 'Invio...' : 'Invia ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
