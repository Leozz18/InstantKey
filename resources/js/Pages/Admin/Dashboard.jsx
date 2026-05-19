import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { useTranslation } from '@/translations';

export default function AdminDashboard({ stats, latestOrders, lowStock }) {
    const { t } = useTranslation();

    const cards = [
        { label: t('total_revenue'), value: `€ ${Number(stats.total_revenue).toFixed(2)}`, color: 'from-emerald-500 to-teal-500' },
        { label: t('completed_orders'), value: stats.orders_count, color: 'from-brand-500 to-accent-500' },
        { label: t('registered_users'), value: stats.users_count, color: 'from-pink-500 to-rose-500' },
        { label: t('active_products'), value: stats.products_count, color: 'from-amber-500 to-orange-500' },
        { label: t('available_keys_stat'), value: stats.available_keys, color: 'from-cyan-500 to-blue-500' },
        { label: t('sold_keys_stat'), value: stats.sold_keys, color: 'from-indigo-500 to-purple-500' },
    ];

    return (
        <SiteLayout>
            <Head title={t('admin_dashboard_title')} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-extrabold">{t('admin_dashboard_title')}</h1>
                    <span className="badge-info">{t('control_panel')}</span>
                </div>
                <p className="text-slate-400 mb-6">{t('platform_overview')}</p>

                <div className="flex gap-3 mb-8">
                    <Link href={route('admin.products.index')} className="btn-primary">
                        {t('manage_products_keys')}
                    </Link>
                    <Link href={route('admin.tickets.index')} className="btn-ghost border border-slate-700 hover:border-slate-500">
                        {t('manage_tickets')}
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {cards.map((c) => (
                        <div key={c.label} className="card relative overflow-hidden">
                            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${c.color}`} />
                            <div className="relative">
                                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{c.label}</p>
                                <p className={`mt-2 text-3xl font-extrabold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                                    {c.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {stats.open_tickets > 0 && (
                    <div className="card mb-6 border-amber-500/40 bg-amber-500/10">
                        <div className="flex items-center gap-3">
                            <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                            </svg>
                            <p><strong>{stats.open_tickets}</strong> {t('open_tickets_alert')}</p>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card">
                        <h2 className="font-bold text-lg mb-4">{t('latest_orders')}</h2>
                        {latestOrders.length === 0 ? (
                            <p className="text-slate-400 text-sm">{t('no_orders_yet')}</p>
                        ) : (
                            <div className="space-y-3">
                                {latestOrders.map((o) => (
                                    <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                                        <div className="min-w-0">
                                            <p className="font-mono text-sm font-semibold">{o.order_number}</p>
                                            <p className="text-xs text-slate-400 truncate">{o.user?.name || 'Guest'} · {o.items.length} item</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-bold">€ {Number(o.total_price).toFixed(2)}</p>
                                            <p className="text-xs text-slate-500">{new Date(o.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <h2 className="font-bold text-lg mb-4">{t('low_keys_stock')}</h2>
                        {lowStock.length === 0 ? (
                            <p className="text-slate-400 text-sm">{t('all_stock_ok')}</p>
                        ) : (
                            <div className="space-y-3">
                                {lowStock.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={route('products.show', p.slug)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-12 rounded overflow-hidden bg-slate-800 shrink-0">
                                                {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-sm truncate">{p.title}</p>
                                                <p className="text-xs text-slate-500">{p.platform?.name}</p>
                                            </div>
                                        </div>
                                        <span className={`badge ${p.available_keys === 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'badge-warning'}`}>
                                            {p.available_keys} {t('keys_left')}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
