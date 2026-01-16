'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { branches, Branch } from '@/lib/data';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to add your Mapbox token to .env.local as NEXT_PUBLIC_MAPBOX_TOKEN
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Calculate center point of all branches
const centerLat = branches.reduce((sum, b) => sum + b.coordinates.lat, 0) / branches.length;
const centerLng = branches.reduce((sum, b) => sum + b.coordinates.lng, 0) / branches.length;

// Custom marker component
function CustomMarker({
  branch,
  isSelected,
  onClick
}: {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300
        ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}
      `}
    >
      {/* Marker pin */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        shadow-lg transition-all duration-300
        ${isSelected
          ? 'bg-[var(--color-secondary)] shadow-[var(--color-secondary)]/40'
          : 'bg-[var(--color-primary)] shadow-[var(--color-primary)]/30 hover:bg-[var(--color-primary-dark)]'
        }
      `}>
        <MapPin className="w-5 h-5 text-white" />
      </div>
      {/* Pulse effect for selected marker */}
      {isSelected && (
        <div className="absolute inset-0 rounded-full bg-[var(--color-secondary)] animate-ping opacity-30" />
      )}
      {/* Pointer triangle */}
      <div className={`
        absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0
        border-l-[6px] border-l-transparent
        border-r-[6px] border-r-transparent
        border-t-[8px] transition-colors duration-300
        ${isSelected ? 'border-t-[var(--color-secondary)]' : 'border-t-[var(--color-primary)]'}
      `} />
    </div>
  );
}

export function BranchesMap() {
  const t = useTranslations();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [viewState, setViewState] = useState({
    latitude: centerLat,
    longitude: centerLng,
    zoom: 9,
  });

  const handleMarkerClick = useCallback((branch: Branch) => {
    setSelectedBranch(branch);
    setViewState(prev => ({
      ...prev,
      latitude: branch.coordinates.lat,
      longitude: branch.coordinates.lng,
      zoom: 13,
    }));
  }, []);

  const handleMapClick = useCallback(() => {
    setSelectedBranch(null);
  }, []);

  const openDirections = useCallback((branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`;
    window.open(url, '_blank');
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Mapbox token not configured. Add NEXT_PUBLIC_MAPBOX_TOKEN to your environment.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        {/* Navigation controls */}
        <NavigationControl position="top-right" />

        {/* Branch markers */}
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            longitude={branch.coordinates.lng}
            latitude={branch.coordinates.lat}
            anchor="bottom"
          >
            <CustomMarker
              branch={branch}
              isSelected={selectedBranch?.id === branch.id}
              onClick={() => handleMarkerClick(branch)}
            />
          </Marker>
        ))}

        {/* Popup for selected branch */}
        {selectedBranch && (
          <Popup
            longitude={selectedBranch.coordinates.lng}
            latitude={selectedBranch.coordinates.lat}
            anchor="bottom"
            offset={[0, -45]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedBranch(null)}
            className="branch-popup"
          >
            <div className="p-2 min-w-[240px]">
              {/* Branch name */}
              <h3 className="font-semibold text-gray-900 text-base mb-2">
                {selectedBranch.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-tight">
                  {selectedBranch.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                <a
                  href={`tel:${selectedBranch.phone}`}
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  {selectedBranch.phone}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t('branches.hoursValue')}
                </p>
              </div>

              {/* Directions button */}
              <button
                onClick={() => openDirections(selectedBranch)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {t('branches.directions')}
              </button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Branch list overlay on mobile */}
      <div className="absolute bottom-4 left-4 right-4 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => handleMarkerClick(branch)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedBranch?.id === branch.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
                }
                shadow-md
              `}
            >
              {branch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-[10px] text-gray-500">
        &copy; Mapbox
      </div>
    </div>
  );
}

export default BranchesMap;
