export type Language = 'ja' | 'en' | 'zh' | 'ko';

export interface Hospital {
  id: string;
  name: Record<Language, string>;
  address: Record<Language, string>;
  phone: string;
  latitude: number;
  longitude: number;
  departments: string[];          // IDs of departments
  supportedLanguages: Language[]; // Supported languages
  isOpenNow: boolean;             // MVP simplified open status
  hasHolidayService: boolean;
  walkInAllowed: boolean;
  emergencyAccepted: boolean;
  updatedAt: string;
  dataSource: string;
}

export const departments = [
  { id: 'internal', name: { ja: '内科', en: 'Internal Medicine', zh: '内科', ko: '내과' } },
  { id: 'surgery', name: { ja: '外科', en: 'Surgery', zh: '外科', ko: '외과' } },
  { id: 'pediatrics', name: { ja: '小児科', en: 'Pediatrics', zh: '儿科', ko: '소아과' } },
  { id: 'orthopedics', name: { ja: '整形外科', en: 'Orthopedics', zh: '骨科', ko: '정형외과' } },
  { id: 'dentistry', name: { ja: '歯科', en: 'Dentistry', zh: '牙科', ko: '치과' } },
];
