'use client';

import React, { useEffect, useState } from 'react';

export default function CircleCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse), disable on touch/mobile
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let targetX = -100;
    let targetY = -100;
    let currentTrailingX = -100;
    let currentTrailingY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is clickable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth trailing animation loop
    const animateTrailing = () => {
      currentTrailingX += (targetX - currentTrailingX) * 0.18;
      currentTrailingY += (targetY - currentTrailingY) * 0.18;
      setTrailingPos({ x: currentTrailingX, y: currentTrailingY });
      animationFrameId = requestAnimationFrame(animateTrailing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out border ${
            isHovered
              ? 'w-14 h-14 bg-amber-400/20 border-amber-400 scale-125 shadow-[0_0_20px_rgba(230,180,55,0.5)]'
              : isClicked
              ? 'w-9 h-9 bg-teal-500/25 border-teal-400 scale-90'
              : 'w-10 h-10 bg-transparent border-teal-400/70 shadow-[0_0_12px_rgba(7,140,138,0.3)]'
          }`}
        />
      </div>

      {/* Inner Pin-Point Precision Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-0"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered
              ? 'w-2 h-2 bg-amber-400 shadow-[0_0_8px_#E6B437]'
              : 'w-1.5 h-1.5 bg-[#082B59] border border-white'
          }`}
        />
      </div>
    </>
  );
}
