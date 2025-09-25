'use client';
import { ReactLenis } from 'lenis/react';
import { useScroll } from 'motion/react';
import { useRef } from 'react';
import React from 'react'
import { Card } from './StackCard';
import StackImage1 from "@/assets/html-image.png"
import StackImage2 from "@/assets/css-image.png"
import StackImage3 from "@/assets/preview-image.png"
const projects = [
    {
        title: 'Smart HTML Structure',
        description:
          'GenieLab ensures your code stays semantic and easy to maintain, giving you a rock-solid foundation to build websites that scale effortlessly.',
        point1: "Auto-generated clean and valid HTML",
        point2: "Lightweight and SEO-friendly structure",
        point3: "Optimized for accessibility and best practices",
        src: 'rock.jpg',
        link: StackImage1,
        color: '#000000',
        imageleft: false,
      },
      {
        title: 'Modern CSS Styling',
        description:
          'Design with style using responsive layouts, sleek animations, and pixel-perfect precision that adapt beautifully across devices.',
        point1: "Pre-built responsive layouts",
        point2: "Advanced gradient & animation effects",
        point3: "Dark mode and theme customization out of the box",
        src: 'rock.jpg',
        link: StackImage2,
        color: '#000000',
        imageleft: true,
      },
      {
        title: 'Instant Preview & Testing',
        description:
          'Skip the guesswork — watch changes appear in real-time as you code, test, and fine-tune your website instantly without delays.',
        point1: "Live editing with zero reload",
        point2: "Cross-device preview simulation",
        point3: "Error detection & quick debugging built-in",
        src: 'rock.jpg',
        link: StackImage3,
        color: '#000000',
        imageleft: false,

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
                point1={project?.point1}
                point2={project?.point2}
                point3={project?.point3}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                imageleft={project?.imageleft}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

export default Stack