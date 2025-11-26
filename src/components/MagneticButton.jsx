import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './MagneticButton.css';

const MagneticButton = ({ children, className = '', href, onClick }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        
        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic pull effect
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out',
            });
            
            // Text follows more
            gsap.to(text, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
            
            gsap.to(text, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const Component = href ? 'a' : 'button';
    const props = href ? { href } : { onClick };

    return (
        <Component 
            ref={buttonRef} 
            className={`magnetic-btn ${className}`}
            {...props}
        >
            <span ref={textRef} className="magnetic-btn__text">
                {children}
            </span>
            <span className="magnetic-btn__bg"></span>
        </Component>
    );
};

export default MagneticButton;
