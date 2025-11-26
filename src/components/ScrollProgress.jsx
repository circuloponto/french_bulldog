import { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="scroll-progress">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="scroll-progress__bg"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="scroll-progress__fill"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
            </svg>
            <span className="scroll-progress__percent">{Math.round(progress)}%</span>
        </div>
    );
};

export default ScrollProgress;
