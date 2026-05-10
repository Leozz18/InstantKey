import { Head, Link, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function ProductsIndex({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    return (
        <SiteLayout>
            <Head title="Gestione Prodotti" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold">Prodotti</h1>
                        <p className="text-slate-400">Gestisci il catalogo e lo stock chiavi</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admin.dashboard')} className="btn-ghost">
                            Torna alla Dashboard
                        </Link>
                        <Link href={route('admin.products.create')} className="btn-primary">
                            + Nuovo Prodotto
                        </Link>
                    </div>
                </div>

                <div className="card overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-4 font-semibold">ID</th>
                                <th className="p-4 font-semibold">Prodotto</th>
                                <th className="p-4 font-semibold">Piattaforma</th>
                                <th className="p-4 font-semibold">Prezzo</th>
                                <th className="p-4 font-semibold">Stock</th>
                                <th className="p-4 font-semibold">Stato</th>
                                <th className="p-4 font-semibold">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {products.data.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-900/50 transition">
                                    <td className="p-4 text-slate-500">#{product.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-12 rounded overflow-hidden bg-slate-800 shrink-0">
                                                {product.image_url && <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="font-semibold text-white">{product.title}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">{product.platform?.name}</td>
                                    <td className="p-4">€ {Number(product.price).toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`badge ${product.available_keys === 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : product.available_keys < 10 ? 'badge-warning' : 'badge-success'}`}>
                                            {product.available_keys} chiavi
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {product.is_active ? (
                                            <span className="badge-success">Attivo</span>
                                        ) : (
                                            <span className="badge-error">Disattivo</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={route('admin.products.edit', product.id)} className="btn-ghost text-xs py-1 px-2">
                                                Modifica
                                            </Link>
                                            <button onClick={(e) => handleDelete(e, product.id)} className="btn-ghost text-rose-500 text-xs py-1 px-2 hover:bg-rose-500/10 hover:text-rose-400">
                                                Elimina
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.data.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-slate-500">
                                        Nessun prodotto trovato.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Simple Pagination */}
                    {products.links && products.links.length > 3 && (
                        <div className="mt-6 flex flex-wrap gap-1 justify-center">
                            {products.links.map((link, index) => (
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
