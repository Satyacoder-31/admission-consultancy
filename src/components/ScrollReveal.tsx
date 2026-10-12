'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getInitialPosition = () => {
    // On mobile, keep horizontal offset 0 to strictly avoid right-side viewport gap
    if (isMobile) {
      return { opacity: 0, y: 20, x: 0 };
    }
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30, x: 0 };
      case 'down':
        return { opacity: 0, y: -30, x: 0 };
      case 'left':
        return { opacity: 0, x: -35, y: 0 };
      case 'right':
        return { opacity: 0, x: 40, y: 0 };
      default:
        return { opacity: 0, y: 25, x: 0 };
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <motion.div
        initial={getInitialPosition()}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SlideImageRightToLeft({
  children,
  className = '',
  delay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
          // Mobile strictly avoids positive x translation to prevent horizontal expansion
          x: isMobile ? 0 : 45,
          y: isMobile ? 20 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
