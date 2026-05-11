export default function FluidGlass({ children, className = '' }) {
    return (
        <div
            className={`relative overflow-hidden border-b border-cyan-500/25 bg-slate-950/70 shadow-[0_0_48px_-20px_rgba(34,211,238,0.35)] backdrop-blur-xl backdrop-saturate-150 ${className}`}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    background:
                        'conic-gradient(from 180deg at 50% 50%, rgba(59,155,255,0.4), rgba(167,139,250,0.35), rgba(244,114,182,0.25), rgba(34,211,238,0.35), rgba(59,155,255,0.4))',
                }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="relative z-[1]">{children}</div>
        </div>
    );
}
