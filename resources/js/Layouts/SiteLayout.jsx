import { Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SiteLayout({ children }) {
    const { auth, cart, flash, app_name } = usePage().props;
    const [search, setSearch] = useState('');
    const [showFlash, setShowFlash] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const t = setTimeout(() => setShowFlash(false), 4500);
            return () => clearTimeout(t);
        }
    }, [flash?.success, flash?.error]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('catalog.index'), { q: search }, { preserveState: true });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4">
                        <Link href={route('home')} className="flex items-center gap-2 shrink-0">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/40">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                                    <path d="M21 10h-8.35A5.99 5.99 0 0 0 7 6a6 6 0 0 0 0 12 5.99 5.99 0 0 0 5.65-4H13l2 2 2-2 2 2 4-4-2-2zM7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg font-extrabold tracking-tight leading-none">
                                    INSTANT <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">KEY</span>
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mt-0.5">Digital Game Marketplace</div>
                            </div>
                        </Link>

                        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cerca tra migliaia di giochi..."
                                    className="input-field pl-11"
                                />
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/>
                                </svg>
                            </div>
                        </form>

                        <nav className="hidden lg:flex items-center gap-1">
                            <Link href={route('catalog.index')} className="btn-ghost">Catalogo</Link>
                            {auth?.user && (
                                <Link href={route('wishlist.index')} className="btn-ghost">Wishlist</Link>
                            )}
                            {auth?.user && (
                                <Link href={route('orders.index')} className="btn-ghost">Ordini</Link>
                            )}
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link href={route('cart.index')} className="relative btn-ghost p-2">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l2.7 13.5h12.6l1.95-9H6.6M9 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                                {cart?.count > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-1 text-xs font-bold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            {auth?.user ? (
                                <div className="hidden md:flex items-center gap-2">
                                    {auth.user.is_admin && (
                                        <Link href={route('admin.dashboard')} className="badge-info">Admin</Link>
                                    )}
                                    <Link href={route('profile.edit')} className="btn-ghost">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </Link>
                                    <Link href={route('logout')} method="post" as="button" className="btn-ghost">Esci</Link>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Link href={route('login')} className="btn-ghost">Accedi</Link>
                                    <Link href={route('register')} className="btn-primary text-sm">Registrati</Link>
                                </div>
                            )}

                            <button
                                onClick={() => setMobileMenu(!mobileMenu)}
                                className="lg:hidden btn-ghost p-2"
                                aria-label="Menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {mobileMenu && (
                        <div className="lg:hidden pb-4 space-y-2 border-t border-slate-800 pt-4 animate-fade-in">
                            <form onSubmit={submitSearch} className="md:hidden mb-3">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cerca giochi..."
                                    className="input-field"
                                />
                            </form>
                            <Link href={route('catalog.index')} className="block btn-ghost w-full text-left">Catalogo</Link>
                            {auth?.user ? (
                                <>
                                    <Link href={route('wishlist.index')} className="block btn-ghost w-full text-left">Wishlist</Link>
                                    <Link href={route('orders.index')} className="block btn-ghost w-full text-left">I miei ordini</Link>
                                    <Link href={route('tickets.index')} className="block btn-ghost w-full text-left">Supporto</Link>
                                    <Link href={route('profile.edit')} className="block btn-ghost w-full text-left">Profilo</Link>
                                    {auth.user.is_admin && (
                                        <Link href={route('admin.dashboard')} className="block btn-ghost w-full text-left">Admin</Link>
                                    )}
                                    <Link href={route('logout')} method="post" as="button" className="block btn-ghost w-full text-left">Esci</Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="block btn-ghost w-full text-left">Accedi</Link>
                                    <Link href={route('register')} className="block btn-primary w-full">Registrati</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {showFlash && (flash?.success || flash?.error) && (
                <div className="fixed top-20 right-4 z-[60] animate-fade-in max-w-sm">
                    <div className={`rounded-lg border p-4 shadow-2xl ${flash.success ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/10 border-rose-500/40 text-rose-300'}`}>
                        <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                {flash.success ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                                )}
                            </svg>
                            <p className="text-sm font-medium">{flash.success || flash.error}</p>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-800 bg-slate-950 mt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                                        <path d="M21 10h-8.35A5.99 5.99 0 0 0 7 6a6 6 0 0 0 0 12 5.99 5.99 0 0 0 5.65-4H13l2 2 2-2 2 2 4-4-2-2zM7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    </svg>
                                </div>
                                <div className="text-lg font-extrabold">
                                    INSTANT <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">KEY</span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-400 max-w-md">
                                Marketplace di chiavi digitali per videogiochi. Consegna istantanea garantita in meno di 5 secondi, prezzi vantaggiosi e chiavi 100% legittime.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                <span className="badge-success">SSL secure</span>
                                <span className="badge-info">2FA ready</span>
                                <span className="badge-warning">Stripe & PayPal</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Naviga</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><Link href={route('catalog.index')} className="text-slate-400 hover:text-white transition">Catalogo</Link></li>
                                <li><Link href={route('about')} className="text-slate-400 hover:text-white transition">Chi siamo</Link></li>
                                <li><Link href={route('faq')} className="text-slate-400 hover:text-white transition">FAQ</Link></li>
                                <li><Link href={route('contact')} className="text-slate-400 hover:text-white transition">Contatti</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Account</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                {auth?.user ? (
                                    <>
                                        <li><Link href={route('orders.index')} className="text-slate-400 hover:text-white transition">I miei ordini</Link></li>
                                        <li><Link href={route('wishlist.index')} className="text-slate-400 hover:text-white transition">Wishlist</Link></li>
                                        <li><Link href={route('tickets.index')} className="text-slate-400 hover:text-white transition">Supporto</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href={route('login')} className="text-slate-400 hover:text-white transition">Accedi</Link></li>
                                        <li><Link href={route('register')} className="text-slate-400 hover:text-white transition">Registrati</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} {app_name}. Progetto didattico — Tutti i diritti riservati.</p>
                        <p className="text-xs text-slate-500">Built with Laravel 11 + React + Inertia.js + TailwindCSS</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
