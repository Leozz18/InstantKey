import { useRef, useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';

const PLACEHOLDER_IMG =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><rect fill="%231e293b" width="200" height="80"/><text x="50%" y="52%" fill="%2367e8f9" font-size="12" text-anchor="middle" font-family="sans-serif">KEY</text></svg>',
    );

function FlowingMenu({
    items = [],
    speed = 15,
    textColor = '#fff',
    bgColor = '#0f172a',
    marqueeBgColor = '#22d3ee',
    marqueeTextColor = '#0f172a',
    borderColor = 'rgba(34,211,238,0.35)',
}) {
    return (
        <div className="h-full w-full overflow-hidden rounded-xl border border-cyan-500/20" style={{ backgroundColor: bgColor }}>
            <nav className="m-0 flex h-full flex-col p-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        image={item.image || PLACEHOLDER_IMG}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                        isFirst={idx === 0}
                    />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({
    link,
    text,
    method,
    image,
    speed,
    textColor,
    marqueeBgColor,
    marqueeTextColor,
    borderColor,
    isFirst,
}) {
    const itemRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeInnerRef = useRef(null);
    const animationRef = useRef(null);
    const [repetitions, setRepetitions] = useState(4);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text, image]);

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
            });
        };

        const timer = setTimeout(setupMarquee, 50);
        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [text, image, repetitions, speed]);

    const handleMouseEnter = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    return (
        <div
            className="relative flex-1 overflow-hidden text-center"
            ref={itemRef}
            style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
        >
            <Link
                href={link}
                {...(method ? { method, as: 'button' } : {})}
                className="relative flex h-full cursor-pointer items-center justify-center text-[3.2vh] font-semibold uppercase no-underline md:text-[2vh]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
            >
                {text}
            </Link>
            <div
                className="pointer-events-none absolute left-0 top-0 h-full w-full translate-y-[101%] overflow-hidden"
                ref={marqueeRef}
                style={{ backgroundColor: marqueeBgColor }}
            >
                <div className="flex h-full w-fit" ref={marqueeInnerRef}>
                    {[...Array(repetitions)].map((_, idx) => (
                        <div
                            className="marquee-part flex flex-shrink-0 items-center"
                            key={idx}
                            style={{ color: marqueeTextColor }}
                        >
                            <span className="whitespace-nowrap px-[1vw] text-[3.2vh] font-normal uppercase leading-none md:text-[2vh]">
                                {text}
                            </span>
                            <div
                                className="mx-[2vw] my-[1.2em] h-[5vh] w-[120px] max-w-[28vw] rounded-[50px] bg-cover bg-center py-[0.6em]"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;
