// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
const heroTl = gsap.timeline();

heroTl.to('.reveal-text', {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
    stagger: 0.2
})
.to('.hero-cta', {
    opacity: 1,
    y: -10,
    duration: 1,
    ease: 'power2.out'
}, '-=1');

// Parallax Effect on Hero Text
gsap.to('.hero-text', {
    scrollTrigger: {
        trigger: 'header',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    opacity: 0.5,
    scale: 0.9
});

// BENTO GRID ENTRANCE
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'power3.out'
    });

    // 3D TILT EFFECT LOGIC
    // Using vanilla JS for performance instead of heavy library
    const content = card.querySelector('.bento-content');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(content, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(content, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// COUNT UP ANIMATION
const countUp = document.querySelector('.count-up');
if(countUp) {
    ScrollTrigger.create({
        trigger: countUp,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            const val = parseInt(countUp.getAttribute('data-val'));
            gsap.to(countUp, {
                innerText: val,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    });
}

// MARQUEE SCROLL EFFECT
gsap.to('.marquee-container', {
    xPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.marquee-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    }
});

// FOOTER HOVER INTERACTION
const emailTrigger = document.querySelector('.email-trigger');
emailTrigger.addEventListener('mouseenter', () => {
    gsap.to(emailTrigger, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
});
emailTrigger.addEventListener('mouseleave', () => {
    gsap.to(emailTrigger, { scale: 1, duration: 0.3, ease: 'power2.out' });
});