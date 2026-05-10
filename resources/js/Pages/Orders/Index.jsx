import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function OrdersIndex({ orders }) {
    return (
        <SiteLayout>
            <Head title="I miei ordini" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold mb-8">I miei ordini</h1>

                {orders.data.length === 0 ? (
                    <div className="card text-center py-16">
                        <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/>
                        </svg>
                        <h3 className="mt-4 text-2xl font-bold">Nessun ordine ancora</h3>
                        <p className="mt-2 text-slate-400">I tuoi acquisti appariranno qui.</p>
                        <Link href={route('catalog.index')} className="mt-6 btn-primary inline-flex">
                            Esplora il catalogo
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <Link
                                key={order.id}
                                href={route('orders.show', order.id)}
                                className="card flex items-center gap-6 hover:border-brand-500/50 transition"
                            >
                                <div className="flex -space-x-2">
                                    {order.items.slice(0, 3).map((item) => (
                                        <div key={item.id} className="w-12 h-14 rounded-lg overflow-hidden border-2 border-slate-900 bg-slate-800">
                                            {item.product?.image_url && (
                                                <img src={item.product.image_url} alt={item.product.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="w-12 h-14 rounded-lg bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold">{order.order_number}</span>
                                        <StatusBadge status={order.payment_status} />
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {new Date(order.created_at).toLocaleString('it-IT')} · {order.items.length} {order.items.length === 1 ? 'articolo' : 'articoli'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-2xl font-extrabold">€ {Number(order.total_price).toFixed(2)}</p>
                                    <span className="text-xs text-slate-500 uppercase">{order.payment_method}</span>
                                </div>
                            </Link>
                        ))}

                        {orders.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                                {orders.links.map((l, i) => (
                                    <Link
                                        key={i}
                                        href={l.url || '#'}
                                        preserveScroll
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${l.active ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'} ${!l.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: l.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}

function StatusBadge({ status }) {
    const map = {
        paid: ['badge-success', 'Pagato'],
        pending: ['badge-warning', 'In attesa'],
        failed: ['badge bg-rose-500/20 text-rose-300 border border-rose-500/40', 'Fallito'],
        refunded: ['badge bg-slate-500/20 text-slate-300 border border-slate-500/40', 'Rimborsato'],
    };
    const [cls, label] = map[status] || ['badge', status];
    return <span className={cls}>{label}</span>;
}
