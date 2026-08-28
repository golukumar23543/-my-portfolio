import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function IndependenceDay() {

  useEffect(() => {
    const tricolor = ['#FF9933', '#FFFFFF', '#138808'];

    const duration = 7 * 1000;
    const end = Date.now() + duration;

    // Side fireworks (Patake) over the website
    const sideInterval = setInterval(() => {
      // Left side burst
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.9 },
        colors: tricolor,
        startVelocity: 65,
        gravity: 1.1,
        zIndex: 300,
        ticks: 200
      });
      // Right side burst
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.9 },
        colors: tricolor,
        startVelocity: 65,
        gravity: 1.1,
        zIndex: 300,
        ticks: 200
      });
    }, 800);

    // Random fireworks across the screen
    const randomFireworks = () => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { 
          x: Math.random() * 0.8 + 0.1, 
          y: Math.random() * 0.5 + 0.1 
        },
        colors: tricolor,
        startVelocity: 40,
        gravity: 0.8,
        zIndex: 100,
        ticks: 300
      });

      if (Date.now() < end) {
        setTimeout(randomFireworks, 400 + Math.random() * 300);
      } else {
        clearInterval(sideInterval);
      }
    };
    
    randomFireworks();

    return () => {
      clearInterval(sideInterval);
    };
  }, []);

  return null;
}
