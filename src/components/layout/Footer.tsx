'use client';

import { useRef, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { usePostHog } from 'posthog-js/react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { branches } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { href: '/servicios', labelKey: 'nav.services' },
  { href: '/sucursales', labelKey: 'nav.branches' },
  { href: '/nosotros', labelKey: 'nav.about' },
  { href: '/directorio', labelKey: 'nav.doctors' },
  { href: '/contacto', labelKey: 'nav.contact' },
];

const socialLinks = [
  { href: 'https://facebook.com/albadialisis', label: 'Fb' },
  { href: 'https://instagram.com/albadialisis', label: 'Ig' },
  { href: 'https://youtube.com/@albadialisis', label: 'Yt' },
  { href: 'https://linkedin.com/company/albadialisis', label: 'Li' },
];

export function Footer() {
  const t = useTranslations();
  const tEmergency = useTranslations('emergency');
  const tNutrition = useTranslations('nutritionAssistant');
  const posthog = usePostHog();
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const mainBranch = branches[0];

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on big text
      if (bigTextRef.current) {
        gsap.to(bigTextRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }

      // Animate all horizontal lines
      const hLines = footerRef.current?.querySelectorAll('.h-line');
      hLines?.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate all vertical lines
      const vLines = footerRef.current?.querySelectorAll('.v-line');
      vLines?.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate all ticks
      const ticks = footerRef.current?.querySelectorAll('.line-tick');
      ticks?.forEach((tick, i) => {
        gsap.fromTo(
          tick,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.3 + i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-alba-dark overflow-hidden">
      {/* Top horizontal line with ticks */}
      <div className="absolute top-0 left-0 right-0 px-6 md:px-16 lg:px-24">
        <div className="relative w-full h-px">
          <div className="h-line absolute inset-0 bg-white/20 origin-center" />
          <div className="line-tick absolute left-0 top-0 w-px h-4 bg-white/20 origin-top -translate-y-1/2" />
          <div className="line-tick absolute left-1/4 top-0 w-px h-3 bg-white/10 origin-top -translate-y-1/2" />
          <div className="line-tick absolute left-1/2 top-0 w-px h-4 bg-white/20 origin-top -translate-x-1/2 -translate-y-1/2" />
          <div className="line-tick absolute left-3/4 top-0 w-px h-3 bg-white/10 origin-top -translate-y-1/2" />
          <div className="line-tick absolute right-0 top-0 w-px h-4 bg-white/20 origin-top -translate-y-1/2" />
        </div>
      </div>

      {/* Left vertical line */}
      <div className="absolute top-0 bottom-0 left-6 md:left-16 lg:left-24 w-px hidden lg:block">
        <div className="v-line absolute inset-0 bg-white/10 origin-top" />
      </div>

      {/* Right vertical line */}
      <div className="absolute top-0 bottom-0 right-6 md:right-16 lg:right-24 w-px hidden lg:block">
        <div className="v-line absolute inset-0 bg-white/10 origin-top" />
      </div>

      {/* Giant ALBA text in background */}
      <div
        ref={bigTextRef}
        className="absolute -bottom-20 left-0 right-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="text-[20vw] md:text-[18vw] font-bold tracking-tight text-white/[0.03] leading-none text-center whitespace-nowrap">
          ALBA DIALISIS
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16">
        {/* Top Row - Large statement + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-16">
          {/* Left - Statement */}
          <div className="relative">
            {/* Decorative vertical line */}
            <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-px hidden md:block">
              <div className="v-line absolute inset-0 bg-alba-primary/30 origin-top" />
            </div>
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] max-w-lg"
              style={{ color: 'white' }}
            >
              {t('footer.description')}
            </h3>
          </div>

          {/* Right - Emergency CTA */}
          <div className="lg:text-right relative">
            {/* Decorative horizontal line */}
            <div className="absolute -top-4 left-0 right-0 h-px hidden lg:block">
              <div className="h-line absolute inset-0 bg-white/10 origin-right" />
            </div>
            <span className="text-[#F4F3E8]/40 text-xs uppercase tracking-[0.2em] block mb-4">
              {tEmergency('label')}
            </span>
            <a
              href="tel:4773293939"
              className="group inline-flex items-center gap-4"
              onClick={() => posthog.capture('phone_clicked', {
                phone_number: '477-329-39-39',
                source: 'footer_emergency',
              })}
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-light text-alba-primary group-hover:text-alba-primary-dark transition-colors">
                477-329-39-39
              </span>
              <ArrowUpRight className="w-8 h-8 text-alba-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Middle horizontal divider with ticks */}
        <div className="relative w-full h-px mb-16">
          <div className="h-line absolute inset-0 bg-white/20 origin-left" />
          <div className="line-tick absolute left-0 top-0 w-px h-3 bg-white/30 origin-center -translate-y-1/2" />
          <div className="line-tick absolute left-1/4 top-0 w-px h-2 bg-white/15 origin-center -translate-y-1/2" />
          <div className="line-tick absolute left-1/2 top-0 w-px h-3 bg-white/30 origin-center -translate-x-1/2 -translate-y-1/2" />
          <div className="line-tick absolute left-3/4 top-0 w-px h-2 bg-white/15 origin-center -translate-y-1/2" />
          <div className="line-tick absolute right-0 top-0 w-px h-3 bg-white/30 origin-center -translate-y-1/2" />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
          {/* Vertical dividers between columns (desktop only) */}
          <div className="absolute top-0 bottom-0 left-1/4 w-px hidden md:block -translate-x-4">
            <div className="v-line absolute inset-0 bg-white/10 origin-top" />
          </div>
          <div className="absolute top-0 bottom-0 left-1/2 w-px hidden md:block">
            <div className="v-line absolute inset-0 bg-white/10 origin-top" />
          </div>
          <div className="absolute top-0 bottom-0 left-3/4 w-px hidden md:block translate-x-4">
            <div className="v-line absolute inset-0 bg-white/10 origin-top" />
          </div>

          {/* Navigation */}
          <div className="relative">
            <span className="text-alba-primary text-xs uppercase tracking-[0.2em] block mb-6">
              Navigate
            </span>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F4F3E8]/60 hover:text-white transition-colors text-sm"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://nutritional-chatbot-ui.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F4F3E8]/60 hover:text-alba-primary transition-colors text-sm"
                >
                  {tNutrition('label')}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <span className="text-alba-primary text-xs uppercase tracking-[0.2em] block mb-6">
              {t('nav.branches')}
            </span>
            <ul className="space-y-3">
              {branches.slice(0, 4).map((branch) => (
                <li key={branch.id}>
                  <Link
                    href="/sucursales"
                    className="text-[#F4F3E8]/60 hover:text-white transition-colors text-sm"
                  >
                    {branch.name.replace('Alba ', '').replace('Unidad Medica ', '').replace('Unidad ', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-alba-primary text-xs uppercase tracking-[0.2em] block mb-6">
              {t('footer.contactInfo')}
            </span>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${mainBranch.phone.replace(/-/g, '')}`}
                  className="flex items-center gap-2 text-[#F4F3E8]/60 hover:text-white transition-colors text-sm"
                  onClick={() => posthog.capture('phone_clicked', {
                    phone_number: mainBranch.phone,
                    source: 'footer_contact',
                  })}
                >
                  <Phone className="w-3 h-3" />
                  {mainBranch.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@albadialisis.com"
                  className="flex items-center gap-2 text-[#F4F3E8]/60 hover:text-white transition-colors text-sm"
                  onClick={() => posthog.capture('email_clicked', {
                    email: 'contacto@albadialisis.com',
                    source: 'footer',
                  })}
                >
                  <Mail className="w-3 h-3" />
                  contacto@albadialisis.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#F4F3E8]/60 text-sm">
                <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>León, Guanajuato</span>
              </li>
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <span className="text-alba-primary text-xs uppercase tracking-[0.2em] block mb-6">
              Social
            </span>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#F4F3E8]/60 hover:border-alba-primary hover:text-alba-primary transition-all text-xs font-medium"
                  onClick={() => posthog.capture('social_clicked', {
                    platform: social.label,
                    url: social.href,
                  })}
                >
                  {social.label}
                </a>
              ))}
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-[#F4F3E8]/40 hover:text-[#F4F3E8]/60 transition-colors text-xs"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-[#F4F3E8]/40 hover:text-[#F4F3E8]/60 transition-colors text-xs"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with animated line */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        {/* Bottom divider line with ticks */}
        <div className="relative w-full h-px">
          <div className="h-line absolute inset-0 bg-white/10 origin-center" />
          <div className="line-tick absolute left-0 top-0 w-px h-2 bg-white/20 origin-bottom translate-y-0" />
          <div className="line-tick absolute right-0 top-0 w-px h-2 bg-white/20 origin-bottom translate-y-0" />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-xl font-semibold tracking-[0.15em] text-white">
              ALBA
            </span>
            <span className="text-[#F4F3E8]/30 text-xs">
              Dialisis y Trasplantes
            </span>
          </Link>
          <p className="text-[#F4F3E8]/30 text-xs">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
