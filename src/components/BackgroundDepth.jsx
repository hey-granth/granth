import { useEffect, useRef, memo } from 'react';

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     CINEMATIC ORBITAL VISUAL SYSTEM                       ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Deep space. Nested orbital rings. Cosmic depth.                          ║
 * ║  Mature, restrained, professional.                                        ║
 * ║  Backend-engineer-appropriate aesthetics.                                 ║
 * ║                                                                           ║
 * ║  If motion is noticeable immediately, it is wrong.                        ║
 * ║  If the background becomes "clean and minimal", it has failed.            ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const BackgroundDepth = memo(() => {
    const grainCanvasRef = useRef(null);
    const orbitalRefs = useRef([]);
    const depthMarkersRef = useRef(null);
    const nestedRingsRef = useRef(null);

    // Ultra-subtle cosmic grain — barely perceptible
    useEffect(() => {
        const canvas = grainCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            canvas.width = 200 * dpr;
            canvas.height = 200 * dpr;
            canvas.style.width = '200px';
            canvas.style.height = '200px';
        };
        resize();

        let frame = 0;
        let animationId;

        const renderGrain = () => {
            frame++;
            // Update every 5 frames — subtle, cosmic dust
            if (frame % 5 !== 0) {
                animationId = requestAnimationFrame(renderGrain);
                return;
            }

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 25;
                data[i] = noise;
                data[i + 1] = noise;
                data[i + 2] = noise + Math.random() * 8; // Slight blue tint
                data[i + 3] = 18; // Very subtle
            }

            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(renderGrain);
        };

        animationId = requestAnimationFrame(renderGrain);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Scroll-based parallax for orbital layers — slower, more cinematic
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const vh = window.innerHeight;
                    const scrollProgress = scrolled / (document.body.scrollHeight - vh);

                    // Orbital layers shift with scroll — reduced multiplier for slower feel
                    orbitalRefs.current.forEach((ref, index) => {
                        if (ref) {
                            const depth = (index + 1) * 0.02; // Slower than before
                            const y = scrolled * depth;
                            const rotate = scrollProgress * (index % 2 === 0 ? 2 : -1.5);
                            ref.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
                        }
                    });

                    // Depth markers respond to scroll
                    if (depthMarkersRef.current) {
                        const depth = scrolled * 0.015;
                        depthMarkersRef.current.style.transform = `translateY(${depth}px)`;
                    }

                    // Nested rings subtle rotation on scroll
                    if (nestedRingsRef.current) {
                        const rotation = scrollProgress * 8; // Very subtle rotation
                        nestedRingsRef.current.style.transform = `rotate(${rotation}deg)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Slow orbital drift animation — 70-90s cycles (increased from 50-60s)
    useEffect(() => {
        let time = 0;
        let animationId;

        const drift = () => {
            time += 0.00005; // Even slower than before

            orbitalRefs.current.forEach((ref, index) => {
                if (ref) {
                    const baseTransform = ref.style.transform || '';
                    const offsetX = Math.sin(time + index) * 6;
                    const offsetY = Math.cos(time * 0.6 + index) * 4;
                    if (!baseTransform.includes('translate(')) {
                        ref.style.transform = `${baseTransform} translate(${offsetX}px, ${offsetY}px)`;
                    }
                }
            });

            animationId = requestAnimationFrame(drift);
        };

        animationId = requestAnimationFrame(drift);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 1 — ENHANCED BASE GRADIENT FIELD
                
                Deep purple → violet → indigo → near-black
                Richer color stops, organic transitions
                No flat regions
            ═══════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0">
                {/* Primary cosmic gradient — deeper, richer purple-indigo */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 130% 110% at 50% -25%, rgba(75, 45, 120, 0.55) 0%, rgba(55, 30, 95, 0.35) 25%, transparent 50%),
                            radial-gradient(ellipse 110% 90% at 0% 45%, rgba(60, 30, 100, 0.4) 0%, rgba(45, 22, 80, 0.2) 30%, transparent 50%),
                            radial-gradient(ellipse 110% 90% at 100% 55%, rgba(55, 28, 95, 0.35) 0%, rgba(40, 18, 75, 0.18) 30%, transparent 50%),
                            radial-gradient(ellipse 160% 110% at 50% 130%, rgba(45, 20, 80, 0.5) 0%, rgba(30, 12, 60, 0.3) 30%, transparent 50%),
                            radial-gradient(ellipse 80% 60% at 30% 60%, rgba(70, 35, 110, 0.12) 0%, transparent 40%),
                            radial-gradient(ellipse 70% 50% at 70% 40%, rgba(65, 30, 105, 0.1) 0%, transparent 45%),
                            linear-gradient(175deg, 
                                #0c0920 0%, 
                                #0a0718 12%, 
                                #080614 28%, 
                                #060510 45%, 
                                #05040d 62%, 
                                #04030a 78%, 
                                #030208 100%
                            )
                        `,
                    }}
                />

                {/* Secondary depth wash — organic color temperature shifts */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 75% 55% at 18% 28%, rgba(80, 45, 120, 0.1) 0%, transparent 50%),
                            radial-gradient(ellipse 65% 50% at 82% 72%, rgba(65, 35, 105, 0.08) 0%, transparent 50%),
                            radial-gradient(ellipse 90% 65% at 50% 50%, rgba(50, 25, 85, 0.06) 0%, transparent 55%),
                            radial-gradient(ellipse 50% 40% at 25% 75%, rgba(90, 50, 130, 0.05) 0%, transparent 45%),
                            radial-gradient(ellipse 55% 45% at 75% 25%, rgba(70, 40, 110, 0.04) 0%, transparent 50%)
                        `,
                    }}
                />

                {/* Edge vignette — soft, cinematic */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(4, 3, 10, 0.65) 100%)
                        `,
                    }}
                />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 2 — NESTED CONCENTRIC ORBITAL RING SYSTEM
                
                Multiple concentric ellipses at varying opacities
                Centered in viewport with subtle offset
                One ring with dashed stroke for textural accent
            ═══════════════════════════════════════════════════════════════ */}

            <svg
                ref={nestedRingsRef}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
                style={{ willChange: 'transform' }}
            >
                {/* Outermost ring — largest, most subtle */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="850"
                    ry="420"
                    fill="none"
                    stroke="url(#nestedGradient1)"
                    strokeWidth="0.6"
                    opacity="0.035"
                    transform="rotate(-5 960 540)"
                />

                {/* Ring 2 */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="720"
                    ry="360"
                    fill="none"
                    stroke="url(#nestedGradient2)"
                    strokeWidth="0.8"
                    opacity="0.045"
                    transform="rotate(3 960 540)"
                />

                {/* Ring 3 — dashed for texture */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="580"
                    ry="290"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.06)"
                    strokeWidth="0.7"
                    strokeDasharray="8 12"
                    opacity="0.5"
                    transform="rotate(-2 960 540)"
                />

                {/* Ring 4 */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="440"
                    ry="220"
                    fill="none"
                    stroke="url(#nestedGradient1)"
                    strokeWidth="1"
                    opacity="0.055"
                    transform="rotate(6 960 540)"
                />

                {/* Innermost ring — brightest */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="300"
                    ry="150"
                    fill="none"
                    stroke="url(#nestedGradient2)"
                    strokeWidth="1.2"
                    opacity="0.07"
                    transform="rotate(-4 960 540)"
                />

                {/* Gradient definitions for nested rings */}
                <defs>
                    <linearGradient id="nestedGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(124, 58, 237, 0.7)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
                        <stop offset="100%" stopColor="rgba(167, 139, 250, 0.2)" />
                    </linearGradient>
                    <linearGradient id="nestedGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(167, 139, 250, 0.6)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
                        <stop offset="100%" stopColor="rgba(109, 40, 217, 0.15)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 3 — ORBITAL STRUCTURE ARCS
                
                Large-radius asymmetric arcs
                SVG preferred, semi-transparent
                Positioned asymmetrically, never intersecting text
            ═══════════════════════════════════════════════════════════════ */}

            {/* Orbital Arc System — SVG */}
            <svg
                ref={(el) => orbitalRefs.current[0] = el}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
                style={{ willChange: 'transform' }}
            >
                {/* Primary orbital — large sweeping arc, upper-left origin */}
                <ellipse
                    cx="150"
                    cy="120"
                    rx="950"
                    ry="480"
                    fill="none"
                    stroke="url(#orbitalGradient1)"
                    strokeWidth="1"
                    opacity="0.07"
                    transform="rotate(-15 150 120)"
                />

                {/* Secondary orbital — mid-right, steeper angle */}
                <ellipse
                    cx="1650"
                    cy="380"
                    rx="750"
                    ry="380"
                    fill="none"
                    stroke="url(#orbitalGradient2)"
                    strokeWidth="0.7"
                    opacity="0.05"
                    transform="rotate(20 1650 380)"
                />

                {/* Tertiary orbital — bottom sweep */}
                <ellipse
                    cx="960"
                    cy="980"
                    rx="1150"
                    ry="420"
                    fill="none"
                    stroke="url(#orbitalGradient1)"
                    strokeWidth="0.9"
                    opacity="0.045"
                    transform="rotate(-4 960 980)"
                />

                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="orbitalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(124, 58, 237, 0.6)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
                        <stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
                    </linearGradient>
                    <linearGradient id="orbitalGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(167, 139, 250, 0.5)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                        <stop offset="100%" stopColor="rgba(109, 40, 217, 0.1)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Secondary orbital layer — offset for depth */}
            <svg
                ref={(el) => orbitalRefs.current[1] = el}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
                style={{ willChange: 'transform' }}
            >
                {/* Deep orbital ring — huge radius, barely visible */}
                <ellipse
                    cx="960"
                    cy="540"
                    rx="1450"
                    ry="620"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.035)"
                    strokeWidth="1.8"
                    transform="rotate(10 960 540)"
                />

                {/* Accent arc — partial, upper region */}
                <path
                    d="M -150 280 Q 550 -150 1150 180"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.05)"
                    strokeWidth="0.8"
                />

                {/* Lower accent arc */}
                <path
                    d="M 750 1120 Q 1450 880 2070 980"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.04)"
                    strokeWidth="1.2"
                />
            </svg>

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 4 — ENHANCED DEPTH MARKERS
                
                More organic glow zones, varied blur radii
                Warmer purples left, cooler violets right
            ═══════════════════════════════════════════════════════════════ */}
            <div
                ref={depthMarkersRef}
                className="absolute inset-0"
                style={{ willChange: 'transform' }}
            >
                {/* Depth marker A — upper left, warm purple */}
                <div
                    className="absolute -top-[18%] -left-[12%] w-[550px] h-[450px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 100% at 50% 50%, 
                                rgba(140, 70, 220, 0.055) 0%, 
                                rgba(120, 50, 200, 0.02) 40%,
                                transparent 60%
                            )
                        `,
                        filter: 'blur(90px)',
                    }}
                />

                {/* Depth marker B — right side, cool violet */}
                <div
                    className="absolute top-[22%] -right-[10%] w-[450px] h-[380px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 100% at 50% 50%, 
                                rgba(120, 80, 220, 0.045) 0%, 
                                rgba(100, 60, 200, 0.012) 45%,
                                transparent 65%
                            )
                        `,
                        filter: 'blur(110px)',
                    }}
                />

                {/* Depth marker C — center, subtle glow */}
                <div
                    className="absolute top-[38%] left-[32%] w-[650px] h-[450px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 80% at 50% 50%, 
                                rgba(109, 40, 217, 0.03) 0%, 
                                transparent 50%
                            )
                        `,
                        filter: 'blur(130px)',
                    }}
                />

                {/* Depth marker D — lower left, warm */}
                <div
                    className="absolute bottom-[18%] -left-[8%] w-[400px] h-[340px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 100% at 50% 50%, 
                                rgba(150, 80, 230, 0.035) 0%, 
                                transparent 55%
                            )
                        `,
                        filter: 'blur(100px)',
                    }}
                />

                {/* Depth marker E — mid-right, new */}
                <div
                    className="absolute top-[55%] right-[5%] w-[380px] h-[300px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 100% at 50% 50%, 
                                rgba(130, 70, 210, 0.03) 0%, 
                                transparent 50%
                            )
                        `,
                        filter: 'blur(95px)',
                    }}
                />

                {/* Depth marker F — upper center, new */}
                <div
                    className="absolute top-[8%] left-[45%] w-[320px] h-[250px]"
                    style={{
                        background: `
                            radial-gradient(ellipse 100% 100% at 50% 50%, 
                                rgba(145, 85, 225, 0.025) 0%, 
                                transparent 50%
                            )
                        `,
                        filter: 'blur(85px)',
                    }}
                />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 5 — STAR FIELD
                
                Scattered point light sources
                Variable radii and opacities
                Positioned asymmetrically
            ═══════════════════════════════════════════════════════════════ */}

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 12% 18%, rgba(255,255,255,0.018) 0%, transparent 0.12%),
                        radial-gradient(circle at 85% 12%, rgba(255,255,255,0.014) 0%, transparent 0.09%),
                        radial-gradient(circle at 28% 42%, rgba(255,255,255,0.011) 0%, transparent 0.1%),
                        radial-gradient(circle at 72% 35%, rgba(255,255,255,0.016) 0%, transparent 0.08%),
                        radial-gradient(circle at 45% 68%, rgba(255,255,255,0.012) 0%, transparent 0.11%),
                        radial-gradient(circle at 92% 58%, rgba(255,255,255,0.015) 0%, transparent 0.07%),
                        radial-gradient(circle at 8% 75%, rgba(255,255,255,0.013) 0%, transparent 0.1%),
                        radial-gradient(circle at 55% 22%, rgba(255,255,255,0.01) 0%, transparent 0.13%),
                        radial-gradient(circle at 38% 88%, rgba(255,255,255,0.017) 0%, transparent 0.08%),
                        radial-gradient(circle at 78% 82%, rgba(255,255,255,0.011) 0%, transparent 0.12%),
                        radial-gradient(circle at 18% 55%, rgba(255,255,255,0.009) 0%, transparent 0.14%),
                        radial-gradient(circle at 62% 48%, rgba(255,255,255,0.013) 0%, transparent 0.09%),
                        radial-gradient(circle at 95% 28%, rgba(255,255,255,0.015) 0%, transparent 0.06%),
                        radial-gradient(circle at 5% 38%, rgba(255,255,255,0.012) 0%, transparent 0.11%),
                        radial-gradient(circle at 48% 5%, rgba(255,255,255,0.014) 0%, transparent 0.08%),
                        radial-gradient(circle at 82% 95%, rgba(255,255,255,0.01) 0%, transparent 0.15%),
                        radial-gradient(circle at 32% 15%, rgba(255,255,255,0.016) 0%, transparent 0.07%),
                        radial-gradient(circle at 68% 72%, rgba(255,255,255,0.011) 0%, transparent 0.1%),
                        radial-gradient(circle at 22% 92%, rgba(255,255,255,0.013) 0%, transparent 0.09%),
                        radial-gradient(circle at 88% 42%, rgba(255,255,255,0.018) 0%, transparent 0.06%),
                        radial-gradient(circle at 42% 32%, rgba(255,255,255,0.008) 0%, transparent 0.16%),
                        radial-gradient(circle at 58% 85%, rgba(255,255,255,0.014) 0%, transparent 0.08%),
                        radial-gradient(circle at 15% 65%, rgba(255,255,255,0.012) 0%, transparent 0.1%),
                        radial-gradient(circle at 75% 18%, rgba(255,255,255,0.015) 0%, transparent 0.07%),
                        radial-gradient(circle at 35% 58%, rgba(255,255,255,0.01) 0%, transparent 0.12%)
                    `,
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 6 — COSMIC DUST / GRAIN
                
                Extremely subtle, prevents emptiness
                Always behind text
            ═══════════════════════════════════════════════════════════════ */}

            {/* Live canvas grain — cosmic dust */}
            <canvas
                ref={grainCanvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.022]"
                style={{
                    mixBlendMode: 'overlay',
                    imageRendering: 'pixelated',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* SVG noise layer — ultra subtle static grain */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmicDust'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmicDust)'/%3E%3C/svg%3E")`,
                    opacity: 0.028,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 7 — SECTION-BASED DENSITY MAPPING
                
                Hero: open, spacious
                Mid sections: layered, richer
                Footer/Contact: dense, heavy, closing gravity
            ═══════════════════════════════════════════════════════════════ */}

            {/* Mid-page density increase */}
            <div
                className="absolute inset-x-0 top-[100vh] h-[200vh]"
                style={{
                    background: `
                        linear-gradient(180deg,
                            transparent 0%,
                            rgba(55, 30, 95, 0.035) 15%,
                            rgba(65, 35, 105, 0.055) 40%,
                            rgba(60, 32, 100, 0.055) 60%,
                            rgba(50, 28, 90, 0.035) 85%,
                            transparent 100%
                        )
                    `,
                }}
            />

            {/* Additional orbital elements for mid-sections */}
            <svg
                ref={(el) => orbitalRefs.current[2] = el}
                className="absolute top-[80vh] left-0 w-full h-[150vh]"
                viewBox="0 0 1920 1620"
                preserveAspectRatio="xMidYMid slice"
                style={{ willChange: 'transform' }}
            >
                {/* Mid-section orbital ring */}
                <ellipse
                    cx="280"
                    cy="580"
                    rx="620"
                    ry="420"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.035)"
                    strokeWidth="0.9"
                    transform="rotate(-22 280 580)"
                />
                <ellipse
                    cx="1640"
                    cy="1020"
                    rx="580"
                    ry="320"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.03)"
                    strokeWidth="1"
                    transform="rotate(18 1640 1020)"
                />

                {/* Dashed accent arc for texture */}
                <ellipse
                    cx="960"
                    cy="800"
                    rx="700"
                    ry="280"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.04)"
                    strokeWidth="0.6"
                    strokeDasharray="6 10"
                    transform="rotate(-3 960 800)"
                />
            </svg>

            {/* ═══════════════════════════════════════════════════════════════
                CONTACT SECTION — GRAVITATIONAL CONVERGENCE
                
                Dense, heavy, closure energy
                Orbital arcs converging
                No empty void — intentional weight
            ═══════════════════════════════════════════════════════════════ */}

            {/* Primary gravitational gradient — intensified */}
            <div
                className="absolute inset-x-0 bottom-0 h-[85vh]"
                style={{
                    background: `
                        linear-gradient(180deg, 
                            transparent 0%, 
                            rgba(10, 6, 20, 0.2) 12%,
                            rgba(8, 5, 18, 0.35) 28%,
                            rgba(6, 4, 14, 0.52) 45%,
                            rgba(5, 3, 12, 0.7) 62%,
                            rgba(4, 2, 10, 0.85) 80%,
                            rgba(3, 2, 8, 0.95) 100%
                        )
                    `,
                }}
            />

            {/* Converging orbital arcs at bottom — more rings */}
            <svg
                className="absolute bottom-0 left-0 w-full h-[65vh]"
                viewBox="0 0 1920 650"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Convergence arc 1 — outermost */}
                <ellipse
                    cx="960"
                    cy="850"
                    rx="1150"
                    ry="380"
                    fill="none"
                    stroke="rgba(109, 40, 217, 0.055)"
                    strokeWidth="1.3"
                    transform="rotate(-2 960 850)"
                />
                {/* Convergence arc 2 */}
                <ellipse
                    cx="960"
                    cy="920"
                    rx="950"
                    ry="320"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.045)"
                    strokeWidth="1"
                    transform="rotate(1.5 960 920)"
                />
                {/* Convergence arc 3 */}
                <ellipse
                    cx="960"
                    cy="1000"
                    rx="750"
                    ry="260"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.035)"
                    strokeWidth="0.8"
                    transform="rotate(-1 960 1000)"
                />
                {/* Convergence arc 4 — innermost */}
                <ellipse
                    cx="960"
                    cy="1080"
                    rx="550"
                    ry="200"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.025)"
                    strokeWidth="0.6"
                    transform="rotate(0.5 960 1080)"
                />
            </svg>

            {/* Central gravitational pull — bottom center, intensified */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 85% at 50% 100%, 
                            rgba(109, 40, 217, 0.09) 0%, 
                            rgba(124, 58, 237, 0.035) 40%,
                            transparent 60%
                        )
                    `,
                    filter: 'blur(65px)',
                }}
            />

            {/* Corner density — left */}
            <div
                className="absolute bottom-0 left-0 w-[48vw] h-[45vh]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 100% at 0% 100%, 
                            rgba(4, 2, 10, 0.65) 0%, 
                            transparent 55%
                        )
                    `,
                }}
            />

            {/* Corner density — right */}
            <div
                className="absolute bottom-0 right-0 w-[48vw] h-[45vh]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 100% at 100% 100%, 
                            rgba(4, 2, 10, 0.6) 0%, 
                            transparent 52%
                        )
                    `,
                }}
            />

            {/* Contact zone grain intensification */}
            <div
                className="absolute inset-x-0 bottom-0 h-[55vh]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='contactGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' seed='42'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23contactGrain)'/%3E%3C/svg%3E")`,
                    opacity: 0.05,
                    mixBlendMode: 'overlay',
                    maskImage: 'linear-gradient(180deg, transparent 0%, black 30%)',
                    WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 30%)',
                }}
            />

        </div>
    );
});

BackgroundDepth.displayName = 'BackgroundDepth';

export default BackgroundDepth;
