import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FunFacts.css';

gsap.registerPlugin(ScrollTrigger);

const FunFacts = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    const characteristics = [
        {
            title: 'Distinctive Silhouette',
            description: 'Their signature bat ears and compact, muscular build create an instantly recognizable profile that has become iconic in canine culture.'
        },
        {
            title: 'Affectionate Nature',
            description: 'Known for their gentle temperament and devotion to their companions, making them ideal for various living environments.'
        },
        {
            title: 'Parisian Heritage',
            description: 'Originating from the streets of Paris, these dogs embody French elegance and have become symbols of sophisticated companionship.'
        },
        {
            title: 'Adaptable Companions',
            description: 'Their moderate exercise needs and compact size make them perfectly suited for both urban apartments and country estates.'
        },
        {
            title: 'Expressive Character',
            description: 'Despite their dignified appearance, French Bulldogs possess a playful spirit and communicate through charming facial expressions.'
        },
        {
            title: 'Global Appeal',
            description: 'From Parisian boulevards to Manhattan penthouses, they have captured hearts across continents and social circles.'
        }
    ];

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

            // Card staggered reveal
            const cards = gsap.utils.toArray('.characteristic-card');
            cards.forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                });

                // Word-by-word reveal for descriptions
                const description = card.querySelector('.characteristic-card__description');
                if (description) {
                    const text = description.textContent;
                    const words = text.split(' ');
                    description.innerHTML = words.map(word => 
                        `<span class="word-reveal"><span class="word-reveal__inner">${word}</span></span>`
                    ).join(' ');

                    gsap.fromTo(description.querySelectorAll('.word-reveal__inner'),
                        { y: '100%', opacity: 0 },
                        {
                            y: '0%',
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.015,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="characteristics" className="fun-facts section">
            <div className="container">
                <div ref={headerRef} className="fun-facts__header">
                    <p className="fun-facts__subtitle">Defining Traits</p>
                    <h2 className="fun-facts__title">Characteristics</h2>
                    <div className="fun-facts__accent"></div>
                </div>

                <div className="fun-facts__grid">
                    {characteristics.map((item, index) => (
                        <div key={index} className="characteristic-card">
                            <div className="characteristic-card__number">{String(index + 1).padStart(2, '0')}</div>
                            <h3 className="characteristic-card__title">{item.title}</h3>
                            <p className="characteristic-card__description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FunFacts;
