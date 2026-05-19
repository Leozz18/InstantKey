import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import GameCard from '@/Components/GameCard';
import Aurora from '@/Components/react-bits/Aurora';
import GlitchText from '@/Components/react-bits/GlitchText';
import { useTranslation } from '@/translations';

export default function Home({ featured, newReleases, deals, platforms }) {
    const { t } = useTranslation();
    return (
        <SiteLayout>
            <Head title="Home" />

            <section className="relative min-h-[28rem] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Aurora
                        colorStops={['#3b9bff', '#a78bfa', '#ec4899']}
                        amplitude={1.15}
                        blend={0.62}
                        className="min-h-[28rem]"
                    />
                </div>
                <div className="absolute inset-0 z-[1] bg-hero-glow opacity-50 pointer-events-none" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950 pointer-events-none" />

                <div className="relative z-[3] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                            </span>
                            {t('delivery_badge')}
                        </div>

                        <h1 className="mt-6 text-5xl font-extrabold tracking-tight lg:text-7xl">
                            <GlitchText
                                speed={0.42}
                                className="block text-left text-5xl leading-tight tracking-tight lg:text-7xl lg:leading-[1.05]"
                            >
                                {t('hero_title')}
                            </GlitchText>
                            <span className="mt-2 block bg-gradient-to-r from-brand-400 via-accent-400 to-pink-400 bg-clip-text text-transparent">
                                {t('hero_title_accent')}
                            </span>
                        </h1>

                        <p className="mt-6 text-lg lg:text-xl text-slate-300 max-w-2xl">
                            {t('hero_subtitle')}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link href={route('catalog.index')} className="btn-primary text-base px-6 py-3">
                                {t('explore_catalog')}
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                </svg>
                            </Link>
                            <Link href={route('catalog.index', { on_sale: 1 })} className="btn-secondary">
                                {t('view_offers')}
                            </Link>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-8 max-w-xl">
                            {[
                                { value: '5s', label: t('max_delivery') },
                                { value: '100%', label: t('legit_keys') },
                                { value: '24/7', label: t('availability') },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 border-y border-slate-800 bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm uppercase tracking-widest text-slate-500 font-semibold">
                        {t('supported_platforms')}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        {platforms?.map((p) => (
                            <Link
                                key={p.id}
                                href={route('catalog.index', { platform: p.slug })}
                                className="badge-platform hover:scale-105 transition"
                                style={{ borderColor: p.color, color: p.color }}
                            >
                                {p.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {featured?.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={t('featured')}
                            subtitle={t('featured_sub')}
                            link={route('catalog.index')}
                        />
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
                            {featured.map((p) => (
                                <GameCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {deals?.length > 0 && (
                <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={t('deals')}
                            subtitle={t('deals_sub')}
                            link={route('catalog.index', { on_sale: 1 })}
                            badge="HOT"
                        />
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                            {deals.map((p) => (
                                <GameCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {newReleases?.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={t('new_releases')}
                            subtitle={t('new_releases_sub')}
                            link={route('catalog.index', { sort: 'newest' })}
                        />
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                            {newReleases.map((p) => (
                                <GameCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-20 bg-gradient-to-br from-brand-600/10 via-slate-950 to-accent-600/10 border-y border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-center">
                        {t('why_choose')} <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">INSTANT KEY</span>
                    </h2>
                    <p className="mt-3 text-center text-slate-400 max-w-2xl mx-auto">
                        {t('why_choose_desc')}
                    </p>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '⚡', title: t('f1_title'), text: t('f1_text') },
                            { icon: '🔒', title: t('f2_title'), text: t('f2_text') },
                            { icon: '💰', title: t('f3_title'), text: t('f3_text') },
                            { icon: '🛡️', title: t('f4_title'), text: t('f4_text') },
                        ].map((f) => (
                            <div key={f.title} className="card text-center hover:border-brand-500/50 transition">
                                <div className="text-5xl mb-4">{f.icon}</div>
                                <h3 className="font-bold text-white text-lg">{f.title}</h3>
                                <p className="mt-2 text-sm text-slate-400">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}

function SectionHeader({ title, subtitle, link, badge }) {
    const { t } = useTranslation();
    return (
        <div className="flex items-end justify-between gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-white">{title}</h2>
                    {badge && (
                        <span className="badge bg-gradient-to-r from-amber-500 to-rose-500 text-white">{badge}</span>
                    )}
                </div>
                <p className="mt-1 text-slate-400">{subtitle}</p>
            </div>
            {link && (
                <Link href={link} className="btn-ghost shrink-0">
                    {t('view_all')}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                    </svg>
                </Link>
            )}
        </div>
    );
}
