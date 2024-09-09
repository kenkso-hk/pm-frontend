import React from 'react';
import { BsFillCloudyFill, BsStarFill } from 'react-icons/bs';
import { useThemeProvider } from '../utils/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div className=" h-[100px] flex items-center justify-center transition-colors">
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === 'light'}
        onChange={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
      />
      <label
        htmlFor="light-switch"
        className={`p-1 w-16 rounded-full flex shadow-lg relative bg-gradient-to-b cursor-pointer ${
          currentTheme === 'light'
            ? 'justify-end from-blue-500 to-sky-300'
            : 'justify-start from-indigo-600 to-indigo-400'
        }`}
      >
        <Thumb mode={currentTheme} />
        {currentTheme === 'light' && <Clouds />}
        {currentTheme === 'dark' && <Stars />}
      </label>
    </div>
  );
}

const Thumb = ({ mode }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: 'spring',
      }}
      className="h-6 w-6 rounded-full overflow-hidden shadow-lg relative"
    >
      <div
        className={`absolute inset-0 ${
          mode === 'dark'
            ? 'bg-slate-100'
            : 'animate-pulse bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full'
        }`}
      />
      {mode === 'light' && <SunCenter />}
      {mode === 'dark' && <MoonSpots />}
    </motion.div>
  );
};

const SunCenter = () => (
  <div className="absolute inset-1 rounded-full bg-amber-300" />
);

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -3, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="w-2 h-2 rounded-full bg-slate-300 absolute right-1.5 bottom-1"
    />
    <motion.div
      initial={{ x: -3, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-2 h-2 rounded-full bg-slate-300 absolute left-1 bottom-3"
    />
    <motion.div
      initial={{ x: -3, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute right-1.5 top-1.5"
    />
  </>
);

const Stars = () => {
  return (
    <>
      <motion.span
        animate={{
          scale: [0.75, 1, 0.75],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeIn',
        }}
        className="text-slate-300 text-[6px] absolute right-8 top-1.5"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.75, 1],
          opacity: [0.5, 0.25, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeIn',
        }}
        style={{ rotate: '-45deg' }}
        className="text-slate-300 text-[10px] absolute right-3 top-2"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.5, 1],
          opacity: [1, 0.5, 1],
        }}
        style={{ rotate: '45deg' }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: 'easeIn',
        }}
        className="text-slate-300 text-[8px] absolute right-7 top-7"
      >
        <BsStarFill />
      </motion.span>
    </>
  );
};

const Clouds = () => {
  return (
    <>
      <motion.span
        animate={{ x: [-15, -10, -5, 0], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="text-white text-[6px] absolute left-8 top-1"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-10, 0, 10, 20], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="text-white text-[10px] absolute left-3 top-3"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-7, 0, 7, 14], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
        }}
        className="text-white text-[8px] absolute left-8 top-6"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-15, 0, 15, 30], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          delay: 0.75,
        }}
        className="text-white text-[6px] absolute left-12 top-3"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
};
