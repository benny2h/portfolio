import { useEffect, useRef } from 'react';

const CROSSFADE_SECONDS = 1.2;

// Two overlapping <video> elements crossfade into each other right before the
// loop point, masking the hard jump-cut a plain `loop` attribute produces.
function LoopingVideo({ src, className = '', style }) {
    const aRef = useRef(null);
    const bRef = useRef(null);
    const activeRef = useRef('a');

    useEffect(() => {
        const a = aRef.current;
        const b = bRef.current;
        if (!a || !b) return;

        b.pause();
        b.style.opacity = '0';
        a.style.opacity = '1';

        let raf;
        const tick = () => {
            const active = activeRef.current === 'a' ? a : b;
            const standby = activeRef.current === 'a' ? b : a;

            if (active.duration && !active.paused && active.currentTime >= active.duration - CROSSFADE_SECONDS) {
                if (standby.paused) {
                    standby.currentTime = 0;
                    standby.play().catch(() => {});
                }

                const remaining = active.duration - active.currentTime;
                const fadeIn = 1 - Math.max(0, Math.min(1, remaining / CROSSFADE_SECONDS));
                active.style.opacity = String(1 - fadeIn);
                standby.style.opacity = String(fadeIn);

                if (active.currentTime >= active.duration - 0.05) {
                    active.pause();
                    active.currentTime = 0;
                    activeRef.current = activeRef.current === 'a' ? 'b' : 'a';
                }
            }

            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    const videoClassName = `absolute inset-0 h-full w-full object-cover ${className}`;

    return (
        <>
            <video
                ref={aRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                src={src}
                className={videoClassName}
                style={style}
            />
            <video
                ref={bRef}
                muted
                playsInline
                preload="auto"
                src={src}
                className={`${videoClassName} opacity-0`}
                style={style}
            />
        </>
    );
}

export default LoopingVideo;
