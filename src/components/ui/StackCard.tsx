import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
interface CardProps {
    i: number;
    title: string;
    description: string;
    src: string;
    url: StaticImageData;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    point1: string;
    point2: string;
    point3: string;
    imageleft?: boolean;
  }
  export const Card: React.FC<CardProps> = ({
    i,
    title,
    description,
    url,
    point1,
    point2,
    point3,
    color,
    progress,
    range,
    targetScale,
    imageleft ,
  }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start end', 'start start'],
    });
  
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);
  
    return (
      <div
        ref={container}
        className='h-screen max-smobile:h[55vh]  flex items-center justify-center sticky top-0'
      >
        <motion.div
          style={{
            backgroundColor: color,
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className={`flex flex-col relative -top-[25%] h-[400px] max-mobile:h-fit justify-center w-[70%] max-tablet:w-[90%] rounded-[7px] p-10 origin-top border-[1.5px] border-gray-800 `}
        >
         <div className={`w-full flex  justify-between items-center ${imageleft?"flex-row-reverse":""} `} >
              <div className='w-[47%] flex flex-col gap-[1rem] max-mobile:w-full ' >
                <h2 className='text-[3rem] font-semibold text-gray-100 ' >{title}</h2>
                <p className='text-[1.5rem] text-gray-300 ' >{description}</p>
                <div className='flex flex-col gap-[1.5rem]   ' >
                  <h3 className='text-[1.5rem] flex items-center gap-[0.7rem] ' ><AutoAwesomeIcon className='!text-[2rem] text-[#067fea] ' />{point1}</h3>
                  <h3 className='text-[1.5rem] flex items-center gap-[0.7rem] ' ><AutoAwesomeIcon className='!text-[2rem] text-[#c33104] ' />{point2}</h3>
                  <h3 className='text-[1.5rem] flex items-center gap-[0.7rem] ' ><AutoAwesomeIcon className='!text-[2rem] text-[#067fea] ' />{point3}</h3>
                </div>
              </div>
              <div className={`relative w-[47%] max-mobile:hidden  h-full rounded-lg overflow-hidden `}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={url} alt='image' className='object-cover' />
            </motion.div>
              </div>
         </div>
        </motion.div>
      </div>
    );
  };