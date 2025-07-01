
import React, { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
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
  const [kakaoApiKey, setKakaoApiKey] = useState('');
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);

  // 한국 중심 좌표 (서울)
  const mapCenter = { lat: 37.566826, lng: 126.9786567 };

  if (!kakaoApiKey) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">지도 기능 사용을 위한 설정</h3>
        <p className="text-gray-600 mb-4">
          Kakao Map API 키를 입력하여 지도 기능을 활성화하세요.
          <br />
          <a href="https://developers.kakao.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Kakao Developers에서 API 키 발급받기
          </a>
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Kakao Map API 키를 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setKakaoApiKey((e.target as HTMLInputElement).value);
              }
            }}
          />
          <Button onClick={() => {
            const input = document.querySelector('input[placeholder="Kakao Map API 키를 입력하세요"]') as HTMLInputElement;
            if (input?.value) {
              setKakaoApiKey(input.value);
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
      <Map
        id="accommodation-map"
        center={mapCenter}
        style={{ width: '100%', height: '400px' }}
        level={7}
        onCreate={() => {
          // Kakao Map API 키 설정
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              console.log('Kakao Map loaded');
            });
          }
        }}
      >
        {accommodations.map((accommodation) => (
          <React.Fragment key={accommodation.id}>
            <MapMarker
              position={{
                lat: accommodation.coordinates[1],
                lng: accommodation.coordinates[0]
              }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: { width: 24, height: 35 }
              }}
              onClick={() => setSelectedAccommodation(accommodation)}
            />
            
            {selectedAccommodation?.id === accommodation.id && (
              <CustomOverlayMap
                position={{
                  lat: accommodation.coordinates[1],
                  lng: accommodation.coordinates[0]
                }}
                yAnchor={1.2}
              >
                <Card className="p-4 bg-white shadow-lg max-w-sm z-10 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{accommodation.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAccommodation(null)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs">{accommodation.location}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-gray-900">
                      {accommodation.price.toLocaleString()}원
                    </span>
                    <span className="text-xs text-blue-600">
                      🐾 {accommodation.petFriendlyScore}/5
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full text-xs py-1"
                    onClick={() => onAccommodationClick(accommodation.id)}
                  >
                    상세보기
                  </Button>
                </Card>
              </CustomOverlayMap>
            )}
          </React.Fragment>
        ))}
      </Map>
      
      <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`}
      />
    </div>
  );
};

// Kakao Map API 타입 정의
declare global {
  interface Window {
    kakao: any;
  }
}

export default AccommodationMap;
