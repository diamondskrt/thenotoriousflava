import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IOptions {
  ease?: string;
  x?: number;
  y?: number;
  rotation?: number;
  scrollTrigger?: gsap.DOMTarget;
}

export const gsapAnimation = (ref: gsap.TweenTarget, options: IOptions) => {
  return gsap.from(ref, {
    scrollTrigger: options.scrollTrigger,
    rotation: options.rotation,
    y: options.y,
    ease: options.ease,
    x: options.x,
    delay: options.ease ? 1 : 0.5,
    duration: options.ease ? 2 : 1,
    opacity: 0,
  });
};
