
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, TrendingUp, Award, Heart } from 'lucide-react';

interface TravelStats {
  totalTrips: number;
  totalDays: number;
  totalDistance: number;
  favoriteDestination: string;
  avgPetFriendlyScore: number;
  totalActivities: number;
  monthlyTrips: Array<{ month: string; trips: number; }>;
  destinationStats: Array<{ name: string; visits: number; color: string; }>;
  petFriendlyTrend: Array<{ month: string; score: number; }>;
  topActivities: Array<{ name: string; count: number; }>;
}

const TravelReportSummary: React.FC = () => {
  const [stats, setStats] = useState<TravelStats | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  useEffect(() => {
    // 실제로는 사용자의 여행 데이터를 집계
    const mockStats: TravelStats = {
      totalTrips: 12,
      totalDays: 34,
      totalDistance: 1250.5,
      favoriteDestination: '제주도',
      avgPetFriendlyScore: 4.6,
      totalActivities: 48,
      monthlyTrips: [
        { month: '1월', trips: 1 },
        { month: '2월', trips: 0 },
        { month: '3월', trips: 2 },
        { month: '4월', trips: 1 },
        { month: '5월', trips: 2 },
        { month: '6월', trips: 2 },
        { month: '7월', trips: 1 },
        { month: '8월', trips: 1 },
        { month: '9월', trips: 1 },
        { month: '10월', trips: 0 },
        { month: '11월', trips: 1 },
        { month: '12월', trips: 0 }
      ],
      destinationStats: [
        { name: '제주도', visits: 4, color: '#8884d8' },
        { name: '강릉', visits: 3, color: '#82ca9d' },
        { name: '부산', visits: 2, color: '#ffc658' },
        { name: '가평', visits: 2, color: '#ff7c7c' },
        { name: '기타', visits: 1, color: '#8dd1e1' }
      ],
      petFriendlyTrend: [
        { month: '1월', score: 4.2 },
        { month: '3월', score: 4.4 },
        { month: '4월', score: 4.3 },
        { month: '5월', score: 4.7 },
        { month: '6월', score: 4.8 },
        { month: '7월', score: 4.6 },
        { month: '8월', score: 4.9 },
        { month: '9월', score: 4.7 },
        { month: '11월', score: 4.8 }
      ],
      topActivities: [
        { name: '해변 산책', count: 8 },
        { name: '카페 방문', count: 6 },
        { name: '수영장 이용', count: 5 },
        { name: '트레킹', count: 4 },
        { name: '공원 산책', count: 4 }
      ]
    };
    
    setStats(mockStats);
  }, [selectedPeriod]);

  if (!stats) {
    return <div>로딩 중...</div>;
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 여행 리포트 종합</h2>
          <p className="text-gray-600">반려동물과 함께한 여행을 데이터로 분석해보세요</p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="year">올해</option>
          <option value="6months">최근 6개월</option>
          <option value="3months">최근 3개월</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalTrips}</div>
          <div className="text-sm text-gray-600">총 여행 횟수</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.totalDays}</div>
          <div className="text-sm text-gray-600">총 여행 일수</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.totalDistance}km</div>
          <div className="text-sm text-gray-600">총 이동거리</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.favoriteDestination}</div>
          <div className="text-sm text-gray-600">최애 여행지</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.avgPetFriendlyScore}</div>
          <div className="text-sm text-gray-600">평균 펫친화도</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-indigo-600">{stats.totalActivities}</div>
          <div className="text-sm text-gray-600">총 체험 활동</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trips Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            월별 여행 횟수
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.monthlyTrips}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Destination Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            여행지 분포
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.destinationStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="visits"
              >
                {stats.destinationStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Pet Friendly Score Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            반려동물 친화도 변화
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.petFriendlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            인기 활동 TOP 5
          </h3>
          <div className="space-y-3">
            {stats.topActivities.map((activity, index) => (
              <div key={activity.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <span className="font-medium">{activity.name}</span>
                </div>
                <Badge variant="secondary">{activity.count}회</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          여행 인사이트
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">🎯 여행 패턴</h4>
            <p className="text-sm text-gray-600">
              가장 활발한 여행 시기는 <strong>5-6월</strong>이며, 
              평균 <strong>{(stats.totalDays / stats.totalTrips).toFixed(1)}일</strong> 동안 여행을 즐기고 있어요.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">🏆 반려동물 만족도</h4>
            <p className="text-sm text-gray-600">
              반려동물 친화도가 꾸준히 상승하고 있어요! 
              최근 평균 <strong>{stats.avgPetFriendlyScore}점</strong>으로 매우 우수해요.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TravelReportSummary;
