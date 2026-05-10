import { Head, Link, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function ProductsCreate({ platforms, genres }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        platform_id: '',
        genre_id: '',
        developer: '',
        publisher: '',
        description: '',
        system_requirements: '',
        price: '',
        original_price: '',
        image_url: '',
        cover_url: '',
        youtube_id: '',
        release_date: '',
        is_featured: false,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <SiteLayout>
            <Head title="Nuovo Prodotto" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold">Nuovo Prodotto</h1>
                        <p className="text-slate-400">Aggiungi un nuovo gioco al catalogo</p>
                    </div>
                    <Link href={route('admin.products.index')} className="btn-ghost">
                        Annulla
                    </Link>
                </div>

                <div className="card">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Titolo</label>
                                <input type="text" className="input-field" value={data.title} onChange={e => setData('title', e.target.value)} required />
                                {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Piattaforma</label>
                                    <select className="input-field" value={data.platform_id} onChange={e => setData('platform_id', e.target.value)} required>
                                        <option value="">Seleziona...</option>
                                        {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    {errors.platform_id && <p className="text-rose-500 text-xs mt-1">{errors.platform_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Genere</label>
                                    <select className="input-field" value={data.genre_id} onChange={e => setData('genre_id', e.target.value)} required>
                                        <option value="">Seleziona...</option>
                                        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                    </select>
                                    {errors.genre_id && <p className="text-rose-500 text-xs mt-1">{errors.genre_id}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Sviluppatore</label>
                                <input type="text" className="input-field" value={data.developer} onChange={e => setData('developer', e.target.value)} />
                                {errors.developer && <p className="text-rose-500 text-xs mt-1">{errors.developer}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Publisher</label>
                                <input type="text" className="input-field" value={data.publisher} onChange={e => setData('publisher', e.target.value)} />
                                {errors.publisher && <p className="text-rose-500 text-xs mt-1">{errors.publisher}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Prezzo (€)</label>
                                <input type="number" step="0.01" className="input-field" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Prezzo Originale (€) (Opzionale, per sconti)</label>
                                <input type="number" step="0.01" className="input-field" value={data.original_price} onChange={e => setData('original_price', e.target.value)} />
                                {errors.original_price && <p className="text-rose-500 text-xs mt-1">{errors.original_price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">URL Immagine (Verticale)</label>
                                <input type="url" className="input-field" value={data.image_url} onChange={e => setData('image_url', e.target.value)} />
                                {errors.image_url && <p className="text-rose-500 text-xs mt-1">{errors.image_url}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">URL Cover (Orizzontale)</label>
                                <input type="url" className="input-field" value={data.cover_url} onChange={e => setData('cover_url', e.target.value)} />
                                {errors.cover_url && <p className="text-rose-500 text-xs mt-1">{errors.cover_url}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Data Rilascio</label>
                                <input type="date" className="input-field" value={data.release_date} onChange={e => setData('release_date', e.target.value)} />
                                {errors.release_date && <p className="text-rose-500 text-xs mt-1">{errors.release_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">ID Video YouTube (Opzionale)</label>
                                <input type="text" className="input-field" value={data.youtube_id} onChange={e => setData('youtube_id', e.target.value)} placeholder="es: dQw4w9WgXcQ" />
                                {errors.youtube_id && <p className="text-rose-500 text-xs mt-1">{errors.youtube_id}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Descrizione</label>
                            <textarea className="input-field min-h-[150px]" value={data.description} onChange={e => setData('description', e.target.value)} required></textarea>
                            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Requisiti di Sistema (Markdown/HTML)</label>
                            <textarea className="input-field min-h-[100px]" value={data.system_requirements} onChange={e => setData('system_requirements', e.target.value)}></textarea>
                            {errors.system_requirements && <p className="text-rose-500 text-xs mt-1">{errors.system_requirements}</p>}
                        </div>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-brand-500 focus:ring-brand-500" />
                                <span className="text-sm">In Evidenza</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-brand-500 focus:ring-brand-500" />
                                <span className="text-sm">Attivo (Visibile)</span>
                            </label>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button type="submit" disabled={processing} className="btn-primary">
                                Salva Prodotto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SiteLayout>
    );
}
