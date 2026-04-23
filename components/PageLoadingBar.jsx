'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  // Simulate progress increments
  const startLoading = useCallback(() => {
    setLoading(true);
    setVisible(true);
    setProgress(0);

    // Quick initial jump
    setTimeout(() => setProgress(30), 50);
    setTimeout(() => setProgress(50), 200);

    // Slow trickle
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timerRef.current);
          return prev;
        }
        return prev + Math.random() * 8;
      });
    }, 400);
  }, []);

  const completeLoading = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);

    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 200);
  }, []);

  // Detect route changes
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    
    if (prevPathRef.current !== currentPath) {
      // Route changed — complete the loading
      completeLoading();
      prevPathRef.current = currentPath;
    }
  }, [pathname, searchParams, completeLoading]);

  // Intercept link clicks to start the loading bar
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip external links, anchors, and non-navigation links
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('wa.me') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) return;

      const currentPath = pathname + searchParams.toString();
      // Only show loading if navigating to a different page
      if (href !== currentPath && href !== pathname) {
        startLoading();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, searchParams, startLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      {/* Background track */}
      <div className="absolute inset-0 bg-primary/10" />
      
      {/* Progress bar */}
      <div
        className="h-full bg-primary relative transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: loading ? '400ms' : '200ms',
        }}
      >
        {/* Glow effect */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white/40 to-transparent" />
        {/* Pulse dot at the end */}
        <div className="absolute right-0 top-[-1px] w-[5px] h-[5px] rounded-full bg-primary shadow-[0_0_10px_2px] shadow-primary/50" />
      </div>
    </div>
  );
}
