
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PetProfile from '@/components/PetProfile';

const SearchFilters = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [location, setLocation] = useState('');
  const [petSize, setPetSize] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [showPetProfile, setShowPetProfile] = useState(false);

  // 반려동물 프로필에서 자동으로 크기 설정
  useEffect(() => {
    if (selectedPet) {
      const weight = selectedPet.weight;
      if (weight <= 5) setPetSize('small');
      else if (weight <= 20) setPetSize('medium');
      else setPetSize('large');
    }
  }, [selectedPet]);

  const petSizes = [
    { id: 'small', label: '소형견 (5kg 이하)' },
    { id: 'medium', label: '중형견 (5-20kg)' },
    { id: 'large', label: '대형견 (20kg 이상)' }
  ];

  const petAmenities = [
    { id: 'playground', label: '애견 운동장' },
    { id: 'pool', label: '애견 수영장' },
    { id: 'shower', label: '전용 샤워실' },
    { id: 'supplies', label: '식기/패드 제공' },
    { id: 'cafe', label: '애견 동반 카페' },
    { id: 'grooming', label: '미용 서비스' }
  ];

  const toggleAmenity = (amenityId: string) => {
    setAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSearch = () => {
    onSearch({
      location,
      petSize,
      priceRange,
      amenities,
      selectedPet
    });
  };

  return (
    <div className="space-y-6">
      {/* 반려동물 프로필 섹션 */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">🐾 반려동물 선택</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowPetProfile(!showPetProfile)}
          >
            <User className="h-4 w-4 mr-2" />
            프로필 관리
          </Button>
        </div>

        {selectedPet ? (
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-xl">
              {selectedPet.species === '개' ? '🐕' : '🐱'}
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedPet.name}</div>
              <div className="text-sm text-gray-600">
                {selectedPet.breed} • {selectedPet.age}세 • {selectedPet.weight}kg
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedPet(null)}
            >
              변경
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-3">등록된 반려동물을 선택하면 맞춤 검색이 가능해요</p>
            <Button onClick={() => setShowPetProfile(true)}>
              반려동물 등록하기
            </Button>
          </div>
        )}

        {showPetProfile && (
          <div className="mt-4 p-4 bg-white rounded-lg">
            <PetProfile 
              onPetSelect={(pet) => {
                setSelectedPet(pet);
                setShowPetProfile(false);
              }}
              selectedPetId={selectedPet?.id}
            />
          </div>
        )}
      </Card>

      {/* 기존 검색 필터 */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-lg">
        {/* Main Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="어디로 떠나시나요?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={petSize}
            onChange={(e) => setPetSize(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={selectedPet} // 반려동물이 선택된 경우 자동 설정
          >
            <option value="">반려동물 크기</option>
            {petSizes.map(size => (
              <option key={size.id} value={size.id}>{size.label}</option>
            ))}
          </select>

          <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium py-3">
            <Search className="h-5 w-5 mr-2" />
            검색
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            반려동물 편의시설
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {petAmenities.map(amenity => (
              <Badge
                key={amenity.id}
                variant={amenities.includes(amenity.id) ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-center transition-all hover:scale-105 ${
                  amenities.includes(amenity.id) 
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                {amenity.label}
              </Badge>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">가격대 (1박 기준)</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">전체 가격</option>
              <option value="0-100">10만원 이하</option>
              <option value="100-200">10-20만원</option>
              <option value="200-300">20-30만원</option>
              <option value="300+">30만원 이상</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SearchFilters;
