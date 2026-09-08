import {siteMotionEnabled} from './useSiteMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function mountHomeMotion(root, contextSafe, copy) {
    let frame = 0;
    const byId = (id) => root.querySelector('#' + id);
    const listeners = [];
    const listen = (target, event, handler, options) => { const safe = contextSafe(handler); target.addEventListener(event, safe, options); listeners.push(() => target.removeEventListener(event, safe, options)); };
    const chapters = [...root.querySelectorAll('.chapter')], nav = [...root.querySelectorAll('.rail a')], progress = byId('global-progress');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const requested = new URLSearchParams(location.search).get('motion');
    let saved = null;
    try {
        saved = sessionStorage.getItem('cj-site-motion');
    }
    catch { }
    let preference = requested === 'on' || requested === 'off' ? requested : saved;
    let still = preference ? preference === 'off' : reduced.matches, queued = false, cap = 'similarity', research = 0, researchManual = false, studioManual = false;
    const engineReady = true;
    if (engineReady)
        gsap.registerPlugin(ScrollTrigger);
    let motionContext = null, layoutMedia = null, opening = null, playingDemo = null;
    const clamp = (n) => Math.max(0, Math.min(1, n));
    const ns = 'http://www.w3.org/2000/svg', particles = byId('element-particles'), dots = [];
    particles.replaceChildren();
    for (let i = 0; i < 44; i++) {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('r', i % 7 === 0 ? '4' : '2.3');
        c.setAttribute('class', 'element-particle');
        particles.appendChild(c);
        dots.push(c);
    }
    const embed = byId('embedding-dots'), embedding = [];
    embed.replaceChildren();
    for (let i = 0; i < 12; i++) {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('r', '3');
        c.setAttribute('fill', i < 6 ? '#ff6559' : '#c6c9ba');
        embed.appendChild(c);
        embedding.push(c);
    }
    function paintParticles(p) {
        dots.forEach((c, i) => {
            const a = i * 2.39996, r = Math.sqrt(i / 44) * 89;
            let targetX = 800 + Math.cos(a) * r, targetY = 150 + Math.sin(a) * r * .7;
            if (cap === 'clustering') {
                targetX = 755 + (i % 3) * 45 + Math.cos(a) * 17;
                targetY = 125 + (i % 2) * 42 + Math.sin(a) * 17;
            }
            if (cap === 'scope') {
                targetX = 800 + Math.cos(a) * 94;
                targetY = 150 + Math.sin(a) * 94;
            }
            const q = still ? 1 : clamp((p - i / 44 * .23) / .65);
            const x = 290 + (targetX - 290) * q, y = (95 + (i % 3) * 53) * (1 - q) + targetY * q + Math.sin(q * Math.PI) * Math.sin(i) * 32;
            c.setAttribute('cx', x.toFixed(2));
            c.setAttribute('cy', y.toFixed(2));
            c.setAttribute('opacity', x > 397 && x < 615 ? '0' : String(q === 0 ? 0 : .4 + q * .6));
        });
        byId('record-shapes').setAttribute('transform', 'translate(0 0)');
    }
    function paintResearch(q) {
        const arrival = clamp(q / .3), response = clamp((q - .35) / .35);
        const pulse = byId('input-pulse');
        pulse.setAttribute('cy', String(40 + arrival * 22));
        pulse.setAttribute('opacity', q < .5 ? '1' : String(1 - clamp((q - .5) / .15)));
        byId('perturb-wave').setAttribute('opacity', String(response));
        root.querySelector('#perturb-wave circle').setAttribute('r', String(55 + response * 45));
        embedding.slice(0, 6).forEach((c, i) => { c.setAttribute('cx', String(245 + i * 12 - response * 25)); c.setAttribute('cy', String(283 - response * (12 + i * 2))); });
    }
    function setResearch(index, manual = false) { const changed = research !== index; research = index; byId('input-pulse').setAttribute('opacity', '0'); if (manual)
        researchManual = true; root.querySelectorAll('[data-research]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.research) === index))); byId('tower-viz').style.display = index === 2 ? 'none' : 'block'; byId('results').classList.toggle('active', index === 2); byId('perturb-wave').setAttribute('opacity', index === 1 ? '1' : '0'); byId('research-state').textContent = copy(['User and item towers turn their respective inputs into embeddings.', 'A user-feature perturbation changes the response. The full story separates MMD distribution shifts from membership probability.', 'Source table and experimental context stay beside every reported result.'][index]); byId('research-art-note').textContent = copy(index === 2 ? 'Source: ALOA paper, Table 6. Bars start at zero.' : 'Conceptual geometry · Not measured embedding coordinates'); if (changed && index === 2 && engineReady && !still)
        gsap.fromTo('#results .barfill', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: .8, stagger: .15, ease: 'power3.out', overwrite: true }); embedding.forEach((c, i) => { c.setAttribute('cx', String(245 + (i % 6) * 12 + (index === 1 && i < 6 ? -25 : 0))); c.setAttribute('cy', String(283 + Math.floor(i / 6) * 12 + (index === 1 && i < 6 ? -12 : 0))); }); }
    root.querySelectorAll('[data-research]').forEach(b => listen(b, 'click', () => { setResearch(Number(b.dataset.research), true); if (Number(b.dataset.research) === 1) {
        if (engineReady && !still) {
            const pulseState = { p: 0 };
            gsap.to(pulseState, { p: 1, duration: 3, ease: 'none', onUpdate: () => { if (research === 1)
                    paintResearch(pulseState.p); } });
        }
        else
            paintResearch(1);
    } }));
    const caps = { similarity: 'Compare elements using the declared geometry. Visual positions are illustrative.', clustering: 'Explore grouping within a declared capability scope. This is not a measured clustering result.', scope: 'A declared capability boundary is essential. Performance on a particular task needs its own evaluation.' };
    root.querySelectorAll('[data-cap]').forEach(b => listen(b, 'click', () => { cap = b.dataset.cap; root.querySelectorAll('[data-cap]').forEach(n => n.setAttribute('aria-pressed', String(n === b))); byId('cap-description').textContent = copy(caps[cap]); paintParticles(1); }));
    const steps = [['LOCAL WORKSPACE', 'Begin with structure.', 'Inspect a structured dataset before choosing how to proceed.', ['Input type|Structured table', 'Field review|Required', 'Source handling|Local']], ['DATASET REVIEW', 'Understand the source.', 'Review field roles and sensitivity before moving forward.', ['Schema|Review fields', 'Sensitivity|Human review', 'Characterization|Inspect report']], ['VALIDATION', 'Evidence before approval.', 'Examine measured results in their declared evaluation context.', ['Structural preservation|Separate measure', 'Reconstruction resistance|Threat-model bounded', 'Linkage resistance|Separate measure']], ['HUMAN DECISION', 'Make the decision explicit.', 'Review the evidence and declared capabilities before approval.', ['Validation evidence|Review required', 'Capability scope|Review required', 'Approval|Human action']], ['GOVERNED ARTIFACTS', 'A substrate for computation.', 'Inspect approved outputs and manage the project lifecycle.', ['Elements|Computational output', 'Contract|Declared interface', 'Private artifact|Contents excluded']]];
    let studioStep = 0;
    function setStudio(i) { studioStep = i; const s = steps[i]; byId('studio-kicker').textContent = copy(s[0]); byId('studio-heading').textContent = copy(s[1]); byId('studio-description').textContent = copy(s[2]); const rows = byId('studio-rows'); rows.replaceChildren(); s[3].forEach(pair => { const row = document.createElement('div'); row.className = 'studio-row'; pair.split('|').forEach(t => { const span = document.createElement('span'); span.textContent = copy(t); row.appendChild(span); }); rows.appendChild(row); }); root.querySelectorAll('[data-step]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.step) === i))); byId('studio-next').textContent = copy(i === 4 ? 'Back to intake ↗' : 'Next scene →'); }
    root.querySelectorAll('[data-step]').forEach(b => listen(b, 'click', () => { studioManual = true; setStudio(Number(b.dataset.step)); }));
    listen(byId('studio-next'), 'click', () => { studioManual = true; setStudio((studioStep + 1) % 5); });
    listen(byId('shortlist'), 'click', e => { const b = e.currentTarget, selected = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', String(!selected)); b.textContent = copy(selected ? '＋ Save to sample shortlist' : '✓ Saved · Click to remove'); });
    function updateChrome() {
        queued = false;
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
        let active = 0;
        chapters.forEach((el, i) => { if (el.getBoundingClientRect().top < innerHeight * .5)
            active = i; });
        nav.forEach((a, i) => a.setAttribute('aria-current', String(i === active)));
        const footer=document.querySelector('.portfolio-footer');
        const rail=root.querySelector('.rail');
        if(footer&&rail)rail.style.visibility=footer.getBoundingClientRect().top<innerHeight?'hidden':'visible';
    }
    function requestRender() { if (!queued) {
        queued = true;
        (frame = requestAnimationFrame(updateChrome));
    } }
    function savePreference(value) {
        preference = value;
        try {
            sessionStorage.setItem('cj-site-motion', value);
        }
        catch { }
        const url = new URL(location.href);
        url.searchParams.set('motion', value);
        history.replaceState(null, '', url);
    }
    function cancelDemo() {
        if (playingDemo) {
            playingDemo.kill();
            playingDemo = null;
        }
        byId('motion-replay').textContent = 'Play a scroll demo';
        document.documentElement.classList.remove('demo-playing');
    }
    function replayEntrance() {
        if (still || !engineReady)
            return;
        if (opening)
            opening.kill();
        opening = gsap.timeline({ defaults: { ease: 'power3.out' } })
            .fromTo('.hero-name', { y: 65, opacity: 0 }, { y: 0, opacity: 1, duration: 1.25 }, 0)
            .fromTo('.portrait', { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.5 }, .12)
            .fromTo('.hero-stamp', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, .5)
            .fromTo('.hero-intro,.hero-actions', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1 }, .7);
    }
    function buildMotion() {
        cancelDemo();
        if (engineReady)
            gsap.killTweensOf('#results .barfill');
        if (opening) {
            opening.kill();
            opening = null;
        }
        if (layoutMedia) {
            layoutMedia.revert();
            layoutMedia = null;
        }
        if (motionContext) {
            motionContext.revert();
            motionContext = null;
        }
        root.classList.toggle('still', still);
        root.classList.toggle('motion-active', !still && engineReady);
        byId('motion-toggle').textContent = copy(still ? 'Motion: OFF' : 'Motion: ON');
        byId('motion-toggle').setAttribute('aria-pressed', String(!still));
        byId('motion-status').textContent = engineReady ? (still ? 'Static preview' : 'Scroll effects enabled') : 'Motion scripts unavailable';
        root.querySelectorAll('.chapter').forEach(el => el.style.setProperty('--p', '0'));
        paintParticles(1);
        researchManual = false;
        studioManual = false;
        setResearch(0);
        setStudio(0);
        if (still || !engineReady) {
            if (engineReady)
                gsap.set('.hero-name,.portrait,.hero-stamp,.hero-intro,.hero-actions', { clearProps: 'all' });
            updateChrome();
            return;
        }
        motionContext = gsap.context(() => {
            gsap.set('.hero-name,.portrait,.hero-stamp,.hero-intro,.hero-actions', { clearProps: 'all' });
            // A short entrance makes motion visible before the first scroll.
            replayEntrance();
            const cue = gsap.to('.scroll-cue i', { y: 10, duration: .85, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            ScrollTrigger.create({ trigger: '#intro', start: 'top bottom', end: 'bottom top', onToggle: s => s.isActive ? cue.play() : cue.pause() });
            const orbit = gsap.to('.orbit', { rotation: 360, duration: 32, repeat: -1, ease: 'none' });
            ScrollTrigger.create({ trigger: '#intro', start: 'top bottom', end: 'bottom top', onToggle: s => s.isActive ? orbit.play() : orbit.pause() });
        });
        layoutMedia = gsap.matchMedia();
        layoutMedia.add({ wide: '(min-width: 851px)', compact: '(max-width: 850px)' }, ctx => {
            const wide = ctx.conditions.wide;
            const track = (id, extra = {}) => ({ trigger: id, start: wide ? 'top 56px' : 'top 75%', end: wide ? 'bottom bottom' : 'bottom 35%', scrub: 1.1, invalidateOnRefresh: true, ...extra });
            // CSS supplies wide-screen sticky stages. Compact layouts retain normal scrolling.
            gsap.timeline({ scrollTrigger: track('#intro', { start: 'top 56px', end: wide ? 'bottom bottom' : 'bottom 20%' }) })
                .to('.hero-name', { x: wide ? -180 : -48, ease: 'none', duration: 1 }, 0)
                .to('.hero-name .last', { x: wide ? 135 : 28, ease: 'none', duration: 1 }, 0)
                .to('.portrait', { scale: wide ? 1.19 : 1.08, y: wide ? -75 : -30, ease: 'none', duration: 1 }, 0)
                .to('.orbit', { scale: 1.35, ease: 'none', duration: 1 }, 0)
                .to('.scroll-cue', { opacity: 0, duration: .25 }, .4)
                .to({ hold: 0 }, { hold: 1, duration: .3 });
            const rental = gsap.timeline({ scrollTrigger: track('#rental') });
            rental.fromTo('#rental .copy', { x: wide ? -65 : 0, y: wide ? 0 : 36, opacity: .25 }, { x: 0, y: 0, opacity: 1, duration: .4 })
                .fromTo('.map', { x: wide ? 100 : 0, y: 65, scale: .8, rotationY: wide ? -16 : 0, rotation: wide ? 3 : 0 }, { x: 0, y: 0, scale: 1, rotationY: 0, rotation: 0, duration: .65, ease: 'power2.out' }, 0)
                .fromTo('.listing', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .3 }, .5)
                .fromTo('.map-pin', { scale: .4 }, { scale: 1, svgOrigin: '112 255', duration: .3 }, .45)
                .to({ hold: 0 }, { hold: 1, duration: .55 });
            const elementState = { p: 0 };
            gsap.timeline({ scrollTrigger: track('#elements') })
                .fromTo('#element-title', { y: 40, opacity: .3 }, { y: 0, opacity: 1, duration: .25 })
                .to(elementState, { p: 1, duration: .8, ease: 'none', onUpdate: () => paintParticles(elementState.p) }, .1)
                .fromTo('#sealed-transform', { scale: .9, svgOrigin: '505 150', smoothOrigin: false }, { scale: 1, svgOrigin: '505 150', smoothOrigin: false, duration: .3 }, .15)
                .fromTo('#transform-scan', { y: 0, opacity: 0 }, { y: 115, opacity: .9, duration: .45, ease: 'none' }, .25)
                .to('#transform-scan', { opacity: 0, duration: .15 }, .7)
                .fromTo('.mobile-elements .mobile-node', { y: 28, opacity: .2 }, { y: 0, opacity: 1, stagger: .13, duration: .3 }, .1)
                .to({ hold: 0 }, { hold: 1, duration: .5 });
            const studioState = { p: 0 };
            gsap.timeline({ scrollTrigger: track('#studio') })
                .fromTo('.studio-window', { y: 65, scale: .87, rotationX: wide ? 12 : 0 }, { y: 0, scale: 1, rotationX: 0, duration: .3 })
                .to(studioState, { p: 1, duration: 1, ease: 'none', onUpdate: () => {
                    const next = Math.min(4, Math.floor(clamp((studioState.p - .12) / .76) * 5));
                    if (wide && !studioManual && next !== studioStep)
                        setStudio(next);
                } }, 0);
            const researchState = { p: 0 };
            gsap.timeline({ scrollTrigger: track('#research') })
                .fromTo('#user-tower', { x: -70, opacity: .1 }, { x: 0, opacity: 1, duration: .35, ease: 'sine.inOut' })
                .fromTo('#item-tower', { x: 70, opacity: .1 }, { x: 0, opacity: 1, duration: .35, ease: 'sine.inOut' }, 0)
                .to(researchState, { p: 1, duration: 1.2, ease: 'none', onUpdate: () => {
                    if (!wide || researchManual)
                        return;
                    const next = researchState.p > .9 ? 2 : researchState.p > .12 ? 1 : 0;
                    if (next !== research)
                        setResearch(next);
                    if (next === 1) {
                        paintResearch((researchState.p - .12) / .78);
                    }
                } }, .45)
                .to({ hold: 0 }, { hold: 1, duration: .25 });
            gsap.fromTo('#contact h2', { y: 80, opacity: .25 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 25%', scrub: .6 } });
        });
        ScrollTrigger.refresh();
        updateChrome();
    }
    listen(byId('motion-toggle'), 'click', () => {
        still = !still;
        savePreference(still ? 'off' : 'on');
        buildMotion();
    });
    listen(byId('motion-replay'), 'click', () => {
        if (playingDemo) {
            cancelDemo();
            return;
        }
        still = false;
        savePreference('on');
        buildMotion();
        document.documentElement.classList.add('demo-playing');
        window.scrollTo({ top: 0, behavior: 'instant' });
        researchManual = false;
        studioManual = false;
        const state = { y: 0 };
        const rentalChapter = byId('rental');
        const destination = innerWidth > 850 ? rentalChapter.offsetTop + rentalChapter.offsetHeight - innerHeight - 56 : rentalChapter.offsetTop + rentalChapter.offsetHeight - innerHeight * .45;
        byId('motion-replay').textContent = 'Stop demo';
        playingDemo = gsap.timeline({ onComplete: cancelDemo })
            .to(state, { y: byId('intro').offsetHeight - innerHeight, duration: 9, ease: 'power1.inOut', onUpdate: () => window.scrollTo({ top: state.y, behavior: 'instant' }) }, 2)
            .to(state, { y: destination, duration: 12, ease: 'power1.inOut', onUpdate: () => window.scrollTo({ top: state.y, behavior: 'instant' }) }, 13)
            .to({ hold: 0 }, { hold: 1, duration: 3 });
    });
    // Wheel/touch/keyboard navigation always takes control back immediately.
    listen(window, 'wheel', cancelDemo, { passive: true });
    listen(window, 'touchstart', cancelDemo, { passive: true });
    listen(window, 'keydown', e => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', 'Escape', ' '].includes(e.key))
        cancelDemo(); });
    nav.forEach(a => listen(a, 'click', cancelDemo));
    listen(window, 'scroll', requestRender, { passive: true });
    listen(window, 'resize', requestRender);
    listen(window,'cj-motion-change',()=>{still=!siteMotionEnabled();preference=still?'off':'on';buildMotion();});
    listen(reduced, 'change', () => { if (!preference) {
        still = reduced.matches;
        buildMotion();
    } });
    listen(document, 'visibilitychange', () => { if (document.hidden) {
        cancelDemo();
        if (opening)
            opening.pause();
    }
    else if (opening && !still) {
        opening.play();
    } });
    if (requested === 'on' || requested === 'off')
        savePreference(requested);
    root.classList.add('motion-ready');
    setStudio(0);
    setResearch(0);
    buildMotion();
    return () => { root.classList.remove('motion-ready'); cancelDemo(); opening?.kill(); layoutMedia?.revert(); motionContext?.revert(); cancelAnimationFrame(frame); listeners.forEach(fn => fn()); particles.replaceChildren(); embed.replaceChildren(); };
}
