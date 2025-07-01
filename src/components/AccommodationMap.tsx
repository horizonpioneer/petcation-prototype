
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';

interface AccommodationMapProps {
  accommodations: Array<{
    id: string;
    name: string;
    location: string;
    price: number;
    rating: number;
    petFriendlyScore: number;
    coordinates: [number, number];
  }>;
  onAccommodationClick: (id: string) => void;
}

const AccommodationMap: React.FC<AccommodationMapProps> = ({ 
  accommodations, 
  onAccommodationClick 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [127.7669, 35.9078], // 대한민국 중심 좌표
      zoom: 7
    });

    // 숙소 마커 추가
    accommodations.forEach(accommodation => {
      const marker = new mapboxgl.Marker({
        color: '#3B82F6'
      })
      .setLngLat(accommodation.coordinates)
      .addTo(map.current!);

      // 마커 클릭 이벤트
      marker.getElement().addEventListener('click', () => {
        setSelectedAccommodation(accommodation);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [accommodations, mapboxToken]);

  if (!mapboxToken) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">지도 기능 사용을 위한 설정</h3>
        <p className="text-gray-600 mb-4">
          Mapbox 토큰을 입력하여 지도 기능을 활성화하세요.
          <br />
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Mapbox에서 무료 토큰 발급받기
          </a>
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Mapbox 토큰을 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setMapboxToken((e.target as HTMLInputElement).value);
              }
            }}
          />
          <Button onClick={() => {
            const input = document.querySelector('input[placeholder="Mapbox 토큰을 입력하세요"]') as HTMLInputElement;
            if (input?.value) {
              setMapboxToken(input.value);
            }
          }}>
            적용
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-lg" />
      
      {selectedAccommodation && (
        <Card className="absolute top-4 left-4 p-4 bg-white shadow-lg max-w-sm z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{selectedAccommodation.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAccommodation(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{selectedAccommodation.location}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-gray-900">
              {selectedAccommodation.price.toLocaleString()}원
            </span>
            <span className="text-sm text-blue-600">
              🐾 {selectedAccommodation.petFriendlyScore}/5
            </span>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={() => onAccommodationClick(selectedAccommodation.id)}
          >
            상세보기
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AccommodationMap;
