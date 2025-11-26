import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    const events = [
        { year: '1800s', title: 'Origins in England', description: 'French Bulldogs originated as miniature Bulldogs, bred by lace workers in Nottingham during the early Industrial Revolution.' },
        { year: '1860s', title: 'Journey to France', description: 'Lace workers migrated to France, bringing their beloved companions, where the breed found favor among Parisian society.' },
        { year: '1880s', title: 'Parisian Icon', description: 'The breed became a symbol of Parisian culture, favored by artists, writers, and the fashionable elite of the Belle Époque.' },
        { year: '1898', title: 'American Recognition', description: 'The French Bulldog Club of America was founded, establishing the breed standard with distinctive bat ears.' },
        { year: 'Today', title: 'Global Phenomenon', description: 'French Bulldogs rank among the most beloved breeds worldwide, cherished for their companionship and distinctive character.' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current.children, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
            });

            gsap.to('.timeline__line path', {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline__container',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    scrub: 1,
                },
            });

            gsap.to('.timeline__bg-shape--1', {
                y: -70,
                rotate: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            gsap.to('.timeline__bg-shape--2', {
                y: 90,
                x: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            const items = gsap.utils.toArray('.timeline__item');
            items.forEach((item) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: item, start: 'top 85%' },
                });

                const description = item.querySelector('.timeline__description');
                if (description) {
                    const text = description.textContent;
                    const words = text.split(' ');
                    description.innerHTML = '';

                    words.forEach((word, index) => {
                        const span = document.createElement('span');
                        span.textContent = word;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        description.appendChild(span);

                        if (index < words.length - 1) {
                            description.appendChild(document.createTextNode(' '));
                        }
                    });

                    gsap.to(description.querySelectorAll('span'), {
                        opacity: 1,
                        stagger: 0.03,
                        duration: 0.4,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: description,
                            start: 'top 85%',
                            end: 'top 65%',
                            scrub: 1,
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="heritage" className="timeline section">
            <div className="timeline__bg-shape timeline__bg-shape--1"></div>
            <div className="timeline__bg-shape timeline__bg-shape--2"></div>

            <div className="container">
                <div ref={headerRef} className="timeline__header">
                    <p className="timeline__subtitle">A Rich History</p>
                    <h2 className="timeline__title">Heritage</h2>
                    <div className="timeline__accent"></div>
                </div>

                <div className="timeline__container">
                    <div className="timeline__line">
                        <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
                            <path d="M 50 0 Q 20 80 50 160 Q 75 240 50 320 Q 30 400 50 480 Q 70 560 50 640 Q 25 720 50 800 Q 65 880 50 960 L 50 1000" />
                        </svg>
                    </div>

                    {events.map((event, index) => (
                        <div key={index} className={`timeline__item ${index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
                            <div className="timeline__content">
                                <div className="timeline__year">{event.year}</div>
                                <h3 className="timeline__event-title">{event.title}</h3>
                                <p className="timeline__description">{event.description}</p>
                            </div>
                            <div className="timeline__dot"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
