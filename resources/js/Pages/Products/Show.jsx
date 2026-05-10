import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import GameCard from '@/Components/GameCard';

export default function ProductsShow({ product, related, available_keys, is_in_wishlist, can_review, has_reviewed }) {
    const { auth } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const [showReview, setShowReview] = useState(false);

    const reviewForm = useForm({ rating: 5, body: '' });

    const discount = product.original_price && product.original_price > product.price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : null;

    const addToCart = () => {
        router.post(route('cart.add', product.id), { quantity });
    };

    const buyNow = () => {
        router.post(route('cart.add', product.id), { quantity }, {
            onSuccess: () => router.visit(route('cart.index')),
        });
    };

    const toggleWishlist = () => {
        if (!auth?.user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('wishlist.toggle', product.id), {}, { preserveScroll: true });
    };

    const submitReview = (e) => {
        e.preventDefault();
        reviewForm.post(route('reviews.store', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset();
                setShowReview(false);
            },
        });
    };

    return (
        <SiteLayout>
            <Head title={product.title} />

            <section className="relative overflow-hidden">
                {product.cover_url && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-20"
                            style={{ backgroundImage: `url(${product.cover_url})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
                    </>
                )}

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <nav className="text-sm text-slate-400 mb-6">
                        <Link href={route('home')} className="hover:text-white">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href={route('catalog.index')} className="hover:text-white">Catalogo</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-300">{product.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12">
                        <div>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800" />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {product.platform && (
                                    <span
                                        className="badge-platform"
                                        style={{ borderColor: product.platform.color, color: product.platform.color }}
                                    >
                                        {product.platform.name}
                                    </span>
                                )}
                                {product.genre && <span className="badge-info">{product.genre.name}</span>}
                                {discount && <span className="badge-discount">-{discount}%</span>}
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{product.title}</h1>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                {product.developer && <span>Sviluppatore: <span className="text-slate-200">{product.developer}</span></span>}
                                {product.publisher && <span>Publisher: <span className="text-slate-200">{product.publisher}</span></span>}
                                {product.release_date && (
                                    <span>Uscita: <span className="text-slate-200">{new Date(product.release_date).toLocaleDateString('it-IT')}</span></span>
                                )}
                            </div>

                            {product.rating_avg > 0 && (
                                <div className="mt-3 flex items-center gap-2 text-sm">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className={`h-5 w-5 ${s <= Math.round(product.rating_avg) ? 'text-amber-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 0 0-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white font-semibold">{Number(product.rating_avg).toFixed(1)}</span>
                                    <span className="text-slate-400">su {product.rating_count} recensioni</span>
                                </div>
                            )}

                            <p className="mt-6 text-slate-300 leading-relaxed">{product.description}</p>

                            <div className="mt-8 card">
                                <div className="flex items-baseline gap-3">
                                    {product.original_price && product.original_price > product.price && (
                                        <span className="text-lg text-slate-500 line-through">
                                            € {Number(product.original_price).toFixed(2)}
                                        </span>
                                    )}
                                    <span className="text-4xl font-extrabold text-white">
                                        € {Number(product.price).toFixed(2)}
                                    </span>
                                    {discount && (
                                        <span className="badge-discount text-sm">RISPARMI {discount}%</span>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-sm">
                                    {available_keys > 0 ? (
                                        <span className="badge-success">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                            {available_keys} chiavi disponibili
                                        </span>
                                    ) : (
                                        <span className="badge-warning">Stock esaurito</span>
                                    )}
                                    <span className="badge-info">Consegna in &lt; 5 sec</span>
                                </div>

                                {available_keys > 0 && (
                                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-3 py-2 text-slate-400 hover:text-white"
                                            >−</button>
                                            <span className="px-4 font-semibold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(available_keys, quantity + 1))}
                                                className="px-3 py-2 text-slate-400 hover:text-white"
                                            >+</button>
                                        </div>
                                        <button onClick={addToCart} className="btn-secondary flex-1">
                                            Aggiungi al carrello
                                        </button>
                                        <button onClick={buyNow} className="btn-primary flex-1">
                                            Compra subito
                                        </button>
                                    </div>
                                )}

                                <button onClick={toggleWishlist} className="mt-3 btn-ghost w-full">
                                    <svg className={`h-5 w-5 ${is_in_wishlist ? 'text-rose-500 fill-current' : ''}`} fill={is_in_wishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                    </svg>
                                    {is_in_wishlist ? 'Nella wishlist' : 'Aggiungi alla wishlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {product.youtube_id && (
                <section className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-6">Trailer</h2>
                        <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800">
                            <iframe
                                src={`https://www.youtube.com/embed/${product.youtube_id}`}
                                title="Trailer"
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>
            )}

            {product.system_requirements && (
                <section className="py-12 bg-slate-900/40 border-y border-slate-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-6">Requisiti di sistema</h2>
                        <div className="card max-w-3xl">
                            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                {product.system_requirements}
                            </pre>
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Recensioni dei giocatori</h2>
                        {auth?.user && can_review && !has_reviewed && (
                            <button onClick={() => setShowReview(!showReview)} className="btn-primary text-sm">
                                Scrivi recensione
                            </button>
                        )}
                    </div>

                    {showReview && (
                        <form onSubmit={submitReview} className="card mb-6">
                            <label className="block mb-2 text-sm font-semibold">Valutazione</label>
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => reviewForm.setData('rating', s)}
                                    >
                                        <svg className={`h-8 w-8 ${s <= reviewForm.data.rating ? 'text-amber-400' : 'text-slate-700'} hover:scale-110 transition`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 0 0-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z"/>
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={reviewForm.data.body}
                                onChange={(e) => reviewForm.setData('body', e.target.value)}
                                placeholder="Cosa ne pensi del gioco?"
                                rows="4"
                                className="input-field"
                                required
                            />
                            {reviewForm.errors.body && <p className="text-sm text-rose-400 mt-2">{reviewForm.errors.body}</p>}
                            <button type="submit" disabled={reviewForm.processing} className="btn-primary mt-4">
                                Pubblica recensione
                            </button>
                        </form>
                    )}

                    {product.reviews?.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {product.reviews.map((r) => (
                                <div key={r.id} className="card">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-bold shrink-0">
                                            {r.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-white">{r.user.name}</span>
                                                {r.verified_purchase && <span className="badge-success text-[10px]">✓ Acquisto verificato</span>}
                                            </div>
                                            <div className="flex mt-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <svg key={s} className={`h-4 w-4 ${s <= r.rating ? 'text-amber-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 0 0-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-sm text-slate-300">{r.body}</p>
                                            <p className="mt-2 text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString('it-IT')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400">Ancora nessuna recensione. Sii il primo a recensire questo gioco!</p>
                    )}
                </div>
            </section>

            {related?.length > 0 && (
                <section className="py-12 border-t border-slate-800 bg-slate-900/40">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-6">Potrebbero piacerti</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map((p) => (
                                <GameCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
