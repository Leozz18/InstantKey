import { Link, usePage, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import FluidGlass from '@/Components/react-bits/FluidGlass';
import FlowingMenu from '@/Components/react-bits/FlowingMenu';
import StarBorder from '@/Components/react-bits/StarBorder';
import { useTranslation } from '@/translations';

const MENU_IMG =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="%233b9bff"/><stop offset="1" stop-color="%238b5cf6"/></linearGradient></defs><rect fill="url(%23g)" width="200" height="80" rx="12"/></svg>',
    );

export default function SiteLayout({ children }) {
    const { auth, cart, flash, app_name } = usePage().props;
    const [search, setSearch] = useState('');
    const [showFlash, setShowFlash] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { lang, setLanguage, t } = useTranslation();

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

    const flowingItems = useMemo(() => {
        const items = [{ link: route('catalog.index'), text: t('catalog'), image: MENU_IMG }];
        if (auth?.user) {
            items.push(
                { link: route('wishlist.index'), text: t('wishlist'), image: MENU_IMG },
                { link: route('orders.index'), text: t('orders'), image: MENU_IMG },
                { link: route('tickets.index'), text: t('support'), image: MENU_IMG },
                { link: route('profile.edit'), text: t('profile'), image: MENU_IMG },
            );
            if (auth.user.is_admin) {
                items.push({ link: route('admin.dashboard'), text: t('admin'), image: MENU_IMG });
            }
            items.push({ link: route('logout'), text: t('logout'), method: 'post', image: MENU_IMG });
        } else {
            items.push(
                { link: route('login'), text: t('login'), image: MENU_IMG },
                { link: route('register'), text: t('register'), image: MENU_IMG },
            );
        }
        return items;
    }, [auth?.user, lang]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-50">
                <FluidGlass>
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
                                        placeholder={t('search_placeholder')}
                                        className="input-field border-cyan-500/20 bg-slate-950/60 pl-11"
                                    />
                                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/>
                                    </svg>
                                </div>
                            </form>

                            <nav className="hidden lg:flex items-center gap-1">
                                <Link href={route('catalog.index')} className="btn-ghost">{t('catalog')}</Link>
                                {auth?.user && (
                                    <Link href={route('wishlist.index')} className="btn-ghost">{t('wishlist')}</Link>
                                )}
                                {auth?.user && (
                                    <Link href={route('orders.index')} className="btn-ghost">{t('orders')}</Link>
                                )}
                                {auth?.user && (
                                    <Link href={route('tickets.index')} className="btn-ghost">{t('support')}</Link>
                                )}
                            </nav>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setLanguage(lang === 'it' ? 'en' : 'it')}
                                    className="px-2.5 py-1.5 rounded-lg border border-cyan-500/10 hover:border-cyan-500/35 hover:bg-slate-900/40 text-[10px] font-extrabold tracking-wider transition-all flex items-center gap-1"
                                    title={lang === 'it' ? 'Switch to English' : 'Passa in Italiano'}
                                >
                                    {lang === 'it' ? (
                                        <><span>🇮🇹</span> <span className="text-cyan-400">IT</span></>
                                    ) : (
                                        <><span>🇬🇧</span> <span className="text-purple-400">EN</span></>
                                    )}
                                </button>

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
                                            <Link href={route('admin.dashboard')} className="badge-info">{t('admin')}</Link>
                                        )}
                                        <Link href={route('profile.edit')} className="btn-ghost">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="btn-ghost">{t('logout')}</Link>
                                    </div>
                                ) : (
                                    <div className="hidden md:flex items-center gap-2">
                                        <Link href={route('login')} className="btn-ghost">{t('login')}</Link>
                                        <Link href={route('register')} className="btn-primary text-sm">{t('register')}</Link>
                                    </div>
                                )}

                                <button
                                    type="button"
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
                            <div className="lg:hidden space-y-4 border-t border-cyan-500/15 pb-4 pt-4 animate-fade-in">
                                <form onSubmit={submitSearch} className="md:hidden">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={t('search')}
                                        className="input-field border-cyan-500/20 bg-slate-950/60"
                                    />
                                </form>
                                <div className="h-[min(22rem,70vh)] min-h-[14rem] overflow-hidden rounded-xl border border-cyan-500/20">
                                    <FlowingMenu
                                        items={flowingItems}
                                        speed={12}
                                        textColor="#e2e8f0"
                                        bgColor="rgba(15,23,42,0.96)"
                                        marqueeBgColor="#22d3ee"
                                        marqueeTextColor="#0f172a"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </FluidGlass>
            </header>

            {showFlash && (flash?.success || flash?.error) && (
                <div className="fixed top-24 right-4 z-[60] max-w-sm animate-fade-in">
                    <StarBorder
                        as="div"
                        color={flash.success ? '#34d399' : '#fb7185'}
                        speed="5s"
                        thickness={2}
                        innerClassName={
                            flash.success
                                ? 'border border-emerald-500/40 bg-emerald-500/10 text-left text-emerald-100'
                                : 'border border-rose-500/40 bg-rose-500/10 text-left text-rose-100'
                        }
                    >
                        <div className="flex items-start gap-3 text-left">
                            <svg className="h-5 w-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                {flash.success ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                                )}
                            </svg>
                            <p className="text-sm font-medium">{flash.success || flash.error}</p>
                        </div>
                    </StarBorder>
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
                                {t('footer_desc')}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                <span className="badge-success">SSL secure</span>
                                <span className="badge-info">2FA ready</span>
                                <span className="badge-warning">Stripe & PayPal</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t('nav')}</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><Link href={route('catalog.index')} className="text-slate-400 hover:text-white transition">{t('catalog')}</Link></li>
                                <li><Link href={route('about')} className="text-slate-400 hover:text-white transition">{t('about')}</Link></li>
                                <li><Link href={route('faq')} className="text-slate-400 hover:text-white transition">{t('faq')}</Link></li>
                                <li><Link href={route('contact')} className="text-slate-400 hover:text-white transition">{t('contacts')}</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t('account')}</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                {auth?.user ? (
                                    <>
                                        <li><Link href={route('orders.index')} className="text-slate-400 hover:text-white transition">{t('my_orders')}</Link></li>
                                        <li><Link href={route('wishlist.index')} className="text-slate-400 hover:text-white transition">{t('wishlist')}</Link></li>
                                        <li><Link href={route('tickets.index')} className="text-slate-400 hover:text-white transition">{t('support')}</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href={route('login')} className="text-slate-400 hover:text-white transition">{t('login')}</Link></li>
                                        <li><Link href={route('register')} className="text-slate-400 hover:text-white transition">{t('register')}</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} {app_name}. {t('rights_reserved')}</p>
                        <p className="text-xs text-slate-500">Built with Laravel 11 + React + Inertia.js + TailwindCSS</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
