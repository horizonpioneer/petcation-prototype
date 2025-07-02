
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Dog, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Pet {
  id: string;
  name: string;
  species: '개' | '고양이';
  breed: string;
  age: number;
  weight: number;
  isNeutered: boolean;
  personality: string[];
  medicalNotes: string;
  photo?: string;
}

interface PetProfileProps {
  onPetSelect?: (pet: Pet) => void;
  selectedPetId?: string;
}

const PetProfile: React.FC<PetProfileProps> = ({ onPetSelect, selectedPetId }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // 로컬 스토리지에서 반려동물 정보 로드
  useEffect(() => {
    const savedPets = localStorage.getItem('petProfiles');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  // 반려동물 정보 저장
  const savePets = (newPets: Pet[]) => {
    setPets(newPets);
    localStorage.setItem('petProfiles', JSON.stringify(newPets));
  };

  const handleAddPet = (petData: Omit<Pet, 'id'>) => {
    const newPet = { ...petData, id: Date.now().toString() };
    const newPets = [...pets, newPet];
    savePets(newPets);
    setShowAddForm(false);
  };

  const handleEditPet = (petData: Pet) => {
    const newPets = pets.map(pet => pet.id === petData.id ? petData : pet);
    savePets(newPets);
    setEditingPet(null);
  };

  const handleDeletePet = (petId: string) => {
    const newPets = pets.filter(pet => pet.id !== petId);
    savePets(newPets);
  };

  const getSizeCategory = (weight: number) => {
    if (weight <= 5) return '초소형견';
    if (weight <= 10) return '소형견';
    if (weight <= 20) return '중형견';
    return '대형견';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">🐾 반려동물 프로필</h3>
        <Button onClick={() => setShowAddForm(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          반려동물 등록
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="p-6 text-center">
          <Dog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">등록된 반려동물이 없습니다</p>
          <Button onClick={() => setShowAddForm(true)}>
            첫 번째 반려동물 등록하기
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map(pet => (
            <Card 
              key={pet.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedPetId === pet.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onPetSelect?.(pet)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-2xl">
                    {pet.species === '개' ? '🐕' : '🐱'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                    <p className="text-sm text-gray-600">{pet.breed}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPet(pet);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePet(pet.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{pet.age}세</Badge>
                  <Badge variant="outline">{pet.weight}kg</Badge>
                  <Badge variant="outline">{getSizeCategory(pet.weight)}</Badge>
                  {pet.isNeutered && <Badge variant="outline">중성화 완료</Badge>}
                </div>
                
                {pet.personality.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {pet.personality.map((trait, index) => (
                      <Badge key={index} className="text-xs bg-blue-50 text-blue-700">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {(showAddForm || editingPet) && (
        <PetForm
          pet={editingPet}
          onSave={editingPet ? handleEditPet : handleAddPet}
          onCancel={() => {
            setShowAddForm(false);
            setEditingPet(null);
          }}
        />
      )}
    </div>
  );
};

interface PetFormProps {
  pet?: Pet | null;
  onSave: (pet: any) => void;
  onCancel: () => void;
}

const PetForm: React.FC<PetFormProps> = ({ pet, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    species: pet?.species || '개' as '개' | '고양이',
    breed: pet?.breed || '',
    age: pet?.age || 1,
    weight: pet?.weight || 5,
    isNeutered: pet?.isNeutered || false,
    personality: pet?.personality || [],
    medicalNotes: pet?.medicalNotes || ''
  });

  const personalityOptions = [
    '온순함', '활발함', '사교적', '조용함', '호기심 많음', 
    '경계심 많음', '애교 많음', '독립적', '에너지 넘침', '차분함'
  ];

  const togglePersonality = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter(p => p !== trait)
        : [...prev.personality, trait]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pet ? { ...formData, id: pet.id } : formData);
  };

  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold mb-4">
        {pet ? '반려동물 정보 수정' : '새 반려동물 등록'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">종류</label>
            <select
              value={formData.species}
              onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value as '개' | '고양이' }))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="개">개</option>
              <option value="고양이">고양이</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">품종</label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="예: 골든 리트리버, 말티즈 등"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">나이</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-md"
              min="0"
              max="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">몸무게 (kg)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-md"
              min="0.1"
              max="100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="neutered"
            checked={formData.isNeutered}
            onChange={(e) => setFormData(prev => ({ ...prev, isNeutered: e.target.checked }))}
          />
          <label htmlFor="neutered" className="text-sm">중성화 완료</label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">성격 (복수 선택 가능)</label>
          <div className="grid grid-cols-3 gap-2">
            {personalityOptions.map(trait => (
              <Badge
                key={trait}
                variant={formData.personality.includes(trait) ? "default" : "outline"}
                className="cursor-pointer text-center py-2"
                onClick={() => togglePersonality(trait)}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">특이사항/건강 정보</label>
          <textarea
            value={formData.medicalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, medicalNotes: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md h-20"
            placeholder="알레르기, 복용 중인 약물, 특별한 주의사항 등"
          />
        </div>

        <div className="flex space-x-3">
          <Button type="submit" className="flex-1">
            {pet ? '수정하기' : '등록하기'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PetProfile;
