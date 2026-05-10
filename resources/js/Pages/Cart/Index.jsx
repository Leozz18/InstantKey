import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function CartIndex({ cart }) {
    const { auth } = usePage().props;
    const [discountCode, setDiscountCode] = useState('');

    const updateQty = (productId, qty) => {
        router.patch(route('cart.update', productId), { quantity: qty }, { preserveScroll: true });
    };

    const removeItem = (productId) => {
        router.delete(route('cart.remove', productId), { preserveScroll: true });
    };

    const applyDiscount = (e) => {
        e.preventDefault();
        router.post(route('cart.discount.apply'), { code: discountCode }, {
            preserveScroll: true,
            onSuccess: () => setDiscountCode(''),
        });
    };

    const removeDiscount = () => {
        router.delete(route('cart.discount.remove'), { preserveScroll: true });
    };

    return (
        <SiteLayout>
            <Head title="Carrello" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold mb-2">Carrello</h1>
                <p className="text-slate-400 mb-8">{cart.count} {cart.count === 1 ? 'articolo' : 'articoli'}</p>

                {cart.items.length === 0 ? (
                    <div className="card text-center py-16">
                        <svg className="mx-auto h-20 w-20 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l2.7 13.5h12.6l1.95-9H6.6"/>
                        </svg>
                        <h3 className="mt-4 text-2xl font-bold">Il tuo carrello è vuoto</h3>
                        <p className="mt-2 text-slate-400">Aggiungi giochi dal catalogo per iniziare.</p>
                        <Link href={route('catalog.index')} className="mt-6 btn-primary inline-flex">
                            Esplora il catalogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                        <div className="space-y-3">
                            {cart.items.map((item) => (
                                <div key={item.id} className="card flex items-center gap-4 !p-4">
                                    <Link href={route('products.show', item.slug)} className="shrink-0">
                                        <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-800">
                                            {item.image_url && (
                                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <Link href={route('products.show', item.slug)} className="font-semibold hover:text-brand-400 transition line-clamp-2">
                                            {item.title}
                                        </Link>
                                        {item.platform && (
                                            <span
                                                className="badge-platform text-[10px] mt-1 inline-flex"
                                                style={{ borderColor: item.platform_color, color: item.platform_color }}
                                            >
                                                {item.platform}
                                            </span>
                                        )}
                                        <p className="mt-1 text-sm text-slate-400">€ {Number(item.price).toFixed(2)} cad.</p>
                                    </div>
                                    <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1.5 text-slate-400 hover:text-white">−</button>
                                        <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1.5 text-slate-400 hover:text-white">+</button>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-lg">€ {Number(item.subtotal).toFixed(2)}</p>
                                        <button onClick={() => removeItem(item.id)} className="text-xs text-rose-400 hover:text-rose-300 mt-1">Rimuovi</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="card">
                                <h2 className="font-bold text-lg mb-4">Riepilogo ordine</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Subtotale</span>
                                        <span>€ {Number(cart.subtotal).toFixed(2)}</span>
                                    </div>
                                    {cart.discount && (
                                        <div className="flex justify-between text-emerald-400">
                                            <span>Sconto ({cart.discount.code})</span>
                                            <span>-€ {Number(cart.discount.amount).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-slate-800 pt-3 mt-3 flex justify-between text-lg font-bold">
                                        <span>Totale</span>
                                        <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                                            € {Number(cart.total).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {auth?.user ? (
                                    <Link href={route('checkout.index')} className="btn-primary w-full mt-6">
                                        Procedi al pagamento
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="btn-primary w-full mt-6">
                                        Accedi per acquistare
                                    </Link>
                                )}
                            </div>

                            <div className="card">
                                <h3 className="font-semibold mb-3 text-sm">Codice sconto</h3>
                                {cart.discount ? (
                                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3">
                                        <div>
                                            <p className="font-semibold text-emerald-300 text-sm">{cart.discount.code}</p>
                                            <p className="text-xs text-emerald-400">−€ {Number(cart.discount.amount).toFixed(2)}</p>
                                        </div>
                                        <button onClick={removeDiscount} className="text-xs text-emerald-400 hover:text-emerald-200">Rimuovi</button>
                                    </div>
                                ) : (
                                    <form onSubmit={applyDiscount} className="flex gap-2">
                                        <input
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            placeholder="Es. WELCOME10"
                                            className="input-field flex-1 uppercase"
                                        />
                                        <button type="submit" className="btn-secondary">Applica</button>
                                    </form>
                                )}
                                <div className="mt-3 text-xs text-slate-500">
                                    Codici disponibili: <span className="text-slate-300 font-mono">WELCOME10</span>, <span className="text-slate-300 font-mono">SUMMER20</span>, <span className="text-slate-300 font-mono">INSTANT5</span>, <span className="text-slate-300 font-mono">BLACKFRIDAY</span>
                                </div>
                            </div>

                            <div className="card !p-4 text-xs text-slate-400">
                                <div className="flex items-start gap-2">
                                    <svg className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    Pagamento sicuro con SSL/TLS. Le tue chiavi verranno consegnate in meno di 5 secondi.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}
