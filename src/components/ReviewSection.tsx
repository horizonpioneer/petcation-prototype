
import React, { useState } from 'react';
import { Star, ThumbsUp, User, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  userName: string;
  rating: number;
  petFriendlyRating: number;
  cleanlinessRating: number;
  facilitiesRating: number;
  date: string;
  petInfo: {
    name: string;
    breed: string;
    size: string;
  };
  content: string;
  images: string[];
  helpful: number;
}

interface ReviewSectionProps {
  accommodationId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ accommodationId }) => {
  const [filter, setFilter] = useState('all');
  
  // Mock review data
  const reviews: Review[] = [
    {
      id: '1',
      userName: '김민수',
      rating: 4.8,
      petFriendlyRating: 5.0,
      cleanlinessRating: 4.5,
      facilitiesRating: 4.8,
      date: '2024-06-15',
      petInfo: {
        name: '초코',
        breed: '골든 리트리버',
        size: '대형견'
      },
      content: '초코와 함께한 첫 여행이었는데 정말 만족스러웠어요! 애견 운동장이 넓어서 초코가 마음껏 뛰어놀 수 있었고, 직원분들도 반려동물에 대해 잘 알고 계셔서 많은 도움을 받았습니다. 특히 애견 전용 샤워실이 있어서 바다에서 놀고 온 후 깨끗하게 씻겨줄 수 있어서 좋았어요.',
      images: ['🐕', '🏖️'],
      helpful: 12
    },
    {
      id: '2',
      userName: '박지영',
      rating: 4.6,
      petFriendlyRating: 4.8,
      cleanlinessRating: 4.5,
      facilitiesRating: 4.4,
      date: '2024-06-10',
      petInfo: {
        name: '쿠키',
        breed: '말티즈',
        size: '소형견'
      },
      content: '쿠키와 함께 2박 3일 머물렀어요. 방 안이 깨끗하고 반려동물 냄새도 전혀 나지 않았습니다. 식기와 배변패드까지 제공해주셔서 짐을 덜 가져갈 수 있어서 좋았어요. 다만 주변이 조금 시끄러워서 쿠키가 가끔 놀라는 것 같았어요.',
      images: ['🐶'],
      helpful: 8
    },
    {
      id: '3',
      userName: '이준호',
      rating: 4.9,
      petFriendlyRating: 5.0,  
      cleanlinessRating: 4.8,
      facilitiesRating: 4.9,
      date: '2024-05-28',
      petInfo: {
        name: '루비',
        breed: '허스키',
        size: '대형견'
      },
      content: '루비와 함께한 최고의 여행이었습니다! 애견 수영장이 있어서 루비가 정말 즐거워했어요. 수영 후 바로 사용할 수 있는 드라이어와 수건도 비치되어 있어서 편리했습니다. 숙소 주변 산책로도 잘 되어 있어서 매일 아침 루비와 함께 산책을 즐겼어요.',
      images: ['🐕', '🏊'],
      helpful: 15
    }
  ];

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.petInfo.size === filter);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const averagePetFriendly = reviews.reduce((sum, review) => sum + review.petFriendlyRating, 0) / reviews.length;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">사용자 리뷰</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500 ml-2">({reviews.length}개 리뷰)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-blue-600">🐾 반려동물 친화도</span>
              <span className="ml-2 font-semibold">{averagePetFriendly.toFixed(1)}/5</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">전체 리뷰</option>
            <option value="소형견">소형견 리뷰</option>
            <option value="중형견">중형견 리뷰</option>
            <option value="대형견">대형견 리뷰</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map(review => (
          <Card key={review.id} className="p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{review.petInfo.name} ({review.petInfo.breed})</span>
                    <Badge variant="outline" className="text-xs">
                      {review.petInfo.size}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{review.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div className="text-center">
                <div className="text-blue-600 font-semibold">{review.petFriendlyRating}</div>
                <div className="text-gray-500">반려동물 친화도</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-semibold">{review.cleanlinessRating}</div>
                <div className="text-gray-500">청결도</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 font-semibold">{review.facilitiesRating}</div>
                <div className="text-gray-500">시설</div>
              </div>
            </div>

            <p className="text-gray-700 mb-3 leading-relaxed">{review.content}</p>

            {review.images.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {review.images.map((image, index) => (
                  <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                    {image}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp className="h-4 w-4 mr-1" />
                도움돼요 ({review.helpful})
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ReviewSection;
