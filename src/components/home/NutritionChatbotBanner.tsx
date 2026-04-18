'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function NutritionChatbotBanner() {
  const t = useTranslations('nutritionAssistant');
  const [waterPos, setWaterPos] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastRippleTime = useRef(0);
  const rippleIdRef = useRef(0);

  const handleWaterMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setWaterPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    const now = Date.now();
    if (now - lastRippleTime.current > 400) {
      lastRippleTime.current = now;
      const id = rippleIdRef.current++;
      setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1400);
    }
  }, []);

  return (
    <section
      className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden"
      onMouseMove={handleWaterMouseMove}
    >
      {/* Water glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 400px at ${waterPos.x}% ${waterPos.y}%, rgba(245,159,32,0.07) 0%, transparent 70%)`,
        }}
      />
      {/* Ripple rings */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="water-ripple absolute pointer-events-none z-10 rounded-full border border-alba-primary/20"
          style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left - Icon and Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 md:gap-8"
          >
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-alba-primary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-alba-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-alba-primary animate-pulse" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('badge')}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                {t('title')}
              </h3>
              <p className="text-gray-500 text-sm md:text-base mt-1 max-w-lg">
                {t('description')}
              </p>
            </div>
          </motion.div>

          {/* Right - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="https://nutritional-chatbot-ui.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-alba-primary hover:bg-alba-primary-dark text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-alba-primary/30"
            >
              {t('cta')}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}

export default NutritionChatbotBanner;
