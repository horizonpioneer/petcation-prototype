
import React from 'react';
import { Star, MapPin, Heart, Circle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AccommodationCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  petFriendlyScore: number;
  amenities: string[];
  petFee: number;
  onClick: (id: string) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  id,
  name,
  location,
  price,
  rating,
  reviewCount,
  image,
  petFriendlyScore,
  amenities,
  petFee,
  onClick
}) => {
  // 반려동물 친화 점수에 따른 색상 설정
  const getPetFriendlyColor = (score: number) => {
    if (score >= 4.5) return 'from-green-600 to-emerald-600';
    if (score >= 4.0) return 'from-blue-600 to-green-600';
    if (score >= 3.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-orange-500';
  };

  const getPetFriendlyTextColor = (score: number) => {
    if (score >= 4.5) return 'text-green-700';
    if (score >= 4.0) return 'text-blue-700';
    if (score >= 3.5) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => onClick(id)}>
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🏠
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${getPetFriendlyColor(petFriendlyScore)} text-white font-medium`}>
          반려동물 친화 {petFriendlyScore}/5
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Pet Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 3}개
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {(price + petFee).toLocaleString()}원
              </span>
              <span className="text-sm text-gray-500">/ 박</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                ✨ 반려동물 비용 포함
              </Badge>
              <span className={`text-xs font-medium ${getPetFriendlyTextColor(petFriendlyScore)}`}>
                🐾 친화도 {petFriendlyScore}/5
              </span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            예약하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationCard;
