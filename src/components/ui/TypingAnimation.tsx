"use client";
import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Create Todo Website',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Build a Calculator Website',
        1000,
        'Generate a Portfolio Site',
        1000,
        'Launch a Blog in Seconds',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2rem', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;