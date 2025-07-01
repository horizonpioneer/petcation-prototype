
import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Camera, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TravelGuide = () => {
  const navigate = useNavigate();

  const guideCategories = [
    {
      id: 'beach',
      title: '🏖️ 해변 여행',
      description: '반려동물과 함께하는 해변 여행 완벽 가이드',
      image: '🌊',
      tips: [
        '해변 입장 전 반려동물 동반 가능 여부 확인',
        '모래사장에서 뛰어놀 수 있는 안전한 구역 찾기',
        '염분에 노출된 후 깨끗한 물로 발 씻기기',
        '강한 햇볕으로부터 보호할 그늘막 준비'
      ],
      essentials: ['물통', '발 닦는 수건', '그늘막', '배변봉투', '목줄'],
      warnings: ['파도가 높은 날 주의', '염분 섭취 방지', '뜨거운 모래 화상 주의']
    },
    {
      id: 'mountain',
      title: '⛰️ 산 여행',
      description: '반려동물과 함께하는 안전한 등산 가이드',
      image: '🌲',
      tips: [
        '반려동물의 체력 수준에 맞는 코스 선택',
        '등산로 입구에서 반려동물 동반 가능 여부 확인',
        '충분한 휴식과 수분 공급',
        '야생동물 조우 시 대처 방안 숙지'
      ],
      essentials: ['물병', '간식', '응급처치용품', '목줄', '배변봉투', '방충제'],
      warnings: ['급경사 구간 주의', '독성 식물 섭취 방지', '날씨 변화 대비']
    },
    {
      id: 'valley',
      title: '🏞️ 계곡 여행',
      description: '시원한 계곡에서의 반려동물 물놀이 가이드',
      image: '💧',
      tips: [
        '수심이 얕은 곳에서 천천히 물에 적응시키기',
        '물 온도 확인 후 입수시키기',
        '물놀이 후 귀와 발가락 사이 물기 완전히 제거',
        '계곡물 직접 음용 금지'
      ],
      essentials: ['수건', '드라이어', '물통', '간식', '응급처치용품'],
      warnings: ['급류 지역 피하기', '미끄러운 바위 주의', '체온 저하 방지']
    }
  ];

  const generalTips = [
    {
      category: '출발 전 준비',
      items: [
        '여행 전 수의사 건강검진',
        '예방접종 증명서 준비',
        '반려동물 신분증/등록증 지참',
        '평소 먹던 사료와 간식 충분히 준비',
        '응급처치용품과 상비약 준비'
      ]
    },
    {
      category: '이동 중 주의사항',
      items: [
        '차량 이동 시 안전벨트나 이동장 사용',
        '1-2시간마다 휴식 및 화장실 시간',
        '멀미 방지를 위한 공복 상태 피하기',
        '충분한 환기와 적정 온도 유지',
        '음수와 간식 준비'
      ]
    },
    {
      category: '숙소 이용 에티켓',
      items: [
        '체크인 시 반려동물 정보 정확히 전달',
        '실내에서는 목줄 착용 및 배변패드 사용',
        '과도한 짖음이나 소음 방지',
        '가구나 침구에 털이나 냄새 남기지 않기',
        '체크아웃 전 청소 및 손상 여부 확인'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐾 반려동물 여행 가이드
          </h1>
          <p className="text-xl text-gray-600">
            안전하고 즐거운 반려동물 동반 여행을 위한 완벽한 가이드
          </p>
        </div>

        {/* 테마별 가이드 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">테마별 여행 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guideCategories.map(category => (
              <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{category.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      여행 팁
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {category.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Camera className="h-4 w-4 mr-2 text-blue-600" />
                      필수 준비물
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {category.essentials.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                      주의사항
                    </h4>
                    <ul className="space-y-1 text-sm text-orange-600">
                      {category.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">⚠️</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 일반 여행 팁 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">일반 여행 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {generalTips.map((section, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuide;
