import React from 'react';
import { MapPin, Star, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PetFriendlyScore from '@/components/PetFriendlyScore';
import AccommodationCourse from '@/components/AccommodationCourse';
import NearbyVetHospitals from '@/components/NearbyVetHospitals';
import AmenityGallery from '@/components/AmenityGallery';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface AccommodationDetailProps {
  onBack: () => void;
}

const AccommodationDetail: React.FC<AccommodationDetailProps> = ({ onBack }) => {
  // Mock data for accommodation details
  const accommodation = {
    id: '1',
    name: '오션뷰 펫 리조트',
    location: '강원도 강릉시 해안가',
    price: 180000,
    rating: 4.8,
    reviewCount: 127,
    image: '🏨',
    petFriendlyScore: 4.9,
    amenities: ['애견 운동장', '애견 수영장', '전용 샤워실', '식기 제공'],
    petFee: 30000,
    theme: 'beach',
    suitableFor: ['small', 'medium', 'large'],
    petAgeGroups: ['puppy', 'adult', 'senior'],
    description: '강릉 해변 바로 앞에 위치한 펫 리조트로, 모든 객실에서 아름다운 오션뷰를 감상할 수 있습니다. 반려동물을 위한 다양한 편의시설과 프로그램을 제공하며, 편안하고 즐거운 시간을 보내실 수 있습니다.',
    checkIn: '15:00',
    checkOut: '11:00',
    address: '강원도 강릉시 해안로 123',
    contact: '033-1234-5678',
    cancellationPolicy: '체크인 7일 전까지 전액 환불 가능',
    reviews: [
      {
        id: '101',
        author: '김메리',
        rating: 5.0,
        comment: '최고의 펫 리조트! 메리도 너무 좋아했어요. 다음에 또 올게요!',
        date: '2024-06-05'
      },
      {
        id: '102',
        author: '박철수',
        rating: 4.5,
        comment: '시설도 좋고, 강아지 용품도 잘 갖춰져 있어서 편하게 지냈습니다.',
        date: '2024-05-28'
      },
      {
        id: '103',
        author: '이영희',
        rating: 4.0,
        comment: '위치는 좋았지만, 가격이 조금 비싼 감이 있어요.',
        date: '2024-05-15'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ← 돌아가기
          </Button>
          <h1 className="text-lg font-semibold">숙소 상세 정보</h1>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Accommodation Info */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🏨
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-semibold mb-2">오션뷰 펫 리조트</h3>
                    <p className="text-sm">강릉 해변의 아름다운 전망</p>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{accommodation.name}</h2>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{accommodation.location}</span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <PetFriendlyScore score={accommodation.petFriendlyScore} size="lg" />
                <div className="text-sm text-gray-500">
                  ({accommodation.reviewCount}개의 리뷰)
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{accommodation.description}</p>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">가격 정보</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">숙박 요금</span>
                  <span className="text-lg font-semibold text-gray-700">{accommodation.price.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">반려동물 요금</span>
                  <span className="text-gray-700">{accommodation.petFee === 0 ? '무료' : `${accommodation.petFee.toLocaleString()}원`}</span>
                </div>
                <hr className="my-3" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-900">총 요금 (1박)</span>
                  <span className="text-2xl font-bold text-blue-600">{(accommodation.price + accommodation.petFee).toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-center mb-3">
                  <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                    ✨ 추가요금 없음 - 모든 비용 포함
                  </Badge>
                </div>
                <Button className="w-full">예약하기</Button>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">시설 정보</h3>
                <div className="grid grid-cols-2 gap-2">
                  {accommodation.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="amenities">시설</TabsTrigger>
            <TabsTrigger value="course">주변 코스</TabsTrigger>
            <TabsTrigger value="hospitals">근처 병원</TabsTrigger>
            <TabsTrigger value="reviews">후기</TabsTrigger>
            <TabsTrigger value="location">위치</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🏡 숙소 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">체크인/체크아웃</h4>
                  <p className="text-gray-600">체크인: {accommodation.checkIn}</p>
                  <p className="text-gray-600">체크아웃: {accommodation.checkOut}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">주소</h4>
                  <p className="text-gray-600">{accommodation.address}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">연락처</h4>
                  <p className="text-gray-600">{accommodation.contact}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">취소 정책</h4>
                  <p className="text-gray-600">{accommodation.cancellationPolicy}</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🐾 편의시설</h3>
              <div className="space-y-6">
                {accommodation.amenities.map((amenity, index) => (
                  <Card key={index} className="p-6">
                    <AmenityGallery 
                      amenityName={amenity}
                      photos={[]}
                    />
                  </Card>
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

          <TabsContent value="hospitals">
            <NearbyVetHospitals 
              accommodationLocation={accommodation.location}
              accommodationName={accommodation.name}
            />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 리뷰</h3>
              {accommodation.reviews.length === 0 ? (
                <Card className="p-4 text-center">
                  <p className="text-gray-600">아직 리뷰가 없습니다.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {accommodation.reviews.map(review => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{review.author}</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <div className="text-sm text-gray-500 mt-2">{review.date}</div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📍 위치 정보</h3>
              <Card className="p-4">
                <p className="text-gray-700">
                  {accommodation.name}은(는) {accommodation.location}에 위치하고 있습니다.
                </p>
                {/* Add map component here */}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccommodationDetail;
