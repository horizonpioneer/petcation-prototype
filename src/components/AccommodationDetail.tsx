import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Bath, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AmenityGallery from './AmenityGallery';
import ReviewSection from './ReviewSection';
import AccommodationCourse from './AccommodationCourse';
import PetFriendlyScore from './PetFriendlyScore';

interface AccommodationDetailProps {
  onBack: () => void;
}

const AccommodationDetail: React.FC<AccommodationDetailProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data for the accommodation
  const accommodation = {
    id: '1',
    name: '오션뷰 펫 리조트',
    location: '강원도 강릉시 해안가 123',
    price: 180000,
    originalPrice: 220000,
    rating: 4.8,
    reviewCount: 127,
    petFriendlyScore: 4.9,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    amenities: ['애견 운동장', '애견 수영장', '전용 샤워실', '식기/패드 제공', '애견 동반 카페'],
    generalAmenities: ['무료 Wi-Fi', '주차장', '카페', '체육시설', '세탁실'],
    petPolicy: {
      fee: 30000,
      maxPets: 2,
      allowedSizes: ['소형견', '중형견', '대형견'],
      restrictions: ['예방접종 증명서 필요', '목줄 착용 필수']
    },
    description: '바다가 보이는 최고의 위치에 자리한 반려동물 전용 리조트입니다. 넓은 애견 운동장과 수영장을 갖추고 있어 반려동물이 자유롭게 뛰어놀 수 있습니다.',
    checkIn: '15:00',
    checkOut: '11:00'
  };

  // Mock data for the accommodation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline">공유하기</Button>
              <Button variant="outline">찜하기</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2 h-96">
              <div className="col-span-2 row-span-2">
                <img
                  src={accommodation.images[selectedImage]}
                  alt="메인 이미지"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {accommodation.images.slice(1, 4).map((image, index) => (
                <div
                  key={index + 1}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <img
                    src={image}
                    alt={`이미지 ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>

            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {accommodation.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{accommodation.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{accommodation.rating}</span>
                      <span className="text-gray-600 ml-1">({accommodation.reviewCount})</span>
                    </div>
                    <PetFriendlyScore score={accommodation.petFriendlyScore} />
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">{accommodation.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="amenities" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="amenities">편의시설</TabsTrigger>
                <TabsTrigger value="course">주변 코스</TabsTrigger>
                <TabsTrigger value="policy">이용 규정</TabsTrigger>
                <TabsTrigger value="reviews">후기</TabsTrigger>
              </TabsList>

              <TabsContent value="amenities" className="space-y-6">
                {/* Pet Amenities */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🐾 반려동물 전용 시설</h3>
                  <div className="space-y-6">
                    {accommodation.amenities.map(amenity => (
                      <AmenityGallery
                        key={amenity}
                        amenityName={amenity}
                        photos={[]}
                      />
                    ))}
                  </div>
                </div>

                {/* General Amenities */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🏨 일반 편의시설</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {accommodation.generalAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        {getAmenityIcon(amenity)}
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="course">
                <AccommodationCourse
                  accommodationName={accommodation.name}
                  accommodationLocation={accommodation.location}
                />
              </TabsContent>

              <TabsContent value="policy" className="space-y-6">
                {/* Pet Policy */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🐾 반려동물 이용 규정</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">반려동물 요금</span>
                        <div className="text-lg font-semibold text-blue-600">
                          {accommodation.petPolicy.fee.toLocaleString()}원 / 1박
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">최대 반려동물 수</span>
                        <div className="text-lg font-semibold">{accommodation.petPolicy.maxPets}마리</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">허용 크기</span>
                      <div className="flex flex-wrap gap-2">
                        {accommodation.petPolicy.allowedSizes.map(size => (
                          <Badge key={size} variant="outline">{size}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">주의사항</span>
                      <ul className="space-y-1">
                        {accommodation.petPolicy.restrictions.map((restriction, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="mr-2">•</span>
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Check-in/out */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🕐 체크인/아웃</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">체크인</span>
                      <div className="text-lg font-semibold">{accommodation.checkIn}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">체크아웃</span>
                      <div className="text-lg font-semibold">{accommodation.checkOut}</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewSection accommodationId={accommodation.id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {accommodation.price.toLocaleString()}원
                      </span>
                      {accommodation.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {accommodation.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">/ 1박</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span>숙박 요금</span>
                    <span>{accommodation.price.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span>반려동물 요금</span>
                    <span>{accommodation.petPolicy.fee.toLocaleString()}원</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center font-semibold">
                    <span>총 요금</span>
                    <span>{(accommodation.price + accommodation.petPolicy.fee).toLocaleString()}원</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  예약하기
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  예약 확정 전까지는 요금이 청구되지 않습니다
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case '무료 Wi-Fi':
      return <Wifi className="h-4 w-4 text-blue-600" />;
    case '주차장':
      return <Car className="h-4 w-4 text-green-600" />;
    case '카페':
      return <Coffee className="h-4 w-4 text-orange-600" />;
    case '체육시설':
      return <Dumbbell className="h-4 w-4 text-red-600" />;
    case '세탁실':
      return <Bath className="h-4 w-4 text-purple-600" />;
    default:
      return <span className="text-gray-400">•</span>;
  }
};

export default AccommodationDetail;
