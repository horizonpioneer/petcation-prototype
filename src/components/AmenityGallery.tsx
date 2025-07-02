
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AmenityPhoto {
  id: string;
  amenityName: string;
  url: string;
  description: string;
}

interface AmenityGalleryProps {
  amenityName: string;
  photos: AmenityPhoto[];
}

const AmenityGallery: React.FC<AmenityGalleryProps> = ({ amenityName, photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // 예시 사진 데이터 - 실제로는 props로 받아올 데이터
  const mockPhotos: AmenityPhoto[] = [
    {
      id: '1',
      amenityName: '애견 운동장',
      url: '🏃',
      description: '넓은 야외 운동장에서 자유롭게 뛰어놀 수 있어요'
    },
    {
      id: '2',
      amenityName: '애견 운동장',
      url: '🌳',
      description: '자연 친화적인 환경으로 조성되어 있어요'
    },
    {
      id: '3',
      amenityName: '애견 운동장',
      url: '⚽',
      description: '다양한 놀이기구와 장난감이 준비되어 있어요'
    },
    {
      id: '4',
      amenityName: '애견 운동장',
      url: '🚿',
      description: '운동 후 씻을 수 있는 세척 공간도 마련되어 있어요'
    }
  ];

  const displayPhotos = photos.length > 0 ? photos : mockPhotos;

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % displayPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? displayPhotos.length - 1 : selectedPhoto - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-900">{amenityName}</h4>
        <span className="text-sm text-gray-500">{displayPhotos.length}장의 사진</span>
      </div>

      {displayPhotos.length === 0 ? (
        <Card className="p-6 text-center bg-gray-50">
          <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">아직 등록된 사진이 없습니다</p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            {displayPhotos.slice(0, 4).map((photo, index) => (
              <div
                key={photo.id}
                className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-4xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => openLightbox(index)}
              >
                {photo.url}
              </div>
            ))}
          </div>
          
          {displayPhotos.length > 4 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLightbox(0)}
              className="w-full"
            >
              +{displayPhotos.length - 4}장 더 보기
            </Button>
          )}
        </>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-8xl">
                {displayPhotos[selectedPhoto].url}
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{displayPhotos[selectedPhoto].amenityName}</h3>
                <p className="text-gray-600">{displayPhotos[selectedPhoto].description}</p>
              </div>

              {displayPhotos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {displayPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === selectedPhoto ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenityGallery;
