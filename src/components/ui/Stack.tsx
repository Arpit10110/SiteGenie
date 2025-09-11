'use client';
import { ReactLenis } from 'lenis/react';
import { useScroll } from 'motion/react';
import { useRef } from 'react';
import React from 'react'
import { Card } from './StackCard';

const projects = [
    {
        title: 'Smart HTML Structure',
        description:
          'GenieLab ensures your code stays semantic and easy to maintain, giving you a rock-solid foundation to build websites that scale effortlessly.',
        point1: "Auto-generated clean and valid HTML",
        point2: "Lightweight and SEO-friendly structure",
        point3: "Optimized for accessibility and best practices",
        src: 'rock.jpg',
        link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
        color: '#191B1B',
      },
      {
        title: 'Modern CSS Styling',
        description:
          'Design with style using responsive layouts, sleek animations, and pixel-perfect precision that adapt beautifully across devices.',
        point1: "Pre-built responsive layouts",
        point2: "Advanced gradient & animation effects",
        point3: "Dark mode and theme customization out of the box",
        src: 'rock.jpg',
        link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
        color: '#191B1B',
      },
      {
        title: 'Instant Preview & Testing',
        description:
          'Skip the guesswork — watch changes appear in real-time as you code, test, and fine-tune your website instantly without delays.',
        point1: "Live editing with zero reload",
        point2: "Cross-device preview simulation",
        point3: "Error detection & quick debugging built-in",
        src: 'rock.jpg',
        link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
        color: '#191B1B',
      }
      
];
const Stack = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });
  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <section className='text-white   w-full bg-black '>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

export default Stack