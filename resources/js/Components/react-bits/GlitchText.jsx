const GlitchText = ({ children, speed = 0.5, enableShadows = true, enableOnHover = false, className = '' }) => {
    const text = typeof children === 'string' ? children : String(children);

    const inlineStyles = {
        '--after-duration': `${speed * 3}s`,
        '--before-duration': `${speed * 2}s`,
        '--after-shadow': enableShadows ? '-5px 0 #f472b6' : 'none',
        '--before-shadow': enableShadows ? '5px 0 #22d3ee' : 'none',
    };

    const baseClasses =
        'font-black relative select-none text-white after:bg-slate-950 before:bg-slate-950';

    const pseudoClasses = !enableOnHover
        ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
          'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
        : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-slate-950 after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
          "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-slate-950 before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
          'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
          'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before';

    const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

    return (
        <span key={text} style={inlineStyles} data-text={text} className={combinedClasses}>
            {text}
        </span>
    );
};

export default GlitchText;
