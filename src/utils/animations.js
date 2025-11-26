import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize smooth scrolling and GSAP defaults
 */
export const initAnimations = () => {
  // Set default GSAP settings
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // Enable ScrollTrigger
  ScrollTrigger.defaults({
    markers: false, // Set to true for debugging
    start: 'top 80%',
    end: 'bottom 20%',
  });
};

/**
 * Fade in animation with ScrollTrigger
 */
export const fadeIn = (element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Slide up animation with ScrollTrigger
 */
export const slideUp = (element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements, options = {}) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Parallax effect
 */
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => element.offsetHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Scale animation on scroll
 */
export const scaleIn = (element, options = {}) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Counter animation for numbers
 */
export const animateCounter = (element, endValue, options = {}) => {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: endValue,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Reveal animation with clip path
 */
export const clipReveal = (element, options = {}) => {
  return gsap.from(element, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};

/**
 * Draw line animation (for SVG or border)
 */
export const drawLine = (element, options = {}) => {
  return gsap.from(element, {
    scaleX: 0,
    transformOrigin: 'left',
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
    ...options,
  });
};
