import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import GameCard from '@/Components/GameCard';
import AnimatedList, { AnimatedGridItem } from '@/Components/react-bits/AnimatedList';

export default function CatalogIndex({ products, platforms, genres, filters }) {
    const [localFilters, setLocalFilters] = useState({
        q: filters.q || '',
        platform: filters.platform || '',
        genre: filters.genre || '',
        max_price: filters.max_price || '',
        on_sale: filters.on_sale || false,
        sort: filters.sort || 'popular',
    });

    const apply = (next = localFilters) => {
        router.get(route('catalog.index'), next, { preserveState: true, preserveScroll: false });
    };

    const update = (key, value) => {
        const next = { ...localFilters, [key]: value };
        setLocalFilters(next);
        apply(next);
    };

    const reset = () => {
        const next = { q: '', platform: '', genre: '', max_price: '', on_sale: false, sort: 'popular' };
        setLocalFilters(next);
        apply(next);
    };

    return (
        <SiteLayout>
            <Head title="Catalogo" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold">Catalogo Giochi</h1>
                        <p className="mt-2 text-slate-400">
                            {products.total} {products.total === 1 ? 'gioco trovato' : 'giochi trovati'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={localFilters.sort}
                            onChange={(e) => update('sort', e.target.value)}
                            className="input-field py-2 pr-10 max-w-[12rem]"
                        >
                            <option value="popular">Popolarità</option>
                            <option value="newest">Più recenti</option>
                            <option value="price_asc">Prezzo crescente</option>
                            <option value="price_desc">Prezzo decrescente</option>
                            <option value="rating">Migliori valutazioni</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
                    <aside className="space-y-6">
                        <div className="card !p-5">
                            <h3 className="font-bold uppercase text-xs tracking-wider text-slate-400">Ricerca</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    apply();
                                }}
                                className="mt-3"
                            >
                                <input
                                    value={localFilters.q}
                                    onChange={(e) => setLocalFilters({ ...localFilters, q: e.target.value })}
                                    placeholder="Titolo del gioco..."
                                    className="input-field"
                                />
                            </form>
                        </div>

                        <div className="card !p-5">
                            <h3 className="font-bold uppercase text-xs tracking-wider text-slate-400">Piattaforma</h3>
                            <div className="mt-3 space-y-1.5 max-h-72 overflow-y-auto">
                                <button
                                    onClick={() => update('platform', '')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!localFilters.platform ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 hover:bg-slate-800'}`}
                                >
                                    Tutte
                                </button>
                                {platforms.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => update('platform', p.slug)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${localFilters.platform === p.slug ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 hover:bg-slate-800'}`}
                                    >
                                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="card !p-5">
                            <h3 className="font-bold uppercase text-xs tracking-wider text-slate-400">Genere</h3>
                            <div className="mt-3 grid grid-cols-2 gap-1.5">
                                <button
                                    onClick={() => update('genre', '')}
                                    className={`px-3 py-2 rounded-lg text-xs font-medium transition ${!localFilters.genre ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800'}`}
                                >
                                    Tutti
                                </button>
                                {genres.map((g) => (
                                    <button
                                        key={g.id}
                                        onClick={() => update('genre', g.slug)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition ${localFilters.genre === g.slug ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800'}`}
                                    >
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="card !p-5">
                            <h3 className="font-bold uppercase text-xs tracking-wider text-slate-400">Prezzo max</h3>
                            <input
                                type="range"
                                min="0"
                                max="80"
                                step="5"
                                value={localFilters.max_price || 80}
                                onChange={(e) => setLocalFilters({ ...localFilters, max_price: e.target.value })}
                                onMouseUp={() => apply()}
                                onTouchEnd={() => apply()}
                                className="mt-3 w-full accent-brand-500"
                            />
                            <div className="mt-1 text-sm text-slate-400">
                                Fino a € {localFilters.max_price || '80'}
                            </div>
                        </div>

                        <div className="card !p-5">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!localFilters.on_sale}
                                    onChange={(e) => update('on_sale', e.target.checked ? 1 : '')}
                                    className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500/40"
                                />
                                <span className="font-semibold text-sm text-slate-200">Solo offerte</span>
                            </label>
                        </div>

                        <button onClick={reset} className="btn-secondary w-full">Resetta filtri</button>
                    </aside>

                    <div>
                        {products.data.length === 0 ? (
                            <div className="card text-center py-20">
                                <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/>
                                </svg>
                                <h3 className="mt-4 text-xl font-bold">Nessun gioco trovato</h3>
                                <p className="mt-2 text-slate-400">Prova a modificare i filtri di ricerca.</p>
                                <button onClick={reset} className="mt-6 btn-primary">Resetta filtri</button>
                            </div>
                        ) : (
                            <>
                                <AnimatedList className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                                    {products.data.map((p, i) => (
                                        <AnimatedGridItem key={p.id} index={i} className="min-h-0">
                                            <GameCard product={p} />
                                        </AnimatedGridItem>
                                    ))}
                                </AnimatedList>

                                {products.last_page > 1 && (
                                    <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                                        {products.links.map((l, i) => (
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
