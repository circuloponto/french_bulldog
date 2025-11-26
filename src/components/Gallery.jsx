import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const trackRef = useRef(null);
    const imagesRef = useRef([]);

    const images = [
        { src: '/images/gallery_bulldog_1_1764095328524.png', alt: 'French Bulldog puppy playing', caption: 'Playful Spirit' },
        { src: '/images/gallery_bulldog_2_1764095347594.png', alt: 'French Bulldog on cushion', caption: 'Refined Comfort' },
        { src: '/images/gallery_bulldog_3_1764095364324.png', alt: 'French Bulldog running on beach', caption: 'Joyful Freedom' },
        { src: '/images/gallery_bulldog_4_1764095378118.png', alt: 'French Bulldog close-up', caption: 'Soulful Gaze' },
        { src: '/images/gallery_bulldog_5_1764097997358.png', alt: 'French Bulldog elegant portrait', caption: 'Timeless Elegance' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation only on desktop (not mobile)
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile) {
                gsap.to(headerRef.current, {
                    y: -80,
                    scale: 0.6,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 5%',
                        scrub: 1.5,
                    },
                });
            }

            // Horizontal scroll on vertical scroll
            const track = trackRef.current;
            const trackWidth = track.scrollWidth - track.offsetWidth;

            gsap.to(track, {
                x: -trackWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${trackWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Image zoom on scroll into view
            imagesRef.current.forEach((img) => {
                if (!img) return;
                gsap.fromTo(img, 
                    { scale: 1.15 },
                    {
                        scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: img,
                            start: 'left 80%',
                            end: 'left 20%',
                            scrub: 1,
                            horizontal: true,
                            containerAnimation: gsap.getById && gsap.getById('galleryScroll'),
                        },
                    }
                );
            });

            // Background shapes parallax
            gsap.to('.gallery__bg-shape--1', {
                x: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            gsap.to('.gallery__bg-shape--2', {
                x: 80,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="gallery" className="gallery">
            <div className="gallery__bg-shape gallery__bg-shape--1"></div>
            <div className="gallery__bg-shape gallery__bg-shape--2"></div>

            <div ref={headerRef} className="gallery__header">
                <p className="gallery__subtitle">A Visual Story</p>
                <h2 className="gallery__title">Gallery</h2>
                <div className="gallery__accent"></div>
            </div>

            <div ref={trackRef} className="gallery__track">
                {images.map((image, index) => (
                    <div key={index} className="gallery__item">
                        <div className="gallery__image-wrapper">
                            <img 
                                ref={el => imagesRef.current[index] = el}
                                src={image.src} 
                                alt={image.alt} 
                            />
                        </div>
                        <div className="gallery__caption">
                            <span className="gallery__number">0{index + 1}</span>
                            <p className="gallery__caption-text">{image.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gallery__scroll-hint">
                <span>Scroll to explore</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        </section>
    );
};

export default Gallery;
