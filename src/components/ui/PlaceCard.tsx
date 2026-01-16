'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ShadcnButton } from '@/components/ui/button-shadcn';

// Interface for component props for type safety and reusability
interface PlaceCardProps {
  images: string[];
  tags: string[];
  rating?: number;
  title: string;
  subtitle?: string;
  hostType?: string;
  isTopRated?: boolean;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  onClick?: () => void;
}

export const PlaceCard = ({
  images,
  tags,
  rating,
  title,
  subtitle,
  hostType,
  isTopRated = false,
  description,
  ctaText = 'Ver más',
  ctaHref,
  className,
  onClick,
}: PlaceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Carousel image change handler
  const changeImage = (newDirection: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  // Animation variants for the carousel
  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // Animation variants for staggering content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const CardWrapper = ctaHref ? 'a' : 'div';
  const cardProps = ctaHref ? { href: ctaHref } : {};

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      variants={contentVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Image Carousel Section */}
      <div className="relative group h-56">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Carousel Navigation */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ShadcnButton
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 hover:bg-black/50 text-white h-8 w-8"
              onClick={(e) => changeImage(-1, e)}
            >
              <ChevronLeft className="h-4 w-4" />
            </ShadcnButton>
            <ShadcnButton
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 hover:bg-black/50 text-white h-8 w-8"
              onClick={(e) => changeImage(1, e)}
            >
              <ChevronRight className="h-4 w-4" />
            </ShadcnButton>
          </div>
        )}

        {/* Top Badges and Rating */}
        <div className="absolute top-3 left-3 flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
        {rating && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" /> {rating}
            </Badge>
          </div>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-all',
                  currentIndex === index ? 'w-4 bg-white' : 'bg-white/50'
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <motion.div variants={contentVariants} className="p-5 space-y-3">
        <motion.div variants={itemVariants} className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {isTopRated && (
            <Badge variant="outline" className="text-[var(--color-primary)] border-[var(--color-primary)]/30">
              Destacado
            </Badge>
          )}
        </motion.div>

        {(subtitle || hostType) && (
          <motion.div variants={itemVariants} className="text-sm text-gray-500">
            {subtitle && <span>{subtitle}</span>}
            {subtitle && hostType && <span> &bull; </span>}
            {hostType && <span>{hostType}</span>}
          </motion.div>
        )}

        <motion.p variants={itemVariants} className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="pt-2">
          <ShadcnButton
            variant="ghost"
            className="p-0 h-auto text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] hover:bg-transparent group"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </ShadcnButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceCard;
