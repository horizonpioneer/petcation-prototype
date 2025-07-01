
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import AccommodationCard from '@/components/AccommodationCard';
import AccommodationDetail from '@/components/AccommodationDetail';
import AccommodationMap from '@/components/AccommodationMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
  const [filteredAccommodations, setFilteredAccommodations] = useState<any[]>([]);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  // Mock data for accommodations with coordinates
  const accommodations = [
    {
      id: '1',
      name: '오션뷰 펫 리조트',
      location: '강원도 강릉시 해안가',
      coordinates: [128.8760, 37.7519] as [number, number],
      price: 180000,
      rating: 4.8,
      reviewCount: 127,
      image: '🏨',
      petFriendlyScore: 4.9,
      amenities: ['애견 운동장', '애견 수영장', '전용 샤워실', '식기 제공'],
      petFee: 30000,
      theme: 'beach'
    },
    {
      id: '2',
      name: '숲속 힐링 펜션',
      location: '경기도 가평군 설악면',
      coordinates: [127.5098, 37.8313] as [number, number],
      price: 120000,
      rating: 4.6,
      reviewCount: 89,
      image: '🏡',
      petFriendlyScore: 4.7,
      amenities: ['애견 운동장', '트레킹 코스', '바비큐 시설'],
      petFee: 20000,
      theme: 'mountain'
    },
    {
      id: '3',
      name: '제주 애견동반 풀빌라',
      location: '제주특별자치도 서귀포시',
      coordinates: [126.5312, 33.2541] as [number, number],
      price: 250000,
      rating: 4.9,
      reviewCount: 156,
      image: '🏖️',
      petFriendlyScore: 5.0,
      amenities: ['프라이빗 풀', '애견 놀이터', '해변 접근', '미용실'],
      petFee: 0,
      theme: 'beach'
    },
    {
      id: '4',
      name: '계곡뷰 펫 캠핑장',
      location: '충청북도 단양군 매포읍',
      coordinates: [128.3656, 36.9845] as [number, number],
      price: 80000,
      rating: 4.4,
      reviewCount: 67,
      image: '🏕️',
      petFriendlyScore: 4.5,
      amenities: ['계곡 접근', '캠핑 시설', '바비큐', '식기 제공'],
      petFee: 15000,
      theme: 'valley'
    },
    {
      id: '5',
      name: '도심 속 펫 호텔',
      location: '서울특별시 강남구',
      coordinates: [127.0276, 37.4979] as [number, number],
      price: 160000,
      rating: 4.7,
      reviewCount: 203,
      image: '🏙️',
      petFriendlyScore: 4.6,
      amenities: ['펫 카페', '미용 서비스', '의료진 상주', '픽업 서비스'],
      petFee: 25000,
      theme: 'city'
    },
    {
      id: '6',
      name: '산속 통나무 펜션',
      location: '강원도 평창군 대관령면',
      coordinates: [128.7183, 37.6777] as [number, number],
      price: 110000,
      rating: 4.5,
      reviewCount: 94,
      image: '🌲',
      petFriendlyScore: 4.4,
      amenities: ['산책로', '애견 운동장', '난로', '자연 체험'],
      petFee: 18000,
      theme: 'mountain'
    }
  ];

  const handleSearch = (filters: any) => {
    console.log('검색 필터:', filters);
    
    let filtered = [...accommodations];
    
    // 위치 필터링
    if (filters.location) {
      filtered = filtered.filter(acc => 
        acc.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // 반려동물 크기 필터링
    if (filters.petSize) {
      // 실제로는 더 복잡한 로직이 필요하지만 데모용으로 간단히 구현
      filtered = filtered.filter(acc => acc.petFee <= 25000);
    }
    
    // 가격대 필터링
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(acc => acc.price >= min * 1000 && acc.price <= max * 1000);
      } else {
        filtered = filtered.filter(acc => acc.price >= min * 1000);
      }
    }
    
    // 편의시설 필터링
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(acc => 
        filters.amenities.some((amenity: string) => 
          acc.amenities.some(accAmenity => accAmenity.includes(amenity))
        )
      );
    }
    
    setFilteredAccommodations(filtered);
  };

  const handleAccommodationClick = (id: string) => {
    setSelectedAccommodation(id);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedAccommodation(null);
  };

  const themeCategories = [
    { id: 'beach', name: '🏖️ 해변 여행', count: accommodations.filter(a => a.theme === 'beach').length },
    { id: 'mountain', name: '⛰️ 산 여행', count: accommodations.filter(a => a.theme === 'mountain').length },
    { id: 'valley', name: '🏞️ 계곡 여행', count: accommodations.filter(a => a.theme === 'valley').length },
    { id: 'city', name: '🏙️ 도심 여행', count: accommodations.filter(a => a.theme === 'city').length }
  ];

  if (currentView === 'detail') {
    return <AccommodationDetail onBack={handleBackToList} />;
  }

  const displayAccommodations = filteredAccommodations.length > 0 ? filteredAccommodations : accommodations;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🐾 반려동물과 함께하는
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                완벽한 여행
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              투명한 정보, 신뢰할 수 있는 후기, 스트레스 없는 예약
            </p>
          </div>
          
          <SearchFilters onSearch={handleSearch} />
        </div>
      </div>

      {/* Theme Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 테마별 숙소 찾기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {themeCategories.map(category => (
            <Button
              key={category.id}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300"
              onClick={() => {
                const themeFiltered = accommodations.filter(acc => acc.theme === category.id);
                setFilteredAccommodations(themeFiltered);
              }}
            >
              <span className="text-lg mb-1">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}개 숙소
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">반려동물 동반 가능 숙소</h2>
            <p className="text-gray-600 mt-1">{displayAccommodations.length}개의 숙소를 찾았습니다</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={!showMap ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowMap(false)}
              >
                <List className="h-4 w-4 mr-2" />
                목록
              </Button>
              <Button
                variant={showMap ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowMap(true)}
              >
                <Map className="h-4 w-4 mr-2" />
                지도
              </Button>
            </div>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>추천순</option>
              <option>평점 높은순</option>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
              <option>반려동물 친화도순</option>
            </select>
          </div>
        </div>

        {showMap ? (
          <AccommodationMap
            accommodations={displayAccommodations}
            onAccommodationClick={handleAccommodationClick}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAccommodations.map(accommodation => (
              <AccommodationCard
                key={accommodation.id}
                {...accommodation}
                onClick={handleAccommodationClick}
              />
            ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            아직 원하는 숙소를 찾지 못하셨나요?
          </h3>
          <p className="text-gray-600 mb-6">
            더 많은 필터 조건을 설정하거나, 여행 테마별로 추천 숙소를 확인해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
              onClick={() => navigate('/travel-guide')}
            >
              여행 가이드 보기
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              테마별 추천 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
