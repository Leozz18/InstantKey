const StarBorder = ({
    as: Component = 'button',
    className = '',
    innerClassName = '',
    color = 'white',
    speed = '6s',
    thickness = 1,
    children,
    ...rest
}) => {
    return (
        <Component
            className={`relative inline-block overflow-hidden rounded-2xl ${className}`}
            style={{
                padding: `${thickness}px 0`,
                ...rest.style,
            }}
            {...rest}
        >
            <div
                className="animate-star-movement-bottom absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            />
            <div
                className="animate-star-movement-top absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            />
            <div
                className={`relative z-[1] rounded-2xl border border-slate-700/80 bg-slate-950/95 px-4 py-3 text-center text-sm font-medium text-white ${innerClassName}`}
            >
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
