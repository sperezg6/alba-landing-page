'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

export function NutritionChatbotBanner() {
  return (
    <section className="relative bg-alba-dark pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alba-primary/40 to-transparent" />

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
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-alba-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-alba-primary animate-pulse" />
                <span className="text-xs font-medium text-alba-primary uppercase tracking-wider">
                  Nueva Herramienta
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light" style={{ color: 'white' }}>
                Asistente de <span className="text-alba-primary">Nutrición Renal</span>
              </h3>
              <p className="text-gray-400 text-sm md:text-base mt-1 max-w-lg">
                Resuelve tus dudas nutricionales al instante con nuestro asistente inteligente
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
              className="group inline-flex items-center gap-3 bg-alba-primary hover:bg-alba-primary-dark text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-alba-primary/30"
            >
              Probar Ahora
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alba-primary/40 to-transparent" />
    </section>
  );
}

export default NutritionChatbotBanner;
