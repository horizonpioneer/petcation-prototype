
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

  // 편의시설별 실제 사진 데이터
  const getPhotosForAmenity = (amenityName: string): AmenityPhoto[] => {
    switch (amenityName) {
      case '애견 운동장':
        return [
          {
            id: '1',
            amenityName: '애견 운동장',
            url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
            description: '넓은 야외 운동장에서 자유롭게 뛰어놀 수 있어요'
          },
          {
            id: '2',
            amenityName: '애견 운동장',
            url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
            description: '자연 친화적인 환경으로 조성되어 있어요'
          },
          {
            id: '3',
            amenityName: '애견 운동장',
            url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
            description: '다양한 놀이기구와 장난감이 준비되어 있어요'
          },
          {
            id: '4',
            amenityName: '애견 운동장',
            url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
            description: '운동 후 휴식할 수 있는 그늘진 공간도 마련되어 있어요'
          }
        ];
      case '애견 수영장':
        return [
          {
            id: '1',
            amenityName: '애견 수영장',
            url: 'https://images.unsplash.com/photo-1625905743181-e8a8c56521fe?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '깨끗하고 안전한 애견 전용 수영장이에요'
          },
          {
            id: '2',
            amenityName: '애견 수영장',
            url: 'https://images.unsplash.com/photo-1576075861274-77d2f71c675c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '다양한 크기의 반려동물이 이용할 수 있어요'
          },
          {
            id: '3',
            amenityName: '애견 수영장',
            url: 'https://images.unsplash.com/photo-1637517566676-30b1f068a7fe?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '맑고 깨끗한 물에서 안전하게 수영할 수 있어요'
          }
        ];
      case '전용 샤워실':
        return [
          {
            id: '1',
            amenityName: '전용 샤워실',
            url: 'https://images.unsplash.com/photo-1583534778255-5d67d3dcf95d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '반려동물 전용 샤워 및 그루밍 시설이에요'
          },
          {
            id: '2',
            amenityName: '전용 샤워실',
            url: 'https://images.unsplash.com/photo-1672426637959-49f39230ad7e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '온수와 전용 샴푸가 준비된 세척 시설이에요'
          }
        ];
      case '식기/패드 제공':
        return [
          {
            id: '1',
            amenityName: '식기/패드 제공',
            url: 'https://images.unsplash.com/photo-1672323471087-3c6c76ebd4c1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '깨끗한 식기와 물그릇이 준비되어 있어요'
          },
          {
            id: '2',
            amenityName: '식기/패드 제공',
            url: 'https://images.unsplash.com/photo-1651571479517-7596d3d3921a?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '편안한 매트와 패드를 제공해드려요'
          }
        ];
      case '애견 동반 카페':
        return [
          {
            id: '1',
            amenityName: '애견 동반 카페',
            url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
            description: '반려동물과 함께 즐길 수 있는 카페 공간이에요'
          },
          {
            id: '2',
            amenityName: '애견 동반 카페',
            url: 'https://images.unsplash.com/photo-1749280447562-d7e04018c42a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '편안한 분위기에서 반려동물과 휴식을 취할 수 있어요'
          }
        ];
      default:
        return [
          {
            id: '1',
            amenityName: amenityName,
            url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
            description: '반려동물을 위한 편의시설이에요'
          }
        ];
    }
  };

  const displayPhotos = photos.length > 0 ? photos : getPhotosForAmenity(amenityName);

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

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
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
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.description}
                  className="w-full h-full object-cover"
                />
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
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
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
              <div className="aspect-video">
                <img 
                  src={displayPhotos[selectedPhoto].url} 
                  alt={displayPhotos[selectedPhoto].description}
                  className="w-full h-full object-cover"
                />
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
