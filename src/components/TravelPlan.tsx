
import React, { useState } from 'react';
import { Calendar, CheckSquare, MapPin, Clock, Plus, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TravelPlanProps {
  tripId?: string;
}

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface ScheduleItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  duration: string;
  type: 'accommodation' | 'activity' | 'meal' | 'travel';
}

const TravelPlan: React.FC<TravelPlanProps> = ({ tripId }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: '1',
      category: '반려동물 필수품',
      item: '반려동물 목줄 및 하네스',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      category: '반려동물 필수품',
      item: '반려동물 사료 (3일분)',
      completed: true,
      priority: 'high'
    },
    {
      id: '3',
      category: '반려동물 필수품',
      item: '물그릇 및 사료그릇',
      completed: false,
      priority: 'high'
    },
    {
      id: '4',
      category: '반려동물 건강',
      item: '예방접종 증명서',
      completed: false,
      priority: 'high'
    },
    {
      id: '5',
      category: '반려동물 건강',
      item: '반려동물 응급처치용품',
      completed: false,
      priority: 'medium'
    },
    {
      id: '6',
      category: '반려동물 용품',
      item: '반려동물 침구류',
      completed: false,
      priority: 'medium'
    },
    {
      id: '7',
      category: '반려동물 용품',
      item: '배변봉투',
      completed: true,
      priority: 'medium'
    },
    {
      id: '8',
      category: '반려동물 용품',
      item: '반려동물 장난감',
      completed: false,
      priority: 'low'
    },
    {
      id: '9',
      category: '개인 준비물',
      item: '여행자 보험 가입',
      completed: false,
      priority: 'medium'
    },
    {
      id: '10',
      category: '개인 준비물',
      item: '카메라 및 충전기',
      completed: false,
      priority: 'low'
    }
  ]);

  const [schedule] = useState<ScheduleItem[]>([
    {
      id: '1',
      day: 1,
      time: '10:00',
      activity: '오션뷰 펫 리조트 체크인',
      location: '강릉시 해안가',
      duration: '30분',
      type: 'accommodation'
    },
    {
      id: '2',
      day: 1,
      time: '11:00',
      activity: '강릉 해변 산책',
      location: '강릉 해변',
      duration: '2시간',
      type: 'activity'
    },
    {
      id: '3',
      day: 1,
      time: '14:00',
      activity: '애견 동반 카페에서 점심',
      location: '바다 카페',
      duration: '1시간',
      type: 'meal'
    },
    {
      id: '4',
      day: 1,
      time: '16:00',
      activity: '애견 수영장 이용',
      location: '펫 리조트',
      duration: '1시간',
      type: 'activity'
    },
    {
      id: '5',
      day: 2,
      time: '09:00',
      activity: '정동진 일출 감상',
      location: '정동진역',
      duration: '1시간',
      type: 'activity'
    },
    {
      id: '6',
      day: 2,
      time: '12:00',
      activity: '체크아웃 및 귀가',
      location: '펫 리조트',
      duration: '30분',
      type: 'travel'
    }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'accommodation':
        return '🏨';
      case 'activity':
        return '🎯';
      case 'meal':
        return '🍽️';
      case 'travel':
        return '🚗';
      default:
        return '📍';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const completedItems = checklist.filter(item => item.completed).length;
  const completionRate = Math.round((completedItems / checklist.length) * 100);

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const scheduleByDay = schedule.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, ScheduleItem[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📋 여행 계획
        </h2>
        <p className="text-gray-600">
          체크리스트와 일정을 확인하고 완벽한 여행을 준비하세요
        </p>
      </div>

      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="checklist" className="flex items-center space-x-2">
            <CheckSquare className="h-4 w-4" />
            <span>준비물 체크리스트</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>여행 일정</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">준비 진행률</h3>
                <Badge variant="outline" className={`px-3 py-1 ${
                  completionRate >= 80 ? 'bg-green-100 text-green-700' :
                  completionRate >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {completionRate}% 완료
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedItems}/{checklist.length} 항목 완료
              </p>
            </Card>

            {/* Checklist by Category */}
            {Object.entries(groupedChecklist).map(([category, items]) => (
              <Card key={category} className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {category} ({items.filter(item => item.completed).length}/{items.length})
                </h4>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <label
                          htmlFor={item.id}
                          className={`text-sm cursor-pointer ${
                            item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {item.item}
                        </label>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(item.priority)}`}
                        >
                          {item.priority === 'high' ? '필수' : 
                           item.priority === 'medium' ? '권장' : '선택'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              항목 추가하기
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-6">
            {Object.entries(scheduleByDay).map(([day, items]) => (
              <Card key={day} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {day}일차 일정
                </h3>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                          {getActivityIcon(item.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{item.activity}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{item.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </div>
                      {index < items.length - 1 && (
                        <div className="absolute left-10 top-12 w-px h-8 bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              일정 추가하기
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelPlan;
