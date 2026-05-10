import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=70')] bg-cover bg-center opacity-5 pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <Link href="/" className="flex flex-col items-center gap-3 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-2xl shadow-brand-500/40">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
                            <path d="M21 10h-8.35A5.99 5.99 0 0 0 7 6a6 6 0 0 0 0 12 5.99 5.99 0 0 0 5.65-4H13l2 2 2-2 2 2 4-4-2-2zM7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-extrabold tracking-tight text-white">
                            INSTANT <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">KEY</span>
                        </div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Digital Game Marketplace</div>
                    </div>
                </Link>

                <div className="card !p-8">
                    {children}
                </div>

                <p className="text-center text-xs text-slate-500 mt-6">
                    © {new Date().getFullYear()} INSTANT KEY · Tutti i diritti riservati
                </p>
            </div>
        </div>
    );
}
