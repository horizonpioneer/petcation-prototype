
import React, { useState } from 'react';
import { MapPin, Search, Filter, Star, Clock, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PetPlace {
  id: string;
  name: string;
  category: string;
  location: string;
  region: string;
  rating: number;
  petFriendlyScore: number;
  distance: string;
  openHours: string;
  description: string;
  features: string[];
  image: string;
}

const RegionalPetPlaces: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [places, setPlaces] = useState<PetPlace[]>([]);

  const regions = [
    { id: 'seoul', name: '서울' },
    { id: 'busan', name: '부산' },
    { id: 'incheon', name: '인천' },
    { id: 'daegu', name: '대구' },
    { id: 'gwangju', name: '광주' },
    { id: 'daejeon', name: '대전' },
    { id: 'ulsan', name: '울산' },
    { id: 'sejong', name: '세종' },
    { id: 'gyeonggi', name: '경기도' },
    { id: 'gangwon', name: '강원도' },
    { id: 'chungbuk', name: '충청북도' },
    { id: 'chungnam', name: '충청남도' },
    { id: 'jeonbuk', name: '전라북도' },
    { id: 'jeonnam', name: '전라남도' },
    { id: 'gyeongbuk', name: '경상북도' },
    { id: 'gyeongnam', name: '경상남도' },
    { id: 'jeju', name: '제주도' }
  ];

  const categories = [
    { id: 'cafe', name: '카페/레스토랑', icon: '☕' },
    { id: 'park', name: '공원/산책로', icon: '🌳' },
    { id: 'beach', name: '해변/워터파크', icon: '🏖️' },
    { id: 'hotel', name: '숙박시설', icon: '🏨' },
    { id: 'shopping', name: '쇼핑몰', icon: '🛍️' },
    { id: 'hospital', name: '동물병원', icon: '🏥' },
    { id: 'grooming', name: '미용실', icon: '✂️' },
    { id: 'activity', name: '체험/놀이시설', icon: '🎯' }
  ];

  const mockPlaces: Record<string, PetPlace[]> = {
    seoul: [
      {
        id: '1',
        name: '서울숲 도그런',
        category: 'park',
        location: '서울 성동구 뚝섬로',
        region: 'seoul',
        rating: 4.8,
        petFriendlyScore: 4.9,
        distance: '2.3km',
        openHours: '06:00 - 22:00',
        description: '대형 도그런과 산책로가 있는 반려동물 천국',
        features: ['대형 운동장', '음수대', '배변봉투 제공', '그늘막'],
        image: '🌳'
      },
      {
        id: '2',  
        name: '펫프렌즈 카페',
        category: 'cafe',
        location: '서울 강남구 테헤란로',
        region: 'seoul',
        rating: 4.6,
        petFriendlyScore: 4.7,
        distance: '1.8km',
        openHours: '10:00 - 22:00',
        description: '반려동물 전용 메뉴와 놀이 공간이 있는 카페',
        features: ['반려동물 메뉴', '놀이 공간', '포토존', '주차 가능'],
        image: '☕'
      }
    ],
    busan: [
      {
        id: '3',
        name: '해운대 펫 비치',
        category: 'beach',
        location: '부산 해운대구 해변로',
        region: 'busan',
        rating: 4.7,
        petFriendlyScore: 4.8,
        distance: '500m',
        openHours: '24시간',
        description: '반려동물과 함께 즐길 수 있는 해변',
        features: ['반려동물 수영 가능', '샤워 시설', '그늘막', '주차장'],
        image: '🏖️'
      }
    ]
  };

  const handleSearch = () => {
    if (selectedRegion) {
      const regionPlaces = mockPlaces[selectedRegion] || [];
      let filteredPlaces = regionPlaces;
      
      if (selectedCategory) {
        filteredPlaces = regionPlaces.filter(place => place.category === selectedCategory);
      }
      
      setPlaces(filteredPlaces);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🗺️ 지역별 반려동물 동반 가능 장소</h2>
        <p className="text-gray-600">전국 반려동물 친화 시설을 지역별로 찾아보세요</p>
      </div>

      {/* Search Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지역 선택</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">지역을 선택하세요</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체 카테고리</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
          </div>
        </div>

        {/* Category Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Results */}
      {places.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            검색 결과 ({places.length}개)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map(place => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{place.name}</h4>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {place.location}
                      </div>
                    </div>
                    <div className="text-2xl">{place.image}</div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{place.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{place.rating}</span>
                      </div>
                      <div className="text-sm text-blue-600">
                        🐾 {place.petFriendlyScore}/5
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Car className="h-3 w-3 mr-1" />
                      {place.distance}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    {place.openHours}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {place.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {places.length === 0 && selectedRegion && (
        <Card className="p-8 text-center">
          <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 지역이나 카테고리를 선택해보세요</p>
        </Card>
      )}
    </div>
  );
};

export default RegionalPetPlaces;
