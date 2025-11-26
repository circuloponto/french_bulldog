import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const imageRef = useRef(null);
    const statsRef = useRef(null);
    const counter1Ref = useRef(null);
    const counter2Ref = useRef(null);
    const counter3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(headerRef.current.children, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                },
            });

            // Image parallax + zoom effect
            const img = imageRef.current.querySelector('img');
            
            gsap.to(imageRef.current, {
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            // Image zoom reveal
            gsap.fromTo(img,
                { scale: 1.3 },
                {
                    scale: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                }
            );

            // Stat cards parallax - different speeds for depth
            const cards = gsap.utils.toArray('.stat-card');
            cards.forEach((card, index) => {
                gsap.to(card, {
                    y: -30 * (index + 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            });

            // Elegant word-by-word text reveal
            const animateWordsReveal = (element) => {
                const text = element.textContent;
                const words = text.split(' ');
                element.innerHTML = words.map(word => 
                    `<span class="word-reveal"><span class="word-reveal__inner">${word}</span></span>`
                ).join(' ');
                
                gsap.fromTo(element.querySelectorAll('.word-reveal__inner'),
                    { 
                        y: '110%',
                        rotateX: -80,
                    },
                    {
                        y: '0%',
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.02,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 85%',
                        },
                    }
                );
            };

            if (text1Ref.current) animateWordsReveal(text1Ref.current);
            if (text2Ref.current) animateWordsReveal(text2Ref.current);

            // Counter animations
            const animateCounter = (element, endValue) => {
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: endValue,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        element.textContent = Math.round(obj.value);
                    },
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                    },
                });
            };

            animateCounter(counter1Ref.current, 1835);
            animateCounter(counter2Ref.current, 2);
            animateCounter(counter3Ref.current, 12);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="about section">
            <div className="about__bg-shape about__bg-shape--1"></div>
            <div className="about__bg-shape about__bg-shape--2"></div>

            <div className="container">
                <div ref={headerRef} className="about__header">
                    <p className="about__subtitle">The Beloved Companion</p>
                    <h2 className="about__title">French Bulldog</h2>
                    <div className="about__accent"></div>
                </div>

                <div className="about__content">
                    <div className="about__text">
                        <p ref={text1Ref}>
                            The French Bulldog embodies a rare combination of sophistication and charm. Originating from the cobblestone streets of Paris, these distinguished companions have captured the hearts of discerning dog lovers worldwide.
                        </p>
                        <p ref={text2Ref}>
                            With their distinctive silhouette and refined demeanor, French Bulldogs represent the perfect balance of elegance and character. Their compact, muscular build and signature bat ears have made them icons of contemporary canine culture.
                        </p>
                    </div>

                    <div ref={imageRef} className="about__image">
                        <img
                            src="/images/gallery_bulldog_4_1764095378118.png"
                            alt="French Bulldog portrait"
                        />
                    </div>
                </div>

                <div ref={statsRef} className="about__stats">
                    <div className="stat-card">
                        <div className="stat-card__number">
                            <span ref={counter1Ref}>0</span>
                        </div>
                        <div className="stat-card__label">Year of Origin</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__number">
                            #<span ref={counter2Ref}>0</span>
                        </div>
                        <div className="stat-card__label">Popularity Rank</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__number">
                            <span ref={counter3Ref}>0</span>
                        </div>
                        <div className="stat-card__label">Years Lifespan</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
