
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, Navigation, Hospital, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VetHospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  walkTime: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  openHours: string;
  emergencyService: boolean;
  specialties: string[];
  description: string;
}

interface NearbyVetHospitalsProps {
  accommodationLocation: string;
  accommodationName: string;
}

const NearbyVetHospitals: React.FC<NearbyVetHospitalsProps> = ({
  accommodationLocation,
  accommodationName
}) => {
  const [hospitals, setHospitals] = useState<VetHospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 지도 API나 병원 데이터베이스에서 가져옴
    const mockHospitals: VetHospital[] = [
      {
        id: '1',
        name: '강릉 24시 동물병원',
        address: '강원도 강릉시 해안로 123',
        phone: '033-123-4567',
        distance: '1.2km',
        walkTime: '15분',
        rating: 4.8,
        reviewCount: 156,
        isOpen: true,
        openHours: '24시간 운영',
        emergencyService: true,
        specialties: ['응급진료', '수술', '건강검진', '예방접종'],
        description: '24시간 응급진료가 가능한 종합 동물병원입니다.'
      },
      {
        id: '2',
        name: '바다마을 동물병원',
        address: '강원도 강릉시 중앙로 456',
        phone: '033-234-5678',
        distance: '2.1km',
        walkTime: '8분 (차량)',
        rating: 4.6,
        reviewCount: 89,
        isOpen: false,
        openHours: '09:00 - 18:00 (일요일 휴무)',
        emergencyService: false,
        specialties: ['일반진료', '피부과', '안과', '치과'],
        description: '지역 주민들이 신뢰하는 동네 동물병원입니다.'
      },
      {
        id: '3',
        name: '해안 펫클리닉',
        address: '강원도 강릉시 경포로 789',
        phone: '033-345-6789',
        distance: '3.5km',
        walkTime: '12분 (차량)',
        rating: 4.4,
        reviewCount: 67,
        isOpen: true,
        openHours: '09:00 - 20:00',
        emergencyService: false,
        specialties: ['일반진료', '예방접종', '건강검진'],
        description: '친절한 서비스로 유명한 동물병원입니다.'
      }
    ];

    setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 1000);
  }, [accommodationLocation]);

  const callHospital = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://map.kakao.com/link/to/${encodedAddress}`);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
          <Hospital className="h-5 w-5 mr-2 text-red-500" />
          {accommodationName} 근처 동물병원
        </h3>
        <p className="text-gray-600">
          혹시 모를 응급상황에 대비해 주변 동물병원 정보를 확인하세요
        </p>
      </div>

      {/* Emergency Alert */}
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-900 mb-1">응급상황 시 주의사항</h4>
            <p className="text-sm text-red-700">
              심각한 응급상황 시에는 즉시 24시간 동물병원으로 연락하세요. 
              이동 전 병원에 미리 전화하여 상황을 알려주시기 바랍니다.
            </p>
          </div>
        </div>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{hospital.name}</h4>
                  {hospital.emergencyService && (
                    <Badge className="bg-red-100 text-red-700">24시간</Badge>
                  )}
                  <Badge 
                    variant={hospital.isOpen ? "default" : "secondary"}
                    className={hospital.isOpen ? "bg-green-100 text-green-700" : ""}
                  >
                    {hospital.isOpen ? "영업중" : "영업종료"}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hospital.address}
                  </div>
                  <div className="flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    거리 {hospital.distance} • 도보 {hospital.walkTime}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {hospital.openHours}
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{hospital.description}</p>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{hospital.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({hospital.reviewCount})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => callHospital(hospital.phone)}
                className="flex-1"
                variant={hospital.emergencyService ? "default" : "outline"}
              >
                <Phone className="h-4 w-4 mr-2" />
                전화걸기
              </Button>
              <Button 
                onClick={() => getDirections(hospital.address)}
                variant="outline"
                className="flex-1"
              >
                <Navigation className="h-4 w-4 mr-2" />
                길찾기
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Contact Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">📞 응급연락처</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">동물 응급의료센터</span>
            <span className="font-medium text-blue-900">1588-7119</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">24시간 상담 핫라인</span>
            <span className="font-medium text-blue-900">02-3456-7890</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NearbyVetHospitals;
