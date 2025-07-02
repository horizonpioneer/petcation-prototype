
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Camera, Heart, Star, Download, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TravelReportData {
  id: string;
  petName: string;
  destination: string;
  startDate: string;
  endDate: string;
  accommodations: Array<{
    name: string;
    location: string;
    nights: number;
    petFriendlyScore: number;
  }>;
  activities: Array<{
    name: string;
    type: string;
    location: string;
  }>;
  photos: string[];
  totalDistance: number;
  highlights: string[];
}

const TravelReport: React.FC = () => {
  const [reports, setReports] = useState<TravelReportData[]>([]);
  const [selectedReport, setSelectedReport] = useState<TravelReportData | null>(null);

  useEffect(() => {
    // 예시 데이터 - 실제로는 사용자의 여행 기록에서 가져옴
    const mockReports: TravelReportData[] = [
      {
        id: '1',
        petName: '메리',
        destination: '강릉 바다 여행',
        startDate: '2024-06-15',
        endDate: '2024-06-17',
        accommodations: [
          {
            name: '오션뷰 펫 리조트',
            location: '강릉시 해안가',
            nights: 2,
            petFriendlyScore: 4.9
          }
        ],
        activities: [
          { name: '강릉 해변 산책', type: '야외활동', location: '강릉 해변' },
          { name: '애견 수영장', type: '수영', location: '펫 리조트' },
          { name: '애견 카페 방문', type: '카페', location: '바다 카페' }
        ],
        photos: ['🏖️', '🐕', '🌊', '☕'],
        totalDistance: 45.2,
        highlights: [
          '메리가 처음으로 바다를 경험했어요!',
          '수영장에서 즐겁게 놀았어요',
          '새로운 친구들과 만났어요'
        ]
      },
      {
        id: '2',
        petName: '코코',
        destination: '제주도 힐링 여행',
        startDate: '2024-07-01',
        endDate: '2024-07-04',
        accommodations: [
          {
            name: '제주 애견동반 풀빌라',
            location: '서귀포시',
            nights: 3,
            petFriendlyScore: 5.0
          }
        ],
        activities: [
          { name: '한라산 트레킹', type: '등산', location: '한라산' },
          { name: '프라이빗 풀', type: '수영', location: '풀빌라' },
          { name: '제주 해변', type: '산책', location: '중문해변' }
        ],
        photos: ['🏔️', '🏊', '🐾', '🌺'],
        totalDistance: 78.6,
        highlights: [
          '한라산에서 멋진 풍경을 감상했어요',
          '프라이빗 풀에서 자유롭게 놀았어요',
          '제주의 아름다운 자연을 만끽했어요'
        ]
      }
    ];
    setReports(mockReports);
  }, []);

  const generateNewReport = () => {
    // 실제로는 최근 여행 데이터를 분석해서 리포트 생성
    console.log('새로운 여행 리포트 생성');
  };

  if (selectedReport) {
    return <DetailedReport report={selectedReport} onBack={() => setSelectedReport(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🐾 여행 리포트</h2>
          <p className="text-gray-600">반려동물과 함께한 소중한 여행의 추억을 확인해보세요</p>
        </div>
        <Button onClick={generateNewReport}>
          <Plus className="h-4 w-4 mr-2" />
          새 리포트 생성
        </Button>
      </div>

      {reports.length === 0 ? (
        <Card className="p-8 text-center">
          <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">아직 여행 리포트가 없어요</h3>
          <p className="text-gray-600 mb-4">반려동물과 첫 여행을 떠나보세요!</p>
          <Button>여행 계획 세우기</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <Card key={report.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedReport(report)}>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{report.destination}</h3>
                  <Badge className="bg-white/80 text-gray-700">
                    {report.petName}와 함께
                  </Badge>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {report.photos.slice(0, 4).map((photo, index) => (
                    <div key={index} className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center text-2xl">
                      {photo}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">숙소</span>
                    <span className="font-medium">{report.accommodations.length}곳</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">활동</span>
                    <span className="font-medium">{report.activities.length}개</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">이동거리</span>
                    <span className="font-medium">{report.totalDistance}km</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  "{report.highlights[0]}"
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

interface DetailedReportProps {
  report: TravelReportData;
  onBack: () => void;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ report, onBack }) => {
  const downloadReport = () => {
    // PDF 다운로드 기능 구현
    console.log('리포트 다운로드');
  };

  const shareReport = () => {
    // 소셜 공유 기능 구현
    console.log('리포트 공유');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← 돌아가기
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={shareReport}>
            공유하기
          </Button>
          <Button onClick={downloadReport}>
            <Download className="h-4 w-4 mr-2" />
            다운로드
          </Button>
        </div>
      </div>

      <Card className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🐾 {report.petName}의 {report.destination}
          </h1>
          <p className="text-gray-600">
            {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{report.accommodations.length}</div>
            <div className="text-gray-600">방문한 숙소</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{report.activities.length}</div>
            <div className="text-gray-600">체험한 활동</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{report.totalDistance}km</div>
            <div className="text-gray-600">총 이동거리</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">🏨 머물렀던 숙소</h3>
            <div className="space-y-3">
              {report.accommodations.map((acc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{acc.name}</h4>
                    <p className="text-sm text-gray-600">{acc.location} • {acc.nights}박</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{acc.petFriendlyScore}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">🎯 체험한 활동</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.activities.map((activity, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{activity.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline">{activity.type}</Badge>
                    <span className="text-sm text-gray-600">{activity.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">✨ 여행 하이라이트</h3>
            <div className="space-y-3">
              {report.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">📸 여행 사진</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {report.photos.map((photo, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-4xl">
                  {photo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TravelReport;
