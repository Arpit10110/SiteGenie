'use client';

import { useState, useEffect } from 'react';

interface AILoaderProps {
  type: 'fresh' | 'modify';
}

const Ailoader: React.FC<AILoaderProps> = ({ type }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const freshSteps = [
    '🤔 AI is thinking',
    '🏗️ Writing HTML structure',
    '🎨 Styling with CSS',
    '⚡ Adding interactivity with JS',
    '🔍 Refining code and layout',
    '🚀 Optimizing preview'
  ];

  const modifySteps = [
    '🔄 Understanding your changes',
    '✍️ Updating HTML',
    '🎨 Adjusting CSS styles',
    '⚡ Tweaking JavaScript logic',
    '📦 Repacking final project',
    '🔍 Validating updates'
  ];

  const steps = type === 'fresh' ? freshSteps : modifySteps;

  useEffect(() => {
    setCurrentStep(0);

    const intervalId = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [type, steps.length]);

  return (
    <div className="flex  justify-center max-mobile:mt-[8rem] mt-[5rem] w-full bg-black rounded-lg ">
      <div className="relative flex flex-col items-center justify-center space-y-6 w-full max-w-md">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const distance = Math.abs(index - currentStep);
          const isFar = distance > 1;

          return (
            <div
              key={index}
              className={`
                transition-all duration-700 ease-in-out
                ${isActive ? 'scale-100 opacity-100' : 'scale-100 opacity-70'}
                ${isActive ? 'blur-none' : isFar ? 'blur-[3px]' : 'blur-[1px]'}
              `}
            >
              <div
                className={`
                  px-6 py-4 rounded-lg text-center font-medium text-lg
                  transition-all duration-700
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-orange-500/20 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-800/30 text-gray-500'
                  }
                  ${isActive ? 'ring-2 ring-blue-400/50' : ''}
                `}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ailoader;
