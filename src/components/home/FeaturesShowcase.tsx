'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Clock, TrendingUp, Activity, Shield, Users } from 'lucide-react';
import {
  GlassCard,
  GlassBadge,
  GlassMetric,
  GlassStatus,
  GlassProgress,
} from '@/components/ui/GlassCard';
import { TextReveal, ParallaxImage } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);

  // Cards stagger animation
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cardElements = cards.querySelectorAll('.feature-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Stats bar animation
  useEffect(() => {
    const statsBar = statsBarRef.current;
    if (!statsBar) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsBar,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: statsBar,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <ParallaxImage
        speed={0.2}
        scale={1.1}
        className="absolute inset-0"
        imageClassName="w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop"
          alt="Modern dialysis medical equipment in a clinical setting showcasing advanced healthcare technology"
          className="w-full h-full object-cover"
        />
      </ParallaxImage>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f25]/95 via-[#0f2d36]/90 to-[#2B3A42]/85" />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <TextReveal
            type="words"
            animation="fade-up"
            stagger={0.05}
            duration={0.8}
          >
            <GlassBadge variant="lime" className="mb-4">
              Por que elegirnos
            </GlassBadge>
          </TextReveal>

          <TextReveal
            as="h2"
            type="lines"
            animation="fade-up"
            stagger={0.1}
            duration={1}
            delay={0.1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Excelencia en Cada Detalle
          </TextReveal>

          <TextReveal
            as="p"
            type="lines"
            animation="fade-up"
            duration={0.8}
            delay={0.2}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Combinamos tecnologia de vanguardia con atencion humana para ofrecerte el mejor cuidado renal
          </TextReveal>
        </div>

        {/* Glass Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Card 1: Tecnologia Avanzada */}
          <div className="feature-card">
            <GlassCard
              variant="light"
              blur="lg"
              glow
              className="p-6 lg:p-8 h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <GlassBadge variant="lime">Equipamiento</GlassBadge>
                <div className="w-12 h-12 rounded-xl bg-lime-400/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-lime-400" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Tecnologia Avanzada
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Equipos de ultima generacion para tratamientos mas efectivos
              </p>

              <div className="space-y-4">
                <GlassMetric value="32" label="Maquinas de Dialisis" accent />
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-mono text-white/60">COFEPRIS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-mono text-white/60">ISO 9001</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Card 2: Atencion 24/7 */}
          <div className="feature-card">
            <GlassCard
              variant="light"
              blur="lg"
              className="p-6 lg:p-8 h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <GlassBadge variant="teal">Disponibilidad</GlassBadge>
                <div className="w-12 h-12 rounded-xl bg-teal-400/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-400" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Atencion 24/7
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Siempre disponibles cuando mas nos necesitas
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <GlassStatus status="online" label="Servicio Activo" />
                  <span className="text-2xl font-bold text-white font-mono">24/7</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold text-white block">4</span>
                    <span className="text-xs font-mono text-white/60">Sucursales</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold text-white block">15+</span>
                    <span className="text-xs font-mono text-white/60">Especialistas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <Users className="w-4 h-4" />
                  <span>Equipo medico disponible las 24 horas</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Card 3: Resultados */}
          <div className="feature-card md:col-span-2 lg:col-span-1">
            <GlassCard
              variant="light"
              blur="lg"
              glow
              className="p-6 lg:p-8 h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <GlassBadge variant="lime">Resultados</GlassBadge>
                <div className="w-12 h-12 rounded-xl bg-lime-400/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-lime-400" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Resultados Comprobados
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Nuestros pacientes confian en nosotros
              </p>

              <div className="space-y-6">
                <div className="flex items-end gap-4">
                  <span className="text-5xl lg:text-6xl font-bold text-lime-400 tabular-nums">
                    98
                  </span>
                  <div className="pb-2">
                    <span className="text-2xl font-bold text-lime-400">%</span>
                    <p className="text-xs font-mono text-white/60 uppercase tracking-wider">
                      Satisfaccion
                    </p>
                  </div>
                </div>

                <GlassProgress value={98} accentColor="lime" />

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white">5,000+</span>
                    <span className="text-xs font-mono text-white/60">Pacientes Atendidos</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white">25+</span>
                    <span className="text-xs font-mono text-white/60">Años de Experiencia</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div ref={statsBarRef} className="mt-12 lg:mt-16">
          <GlassCard variant="light" blur="md" hover={false} className="p-4 lg:p-6">
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime-400/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-lime-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Certificados COFEPRIS</p>
                  <p className="text-xs font-mono text-white/60">Todas las sucursales</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/20" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-400/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Tecnologia de Punta</p>
                  <p className="text-xs font-mono text-white/60">Equipos de ultima generacion</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/20" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime-400/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-lime-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Equipo Especializado</p>
                  <p className="text-xs font-mono text-white/60">Nefrologos certificados</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export default FeaturesShowcase;
