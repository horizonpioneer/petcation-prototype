
import React from 'react';
import { ArrowLeft, Star, MapPin, Circle, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReviewSection from '@/components/ReviewSection';

interface AccommodationDetailProps {
  onBack: () => void;
}

const AccommodationDetail: React.FC<AccommodationDetailProps> = ({ onBack }) => {
  const accommodation = {
    name: "오션뷰 펫 리조트",
    location: "강원도 강릉시 해안가",
    rating: 4.8,
    reviewCount: 127,
    price: 180000,
    petFee: 30000,
    petFriendlyScore: 4.9,
    images: ["🏨", "🌊", "🐕", "🏊"],
    amenities: [
      { name: "애견 운동장", available: true, icon: "🏃" },
      { name: "애견 수영장", available: true, icon: "🏊" },
      { name: "전용 샤워실", available: true, icon: "🚿" },
      { name: "식기/패드 제공", available: true, icon: "🍽️" },
      { name: "애견 동반 카페", available: true, icon: "☕" },
      { name: "미용 서비스", available: false, icon: "✂️" }
    ],
    rules: [
      "체크인 시 반려동물 등록증 지참 필수",
      "실내에서는 리드줄 착용",
      "배변 처리는 반려인이 직접 처리",
      "과도한 짖음 시 퇴실 조치 가능"
    ],
    nearbyAttractions: [
      { name: "강릉 해변", distance: "도보 3분", petFriendly: true },
      { name: "애견 동반 카페 '바다'", distance: "도보 5분", petFriendly: true },
      { name: "반려동물 용품점", distance: "차량 10분", petFriendly: true }
    ]
  };

  // 반려동물 친화 점수에 따른 색상 설정
  const getPetFriendlyColor = (score: number) => {
    if (score >= 4.5) return 'from-green-600 to-emerald-600';
    if (score >= 4.0) return 'from-blue-600 to-green-600';
    if (score >= 3.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-orange-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {accommodation.images.map((emoji, index) => (
                  <div key={index} className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-6xl">
                    {emoji}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{accommodation.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{accommodation.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{accommodation.rating}</span>
                    <span className="text-gray-500">({accommodation.reviewCount}개 리뷰)</span>
                  </div>
                  <Badge className={`bg-gradient-to-r ${getPetFriendlyColor(accommodation.petFriendlyScore)} text-white font-medium`}>
                    🐾 반려동물 친화도 {accommodation.petFriendlyScore}/5
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Pet Amenities */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🐾 반려동물 편의시설</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="flex-1">{amenity.name}</span>
                    {amenity.available ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Rules */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📋 반려동물 동반 규정</h2>
              <ul className="space-y-3">
                {accommodation.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Circle className="h-2 w-2 mt-2 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Nearby Attractions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🗺️ 주변 반려동물 동반 가능 장소</h2>
              <div className="space-y-3">
                {accommodation.nearbyAttractions.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{place.name}</h3>
                      <p className="text-sm text-gray-600">{place.distance}</p>
                    </div>
                    {place.petFriendly && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        🐾 반려동물 동반 가능
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews Section */}
            <ReviewSection accommodationId="1" />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {(accommodation.price + accommodation.petFee).toLocaleString()}원
                  </span>
                  <span className="text-gray-500">/ 박</span>
                </div>
                
                {/* 개선된 가격 안내 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-green-600 text-white text-xs">
                      ✨ 반려동물 비용 포함
                    </Badge>
                  </div>
                  <div className="text-sm text-green-800">
                    <div className="flex justify-between items-center mb-1">
                      <span>기본 숙박비</span>
                      <span>{accommodation.price.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span>반려동물 동반 서비스</span>
                      <span>{accommodation.petFee.toLocaleString()}원</span>
                    </div>
                    <div className="border-t border-green-300 pt-1 mt-2 font-medium">
                      <div className="flex justify-between items-center">
                        <span>총 금액 (모든 비용 포함)</span>
                        <span>{(accommodation.price + accommodation.petFee).toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">체크인</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">체크아웃</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">반려동물 정보</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>소형견 1마리</option>
                    <option>중형견 1마리</option>
                    <option>대형견 1마리</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>총 숙박비 (2박)</span>
                  <span>{((accommodation.price + accommodation.petFee) * 2).toLocaleString()}원</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                  <div className="text-xs text-blue-800 font-medium">
                    💰 투명한 가격 정책: 모든 반려동물 관련 비용이 포함된 금액입니다
                  </div>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>최종 결제 금액</span>
                  <span>{((accommodation.price + accommodation.petFee) * 2).toLocaleString()}원</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium py-3">
                예약하기
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                예약 시 24시간 내 무료 취소 가능
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
