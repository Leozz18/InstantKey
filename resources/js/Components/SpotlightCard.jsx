import { useRef, useState } from 'react';

export default function SpotlightCard({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.25)',
}) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <div
                className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 42%)`,
                }}
            />
            <div className="relative z-[2] flex h-full min-h-0 flex-1 flex-col">{children}</div>
        </div>
    );
}
