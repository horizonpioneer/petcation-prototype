
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SearchFilters = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [location, setLocation] = useState('');
  const [petSize, setPetSize] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

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
      amenities
    });
  };

  return (
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
  );
};

export default SearchFilters;
