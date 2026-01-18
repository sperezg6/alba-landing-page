'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { branches, type Branch } from '@/lib/data';

interface LocationMapProps {
  activeBranch?: string | null;
  onMarkerClick?: (branchId: string) => void;
}

export function LocationMap({ activeBranch, onMarkerClick }: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);

  // Center of all branches (approximately León, Guanajuato)
  const centerLng = -101.4;
  const centerLat = 21.14;

  const createCustomMarker = useCallback((branch: Branch, isActive: boolean) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
      <div class="marker-container ${isActive ? 'active' : ''}">
        <div class="marker-pulse"></div>
        <div class="marker-dot"></div>
        <div class="marker-label">${branch.name.replace('Alba ', '').replace('Unidad Medica ', '').replace('Unidad ', '')}</div>
      </div>
    `;
    return el;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [centerLng, centerLat],
      zoom: 9,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    map.current.on('load', () => {
      setIsLoaded(true);

      // Add markers for each branch
      branches.forEach((branch) => {
        const el = createCustomMarker(branch, branch.id === activeBranch);

        el.addEventListener('click', () => {
          onMarkerClick?.(branch.id);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([branch.coordinates.lng, branch.coordinates.lat])
          .addTo(map.current!);

        markers.current.set(branch.id, marker);
      });

      // Disable scroll zoom for better UX
      map.current?.scrollZoom.disable();

      // Add navigation controls
      map.current?.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'top-right'
      );
    });

    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current.clear();
      map.current?.remove();
      map.current = null;
    };
  }, [createCustomMarker, activeBranch, onMarkerClick]);

  // Update markers when active branch changes
  useEffect(() => {
    if (!isLoaded || !map.current) return;

    branches.forEach((branch) => {
      const marker = markers.current.get(branch.id);
      if (marker) {
        const el = createCustomMarker(branch, branch.id === activeBranch);
        el.addEventListener('click', () => {
          onMarkerClick?.(branch.id);
        });
        marker.getElement().replaceWith(el);
        // Update the marker's element reference
        markers.current.set(branch.id, new mapboxgl.Marker({ element: el })
          .setLngLat([branch.coordinates.lng, branch.coordinates.lat])
          .addTo(map.current!));
      }
    });

    // Fly to active branch
    if (activeBranch) {
      const branch = branches.find((b) => b.id === activeBranch);
      if (branch) {
        map.current.flyTo({
          center: [branch.coordinates.lng, branch.coordinates.lat],
          zoom: 12,
          duration: 1500,
        });
      }
    } else {
      // Reset to overview
      map.current.flyTo({
        center: [centerLng, centerLat],
        zoom: 9,
        duration: 1500,
      });
    }
  }, [activeBranch, isLoaded, createCustomMarker, onMarkerClick]);

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          cursor: pointer;
        }

        .marker-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .marker-dot {
          width: 14px;
          height: 14px;
          background: var(--color-primary);
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
          z-index: 2;
        }

        .marker-container:hover .marker-dot,
        .marker-container.active .marker-dot {
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(232, 90, 44, 0.6);
        }

        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: rgba(232, 90, 44, 0.3);
          border-radius: 50%;
          opacity: 0;
          z-index: 1;
        }

        .marker-container.active .marker-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .marker-label {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .marker-container:hover .marker-label,
        .marker-container.active .marker-label {
          opacity: 1;
        }

        .mapboxgl-ctrl-group {
          background: rgba(13, 13, 13, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .mapboxgl-ctrl-group button {
          background: transparent !important;
        }

        .mapboxgl-ctrl-group button + button {
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .mapboxgl-ctrl-icon {
          filter: invert(1);
        }
      `}</style>

      <div
        ref={mapContainer}
        className="w-full h-full min-h-[400px]"
        style={{ background: '#2B3A42' }}
      />
    </>
  );
}

export default LocationMap;
