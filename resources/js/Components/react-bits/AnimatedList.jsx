import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function AnimatedGridItem({ children, className = '', index = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.06, margin: '0px 0px -5% 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.36,
                delay: inView ? Math.min(index * 0.04, 0.6) : 0,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function AnimatedList({ children, className = '' }) {
    return <div className={className}>{children}</div>;
}
