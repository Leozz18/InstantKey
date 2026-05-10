import { Head, Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import GameCard from '@/Components/GameCard';

export default function WishlistIndex({ items }) {
    return (
        <SiteLayout>
            <Head title="Wishlist" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold mb-2">La tua Wishlist</h1>
                <p className="text-slate-400 mb-8">{items.total} {items.total === 1 ? 'gioco' : 'giochi'} salvati</p>

                {items.data.length === 0 ? (
                    <div className="card text-center py-16">
                        <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                        </svg>
                        <h3 className="mt-4 text-2xl font-bold">Wishlist vuota</h3>
                        <p className="mt-2 text-slate-400">Aggiungi i giochi che ti interessano e ricevi notifiche quando il prezzo scende.</p>
                        <Link href={route('catalog.index')} className="mt-6 btn-primary inline-flex">Esplora il catalogo</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                        {items.data.map((p) => (
                            <div key={p.id} className="relative group">
                                <GameCard product={p} />
                                <button
                                    onClick={() => router.delete(route('wishlist.destroy', p.id), { preserveScroll: true })}
                                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 backdrop-blur text-rose-400 hover:bg-rose-500 hover:text-white transition opacity-0 group-hover:opacity-100"
                                    title="Rimuovi"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}
