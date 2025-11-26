import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const accentRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax background image
            gsap.to(imageRef.current, {
                y: 200,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Split title into words to prevent wrapping issues
            const title = titleRef.current;
            const words = title.textContent.trim().split(' ');
            title.innerHTML = words.map(word => 
                `<span class="word-wrapper"><span class="word-inner">${word}</span></span>`
            ).join(' ');

            // Elegant word reveal animation
            gsap.fromTo(title.querySelectorAll('.word-inner'),
                { 
                    y: '100%',
                    opacity: 0,
                },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    delay: 0.3,
                    ease: 'power3.out',
                }
            );

            gsap.from(accentRef.current, {
                opacity: 0,
                scaleX: 0,
                duration: 0.8,
                delay: 1.2,
                ease: 'power2.out',
            });

            gsap.from(subtitleRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 1.5,
                ease: 'power2.out',
            });

            // Subtle scroll indicator animation
            gsap.to(scrollIndicatorRef.current, {
                y: 8,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <div className="hero__background">
                <div ref={imageRef} className="hero__image" />
            </div>

            <div className="hero__content container">
                <h1 ref={titleRef} className="hero__title">
                    FRENCH BULLDOG
                </h1>
                <div ref={accentRef} className="hero__accent"></div>
                <p ref={subtitleRef} className="hero__subtitle">
                    Timeless Elegance · Parisian Heritage
                </p>
                <MagneticButton href="#about" className="magnetic-btn--light hero__cta">
                    Discover More
                </MagneticButton>
            </div>

            <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
                <div className="scroll-arrow"></div>
                <span>Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
