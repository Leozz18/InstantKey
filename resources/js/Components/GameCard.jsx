import { Link, router } from '@inertiajs/react';
import SpotlightCard from './SpotlightCard';

export default function GameCard({ product }) {
    const discount = product.original_price && product.original_price > product.price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : null;

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('cart.add', product.id), { quantity: 1 }, { preserveScroll: true });
    };

    return (
        <SpotlightCard
            className="game-card group flex h-full flex-col hover:border-brand-400/55 hover:shadow-[0_0_26px_-2px_rgba(59,155,255,0.5),0_0_48px_-10px_rgba(167,139,250,0.35)] focus-within:ring-2 focus-within:ring-brand-400/50 focus-within:ring-offset-2 focus-within:ring-offset-slate-950"
            spotlightColor="rgba(59, 186, 255, 0.28)"
        >
            <Link
                href={route('products.show', product.slug)}
                className="flex min-h-0 flex-1 flex-col text-inherit no-underline outline-none"
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-800">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                            <svg className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 10h-8.35A5.99 5.99 0 0 0 7 6a6 6 0 0 0 0 12 5.99 5.99 0 0 0 5.65-4H13l2 2 2-2 2 2 4-4-2-2zM7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                        </div>
                    )}

                    {discount && (
                        <div className="absolute top-2 left-2 z-[3] badge-discount">
                            -{discount}%
                        </div>
                    )}

                    {product.platform && (
                        <div
                            className="absolute top-2 right-2 z-[3] badge-platform"
                            style={{ borderColor: product.platform.color, color: product.platform.color }}
                        >
                            {product.platform.name}
                        </div>
                    )}

                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                    <button
                        type="button"
                        onClick={addToCart}
                        className="absolute bottom-3 right-3 z-[3] flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/40 opacity-0 transition group-hover:opacity-100 hover:scale-110"
                        aria-label="Aggiungi al carrello"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l2.7 13.5h12.6l1.95-9H6.6"/>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white transition group-hover:text-brand-400">
                        {product.title}
                    </h3>
                    {product.genre && (
                        <p className="mt-1 text-xs text-slate-400">{product.genre.name}</p>
                    )}

                    {product.rating_avg > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-xs">
                            <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 0 0-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957Z"/>
                            </svg>
                            <span className="text-slate-300">{Number(product.rating_avg).toFixed(1)}</span>
                            <span className="text-slate-500">({product.rating_count})</span>
                        </div>
                    )}

                    <div className="mt-auto pt-3">
                        {product.original_price && product.original_price > product.price && (
                            <p className="text-xs text-slate-500 line-through">
                                € {Number(product.original_price).toFixed(2)}
                            </p>
                        )}
                        <p className="text-xl font-extrabold text-white">
                            € {Number(product.price).toFixed(2)}
                        </p>
                    </div>
                </div>
            </Link>
        </SpotlightCard>
    );
}
