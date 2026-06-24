import { useEffect, useState } from 'react';

const TRANSITION_VH_RATIO = 0.9;

/* Drives one full 360° rotateY turn as the section with the given id scrolls in from below the fold; settles flat (360deg, visually identical to 0) once it has fully entered. */
function useFlipRotation(id) {
    const [rotation, setRotation] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
    }, []);

    useEffect(() => {
        if (reducedMotion) return;
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const el = document.getElementById(id);
                if (el) {
                    const vh = window.innerHeight;
                    const transitionPx = vh * TRANSITION_VH_RATIO;
                    const rect = el.getBoundingClientRect();
                    const progress = Math.min(1, Math.max(0, (vh - rect.top) / transitionPx));
                    setRotation(progress * 360);
                }
                raf = null;
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [id, reducedMotion]);

    return reducedMotion ? 0 : rotation;
}

export default useFlipRotation;
