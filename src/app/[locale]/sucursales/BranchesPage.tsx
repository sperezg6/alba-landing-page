'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { branches } from '@/lib/data';

// Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Calculate center of all branches
const centerLat = branches.reduce((sum, b) => sum + b.coordinates.lat, 0) / branches.length;
const centerLng = branches.reduce((sum, b) => sum + b.coordinates.lng, 0) / branches.length;

// Check if clinic is currently open (Mon-Sat 6:00 AM - 10:00 PM)
function isClinicOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  // Closed on Sunday (day === 0)
  if (day === 0) return false;

  // Open Mon-Sat from 6:00 (6) to 22:00 (22)
  return currentTime >= 6 && currentTime < 22;
}

export function BranchesPage() {
  const t = useTranslations();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Check opening status on mount and update every minute
  useEffect(() => {
    setIsOpen(isClinicOpen());
    const interval = setInterval(() => {
      setIsOpen(isClinicOpen());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Initialize Mapbox
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [centerLng, centerLat],
      zoom: 9,
      pitch: 45,
      bearing: -10,
      antialias: true,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Force resize to ensure map fills container
      map.current.resize();

      // Add fog/atmosphere for depth
      map.current.setFog({
        'range': [0.5, 10],
        'color': '#0a0a0a',
        'high-color': '#1a1a2e',
        'horizon-blend': 0.1,
        'star-intensity': 0.15,
      });

      // Add 3D buildings
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
      )?.id;

      if (labelLayerId) {
        map.current.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['get', 'height'],
                0, '#2B3A42',
                50, '#2d2d2d',
                100, '#3d3d3d',
              ],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.8,
            },
          },
          labelLayerId
        );
      }

      setMapLoaded(true);

      // Resize again after a short delay to handle any layout shifts
      setTimeout(() => {
        map.current?.resize();
      }, 100);
    });

    // Handle window resize
    const handleResize = () => {
      map.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // Disable scroll zoom for better UX
    map.current.scrollZoom.disable();

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      window.removeEventListener('resize', handleResize);
      markersRef.current.forEach((marker) => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add markers when map is loaded
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Create simple markers for each branch
    branches.forEach((branch) => {
      const el = document.createElement('div');
      el.className = 'branch-marker';

      const dot = document.createElement('div');
      dot.className = 'marker-dot';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2.5');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12 6v12M6 12h12');
      svg.appendChild(path);
      dot.appendChild(svg);
      el.appendChild(dot);

      el.addEventListener('click', () => {
        flyToBranch(branch.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([branch.coordinates.lng, branch.coordinates.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [mapLoaded]);

  // Fly to branch and scroll to map
  const flyToBranch = useCallback((branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch || !map.current) return;

    setActiveBranch(branchId);

    // Scroll to map section
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Fly to location after a small delay
    setTimeout(() => {
      map.current?.flyTo({
        center: [branch.coordinates.lng, branch.coordinates.lat],
        zoom: 16,
        pitch: 60,
        bearing: Math.random() * 60 - 30,
        duration: 2500,
        essential: true,
      });
    }, 300);
  }, []);

  // Reset map view
  const resetMapView = useCallback(() => {
    if (!map.current) return;

    setActiveBranch(null);

    map.current.flyTo({
      center: [centerLng, centerLat],
      zoom: 9,
      pitch: 45,
      bearing: -10,
      duration: 2000,
    });
  }, []);

  return (
    <>
      {/* Hero Section - Alba Style with Static Image */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-alba-dark">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/alba-extracted/fotos-servicios-12.jpg"
            alt="Alba Dialisis clinics"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-alba-dark via-[#2B3A42]/60 to-[#2B3A42]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-alba-dark/80 via-transparent to-transparent" />
        </div>

        {/* Content - Bottom left positioned */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 xl:px-24 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                Nuestras Sucursales
              </span>
            </div>
            <h1
              className="font-light leading-[0.95] tracking-tight"
              style={{ color: '#374151', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Encuentra tu clínica<br />
              más cercana
            </h1>
          </motion.div>
        </div>

        {/* Double Notch Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[60px] md:h-[80px]">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 L0,120 L1200,120 L1200,40 L950,40 L950,0 L250,0 L250,40 Z"
              fill="#F0EDDC"
            />
          </svg>
        </div>
      </section>

      {/* Branch Selection Section */}
      <section className="relative bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Vertical lines */}
          <div className="hidden lg:block absolute left-16 xl:left-24 top-0 bottom-0 w-px bg-gray-900/5" />
          <div className="hidden lg:block absolute right-16 xl:right-24 top-0 bottom-0 w-px bg-gray-900/5" />

          {/* Horizontal guide lines */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-px bg-gray-900/[0.03]" />
          <div className="hidden md:block absolute top-2/3 left-0 right-0 h-px bg-gray-900/[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                4 Ubicaciones en el Bajío
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
              Selecciona una sucursal
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Haz clic en una sucursal para verla en el mapa interactivo
            </p>
          </div>

          {/* Branch Cards Grid - Minimalist Editorial Style */}
          <div className="border border-gray-900/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {branches.map((branch, index) => (
                <motion.button
                  key={branch.id}
                  onClick={() => flyToBranch(branch.id)}
                  className={`group relative text-left p-6 md:p-8 lg:p-10 min-h-[180px] md:min-h-[200px] transition-all duration-500 ${
                    activeBranch === branch.id
                      ? 'bg-alba-dark'
                      : 'bg-transparent'
                  } ${index % 2 === 0 ? 'md:border-r border-gray-900/10' : ''} ${
                    index < 2 ? 'border-b border-gray-900/10' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.77, 0, 0.175, 1] }}
                >
                  {/* Top row: Number + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-medium transition-colors duration-500 ${
                        activeBranch === branch.id ? 'text-alba-primary' : 'text-gray-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs transition-colors duration-500 ${
                        isOpen
                          ? activeBranch === branch.id ? 'text-green-400' : 'text-green-600'
                          : activeBranch === branch.id ? 'text-red-400' : 'text-red-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                      {isOpen ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>

                  {/* Branch Name - Large and light */}
                  <h3
                    className={`text-xl md:text-2xl lg:text-3xl font-light mb-4 transition-colors duration-500 tracking-tight ${
                      activeBranch === branch.id ? '!text-gray-900' : 'text-gray-900'
                    }`}
                    style={activeBranch === branch.id ? { color: '#374151' } : undefined}
                  >
                    {branch.name}
                  </h3>

                  {/* Details - Simple text, no icons */}
                  <div className="space-y-1">
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-500 ${
                        activeBranch === branch.id ? 'text-black/60' : 'text-gray-500'
                      }`}
                    >
                      {branch.address}
                    </p>
                    <p
                      className={`text-sm transition-colors duration-500 ${
                        activeBranch === branch.id ? 'text-black/60' : 'text-gray-500'
                      }`}
                    >
                      {branch.phone}
                    </p>
                    <p
                      className={`text-sm transition-colors duration-500 ${
                        activeBranch === branch.id ? 'text-black/60' : 'text-gray-500'
                      }`}
                    >
                      Lun - Sáb: 6:00 AM - 10:00 PM
                    </p>
                  </div>

                  {/* Hover/Active indicator - subtle arrow */}
                  <div
                    className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 transition-all duration-300 ${
                      activeBranch === branch.id
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-5 h-5 transition-colors duration-500 ${
                        activeBranch === branch.id ? 'text-alba-primary' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Action links when active */}
                  <AnimatePresence>
                    {activeBranch === branch.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 pt-6 border-t border-black/10 flex items-center gap-6"
                      >
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium uppercase tracking-wider text-alba-primary hover:text-gray-900 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Cómo llegar
                        </a>
                        <a
                          href={`tel:${branch.phone}`}
                          className="text-xs font-medium uppercase tracking-wider text-black/60 hover:text-gray-900 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Llamar
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Reset View Button */}
          {activeBranch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <button
                onClick={resetMapView}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <span>Ver todas las sucursales</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section ref={mapSectionRef} className="bg-alba-dark">
        {/* Section Header */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-alba-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
              Mapa Interactivo
            </span>
          </div>
        </div>

        {/* Map Container - Fixed height */}
        <div className="relative" style={{ height: '60vh', minHeight: '450px' }}>
          <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

          {/* Active branch info overlay */}
          <AnimatePresence>
            {activeBranch && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute bottom-8 left-6 md:left-12 lg:left-16 xl:left-24 z-10"
              >
                <div className="bg-alba-dark/90 backdrop-blur-md rounded-xl p-4 border border-black/10">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <p className="text-alba-primary text-xs uppercase tracking-wider">
                      Ubicación seleccionada
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                        isOpen
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                      {isOpen ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {branches.find(b => b.id === activeBranch)?.name}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section - With Gradient Blobs and Grid Lines */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top horizontal line with ticks */}
          <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-16 lg:right-16 xl:left-24 xl:right-24 h-px bg-gray-900/10">
            <div className="absolute left-0 top-0 w-px h-4 bg-gray-900/10" />
            <div className="absolute left-1/4 top-0 w-px h-2 bg-gray-900/10" />
            <div className="absolute left-1/2 top-0 w-px h-4 bg-gray-900/10 -translate-x-1/2" />
            <div className="absolute left-3/4 top-0 w-px h-2 bg-gray-900/10" />
            <div className="absolute right-0 top-0 w-px h-4 bg-gray-900/10" />
          </div>

          {/* Bottom horizontal line with ticks */}
          <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 lg:left-16 lg:right-16 xl:left-24 xl:right-24 h-px bg-gray-900/10">
            <div className="absolute left-0 bottom-0 w-px h-4 bg-gray-900/10" />
            <div className="absolute left-1/4 bottom-0 w-px h-2 bg-gray-900/10" />
            <div className="absolute left-1/2 bottom-0 w-px h-4 bg-gray-900/10 -translate-x-1/2" />
            <div className="absolute left-3/4 bottom-0 w-px h-2 bg-gray-900/10" />
            <div className="absolute right-0 bottom-0 w-px h-4 bg-gray-900/10" />
          </div>

          {/* Left vertical line */}
          <div className="hidden lg:block absolute left-16 xl:left-24 top-0 bottom-0 w-px bg-gray-900/5" />

          {/* Right vertical line */}
          <div className="hidden lg:block absolute right-16 xl:right-24 top-0 bottom-0 w-px bg-gray-900/5" />

          {/* Center vertical line (subtle) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gray-900/5 -translate-x-1/2" />
        </div>

        {/* Gradient Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, rgba(45, 212, 191, 0) 70%)',
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(212, 255, 0, 0.5) 0%, rgba(212, 255, 0, 0) 70%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side - Large headline */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  Agenda tu cita
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[0.95] tracking-tight">
                ¿Listo para<br />
                visitarnos?
              </h2>
            </motion.div>

            {/* Right side - CTA content */}
            <motion.div
              className="lg:col-span-5 lg:border-l lg:border-gray-900/10 lg:pl-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">
                Nuestro equipo médico está listo para atenderte con la mejor calidad y calidez humana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                    Contactar
                  </span>
                  <span className="w-12 h-12 rounded-full border border-gray-900/20 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom CSS for markers */}
      <style jsx global>{`
        .mapboxgl-map {
          width: 100% !important;
          height: 100% !important;
        }

        .mapboxgl-canvas-container {
          width: 100% !important;
          height: 100% !important;
        }

        .mapboxgl-canvas {
          width: 100% !important;
          height: 100% !important;
        }

        .mapboxgl-marker {
          z-index: 10 !important;
        }

        .branch-marker {
          cursor: pointer;
        }

        .marker-dot {
          width: 32px;
          height: 32px;
          background: #4DBDC9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2B3A42;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 2px solid #fff;
        }

        .marker-dot svg {
          width: 14px;
          height: 14px;
        }

        .branch-marker:hover .marker-dot {
          transform: scale(1.15);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
        }

        .mapboxgl-ctrl-group {
          background: rgba(13, 13, 13, 0.8) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }

        .mapboxgl-ctrl-group button {
          background: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .mapboxgl-ctrl-group button:last-child {
          border-bottom: none !important;
        }

        .mapboxgl-ctrl-group button span {
          filter: invert(1);
        }

        .mapboxgl-ctrl-attrib {
          background: transparent !important;
        }

        .mapboxgl-ctrl-attrib a {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </>
  );
}

export default BranchesPage;
