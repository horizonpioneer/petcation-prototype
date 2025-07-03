
import React from 'react';
import { Star, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PetFriendlyScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

const PetFriendlyScore: React.FC<PetFriendlyScoreProps> = ({ 
  score, 
  size = 'md',
  showBadge = true 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 4.0) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 3.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 4.5) return {
      title: '매우 우수',
      description: '반려동물을 위한 최고급 시설과 서비스를 제공합니다. 전용 공간, 프리미엄 어메니티, 전문 케어 서비스가 포함되어 있어요.'
    };
    if (score >= 4.0) return {
      title: '우수',
      description: '반려동물 동반에 매우 적합한 시설입니다. 충분한 편의시설과 안전한 환경을 제공해요.'
    };
    if (score >= 3.5) return {
      title: '보통',
      description: '기본적인 반려동물 편의시설을 갖추고 있습니다. 일반적인 여행에 적합해요.'
    };
    return {
      title: '개선 필요',
      description: '반려동물 시설이 제한적입니다. 사전에 추가 준비가 필요할 수 있어요.'
    };
  };

  const scoreInfo = getScoreDescription(score);
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-help">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{score}</span>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
            {showBadge && (
              <Badge 
                variant="outline" 
                className={`${getScoreColor(score)} ${sizeClasses[size]} font-medium hover:shadow-sm transition-shadow`}
              >
                🐾 {scoreInfo.title}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3" side="top">
          <div className="space-y-2">
            <div className="font-semibold text-sm">
              반려동물 친화 점수: {score}/5.0
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              {scoreInfo.description}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">평가 기준</span>
              <span className="font-medium">{scoreInfo.title}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PetFriendlyScore;
