
import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TravelPreference {
  petSize: 'small' | 'medium' | 'large';
  petAge: 'puppy' | 'adult' | 'senior';
  travelStyle: 'relaxing' | 'active' | 'adventure';
  budget: 'budget' | 'standard' | 'luxury';
  duration: 1 | 2 | 3 | 4 | 5;
  interests: string[];
}

interface RecommendationPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalPrice: number;
  accommodations: Array<{
    name: string;
    location: string;
    nights: number;
    petFriendlyScore: number;
  }>;
  activities: Array<{
    name: string;
    type: string;
    duration: string;
  }>;
  suitability: {
    petSize: string[];
    petAge: string[];
    travelStyle: string[];
  };
}

const PersonalizedRecommendation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({});
  const [recommendations, setRecommendations] = useState<RecommendationPackage[]>([]);

  const steps = [
    {
      title: '반려동물 정보',
      component: PetInfoStep
    },
    {
      title: '여행 스타일',
      component: TravelStyleStep
    },
    {
      title: '예산 및 기간',
      component: BudgetStep
    },
    {
      title: '관심사',
      component: InterestsStep
    }
  ];

  const handleStepComplete = (stepData: any) => {
    setPreferences(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations({ ...preferences, ...stepData });
    }
  };

  const generateRecommendations = (finalPreferences: TravelPreference) => {
    // AI 기반 맞춤 추천 로직 (실제로는 백엔드 API 호출)
    const mockRecommendations: RecommendationPackage[] = [
      {
        id: '1',
        title: '🏖️ 해변 힐링 패키지',
        description: '바다와 함께하는 평온한 휴식',
        duration: '2박 3일',
        totalPrice: 350000,
        accommodations: [
          {
            name: '오션뷰 펫 리조트',
            location: '강릉',
            nights: 2,
            petFriendlyScore: 4.9
          }
        ],
        activities: [
          { name: '해변 산책', type: '산책', duration: '1시간' },
          { name: '애견 수영장', type: '수영', duration: '2시간' },
          { name: '선셋 카페', type: '카페', duration: '1시간' }
        ],
        suitability: {
          petSize: ['small', 'medium'],
          petAge: ['adult', 'senior'],
          travelStyle: ['relaxing']
        }
      },
      {
        id: '2',
        title: '⛰️ 산속 어드벤처 패키지',
        description: '자연 속에서 즐기는 액티브한 여행',
        duration: '3박 4일',
        totalPrice: 480000,
        accommodations: [
          {
            name: '숲속 힐링 펜션',
            location: '가평',
            nights: 3,
            petFriendlyScore: 4.7
          }
        ],
        activities: [
          { name: '트레킹 코스', type: '등산', duration: '3시간' },
          { name: '계곡 물놀이', type: '수영', duration: '2시간' },
          { name: '캠프파이어', type: '캠핑', duration: '2시간' }
        ],
        suitability: {
          petSize: ['medium', 'large'],
          petAge: ['puppy', 'adult'],
          travelStyle: ['active', 'adventure']
        }
      }
    ];

    setRecommendations(mockRecommendations);
    setCurrentStep(steps.length);
  };

  const resetRecommendation = () => {
    setCurrentStep(0);
    setPreferences({});
    setRecommendations([]);
  };

  if (currentStep >= steps.length) {
    return (
      <RecommendationResults
        recommendations={recommendations}
        preferences={preferences as TravelPreference}
        onReset={resetRecommendation}
      />
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ✨ 맞춤형 여행 추천
        </h2>
        <p className="text-gray-600">
          반려동물의 특성과 여행 취향을 알려주시면 완벽한 여행을 추천해드릴게요!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index < currentStep
                    ? 'bg-blue-600 text-white'
                    : index === currentStep
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <CurrentStepComponent
        preferences={preferences}
        onComplete={handleStepComplete}
        onBack={() => setCurrentStep(Math.max(0, currentStep - 1))}
      />
    </div>
  );
};

