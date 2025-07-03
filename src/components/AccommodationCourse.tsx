
import React, { useState } from 'react';
import { MapPin, Clock, Camera, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CourseItem {
  id: string;
  name: string;
  type: 'photo_spot' | 'restaurant' | 'activity' | 'attraction';
  location: string;
  distance: string;
  duration: string;
  description: string;
  petFriendly: boolean;
  photoSpot?: boolean;
}

interface AccommodationCourseProps {
  accommodationName: string;
  accommodationLocation: string;
}

const AccommodationCourse: React.FC<AccommodationCourseProps> = ({
  accommodationName,
  accommodationLocation
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('day1');

  // 숙소별 추천 코스 데이터
  const coursesData = {
    day1: [
      {
        id: '1',
        name: '강릉 해변 포토존',
        type: 'photo_spot' as const,
        location: '강릉 해변',
        distance: '도보 5분',
        duration: '30분',
        description: '바다를 배경으로 반려동물과 아름다운 사진을 남길 수 있는 최고의 포토스팟',
        petFriendly: true,
        photoSpot: true
      },
      {
        id: '2',
        name: '애견 동반 카페 오션',
        type: 'restaurant' as const,
        location: '강릉시 해안로',
        distance: '차량 10분',
        duration: '1시간',
        description: '바다뷰를 감상하며 반려동물과 함께 커피타임을 즐길 수 있는 카페',
        petFriendly: true
      },
      {
        id: '3',
        name: '강릉 해안 산책로',
        type: 'activity' as const,
        location: '강릉 안목해변',
        distance: '차량 15분',
        duration: '2시간',
        description: '반려동물과 함께 걸으며 바다 경치를 만끽할 수 있는 산책 코스',
        petFriendly: true
      },
      {
        id: '4',
        name: '정동진 일출 포토스팟',
        type: 'photo_spot' as const,
        location: '정동진역',
        distance: '차량 30분',
        duration: '1시간',
        description: '일출과 함께하는 감성적인 반려동물 사진 촬영 명소',
        petFriendly: true,
        photoSpot: true
      }
    ],
    day2: [
      {
        id: '5',
        name: '오죽헌 한옥 포토존',
        type: 'photo_spot' as const,
        location: '강릉 오죽헌',
        distance: '차량 20분',
        duration: '45분',
        description: '전통 한옥을 배경으로 한 운치 있는 반려동물 사진 촬영지',
        petFriendly: true,
        photoSpot: true
      },
      {
        id: '6',
        name: '펫프렌들리 레스토랑',
        type: 'restaurant' as const,
        location: '강릉시 중앙로',
        distance: '차량 25분',
        duration: '1.5시간',
        description: '반려동물 전용 메뉴도 있는 가족 친화적인 레스토랑',
        petFriendly: true
      },
      {
        id: '7',
        name: '강릉 솔향수목원',
        type: 'activity' as const,
        location: '강릉시 구정면',
        distance: '차량 35분',
        duration: '2시간',
        description: '자연 속에서 반려동물과 힐링할 수 있는 수목원 산책',
        petFriendly: true
      }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo_spot':
        return <Camera className="h-4 w-4" />;
      case 'restaurant':
        return '🍽️';
      case 'activity':
        return '🎯';
      case 'attraction':
        return '🏛️';
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'photo_spot':
        return '포토스팟';
      case 'restaurant':
        return '맛집/카페';
      case 'activity':
        return '액티비티';
      case 'attraction':
        return '관광지';
      default:
        return '기타';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          🗺️ {accommodationName} 주변 추천 코스
        </h3>
        <p className="text-gray-600">
          숙소를 중심으로 반려동물과 함께 즐길 수 있는 맞춤 여행 코스를 추천해드려요
        </p>
      </div>

      {/* Day Selection */}
      <div className="flex space-x-2">
        <Button
          variant={selectedCourse === 'day1' ? 'default' : 'outline'}
          onClick={() => setSelectedCourse('day1')}
          className="flex-1"
        >
          1일차 코스
        </Button>
        <Button
          variant={selectedCourse === 'day2' ? 'default' : 'outline'}
          onClick={() => setSelectedCourse('day2')}
          className="flex-1"
        >
          2일차 코스
        </Button>
      </div>

      {/* Course Timeline */}
      <div className="space-y-4">
        {coursesData[selectedCourse as keyof typeof coursesData].map((item, index) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(item.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <div className="flex items-center space-x-2">
                    {item.photoSpot && (
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                        📸 포토스팟
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {getTypeName(item.type)}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.duration}</span>
                  </div>
                  {item.petFriendly && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      🐾 반려동물 동반 가능
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button className="flex-1">
          이 코스로 여행 계획 생성
        </Button>
        <Button variant="outline" className="flex-1">
          코스 수정하기
        </Button>
      </div>
    </div>
  );
};

export default AccommodationCourse;