// Step Components
const PetInfoStep: React.FC<any> = ({ preferences, onComplete, onBack }) => {
  const [petSize, setPetSize] = useState(preferences.petSize || '');
  const [petAge, setPetAge] = useState(preferences.petAge || '');

  const handleNext = () => {
    if (petSize && petAge) {
      onComplete({ petSize, petAge });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">반려동물 정보를 알려주세요</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">반려동물 크기</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'small', label: '소형견', desc: '5kg 이하' },
              { value: 'medium', label: '중형견', desc: '5-20kg' },
              { value: 'large', label: '대형견', desc: '20kg 이상' }
            ].map(option => (
              <div
                key={option.value}
                onClick={() => setPetSize(option.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  petSize === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">반려동물 나이</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'puppy', label: '퍼피', desc: '1세 이하' },
              { value: 'adult', label: '성견', desc: '1-7세' },
              { value: 'senior', label: '시니어', desc: '7세 이상' }
            ].map(option => (
              <div
                key={option.value}
                onClick={() => setPetAge(option.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  petAge === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleNext} 
          disabled={!petSize || !petAge}
          className="px-8"
        >
          다음
        </Button>
      </div>
    </Card>
  );
};

const TravelStyleStep: React.FC<any> = ({ preferences, onComplete, onBack }) => {
  const [travelStyle, setTravelStyle] = useState(preferences.travelStyle || '');

  const handleNext = () => {
    if (travelStyle) {
      onComplete({ travelStyle });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">어떤 여행을 원하시나요?</h3>
      
      <div className="space-y-3">
        {[
          { 
            value: 'relaxing', 
            label: '🌊 편안한 휴식', 
            desc: '조용하고 평화로운 환경에서 힐링' 
          },
          { 
            value: 'active', 
            label: '🏃 활동적인 여행', 
            desc: '다양한 액티비티와 체험 활동' 
          },
          { 
            value: 'adventure', 
            label: '🏔️ 모험적인 여행', 
            desc: '새로운 도전과 스릴 넘치는 경험' 
          }
        ].map(option => (
          <div
            key={option.value}
            onClick={() => setTravelStyle(option.value)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              travelStyle === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-lg">{option.label}</div>
            <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!travelStyle}
          className="px-8"
        >
          다음
        </Button>
      </div>
    </Card>
  );
};

const BudgetStep: React.FC<any> = ({ preferences, onComplete, onBack }) => {
  const [budget, setBudget] = useState(preferences.budget || '');
  const [duration, setDuration] = useState(preferences.duration || 2);

  const handleNext = () => {
    if (budget && duration) {
      onComplete({ budget, duration });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">예산과 여행 기간을 선택하세요</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">예산 (1박 기준)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'budget', label: '절약형', desc: '~15만원' },
              { value: 'standard', label: '표준형', desc: '15~30만원' },
              { value: 'luxury', label: '프리미엄', desc: '30만원~' }
            ].map(option => (
              <div
                key={option.value}
                onClick={() => setBudget(option.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  budget === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">여행 기간</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-medium text-lg">{duration}박 {duration + 1}일</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!budget}
          className="px-8"
        >
          다음
        </Button>
      </div>
    </Card>
  );
};

const InterestsStep: React.FC<any> = ({ preferences, onComplete, onBack }) => {
  const [interests, setInterests] = useState<string[]>(preferences.interests || []);

  const interestOptions = [
    '해변/바다', '산/등산', '계곡/강', '카페 투어', '반려동물 테마파크',
    '캠핑', '사진촬영', '미식 여행', '문화체험', '온천/스파'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    onComplete({ interests });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">관심 있는 활동을 선택하세요</h3>
      <p className="text-gray-600 mb-6">복수 선택 가능합니다</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {interestOptions.map(interest => (
          <Badge
            key={interest}
            variant={interests.includes(interest) ? "default" : "outline"}
            className="cursor-pointer p-3 text-center justify-center"
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button onClick={handleNext} className="px-8">
          추천받기
        </Button>
      </div>
    </Card>
  );
};

const RecommendationResults: React.FC<any> = ({ recommendations, preferences, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          맞춤 여행 추천 완료!
        </h2>
        <p className="text-gray-600">
          반려동물의 특성을 고려한 완벽한 여행 코스를 준비했어요
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((pkg: RecommendationPackage) => (
          <Card key={pkg.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600">{pkg.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {pkg.totalPrice.toLocaleString()}원
                </div>
                <div className="text-sm text-gray-600">{pkg.duration}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">🏨 숙소</h4>
                {pkg.accommodations.map((acc, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{acc.name}</div>
                    <div className="text-sm text-gray-600">{acc.location} • {acc.nights}박</div>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{acc.petFriendlyScore}/5</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-medium mb-3">🎯 주요 활동</h4>
                <div className="space-y-2">
                  {pkg.activities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{activity.name}</span>
                      <Badge variant="outline" className="text-xs">{activity.duration}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="px-6">
                이 패키지 예약하기
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={onReset}>
          다시 추천받기
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedRecommendation;
