export type Language = 'ja' | 'en' | 'zh' | 'ko';

export type ClinicVerification = {
  status: "verified" | "in_progress" | "unverified";
  lastConfirmedAt?: string;
  confirmedBy?: "phone" | "ai_interview" | "official_website" | "open_data" | "manual_visit";
  confidenceScore?: number;
  notes?: string;
};

export type ClinicAccessInfo = {
  englishSupportToday?: boolean;
  supportedLanguages?: string[];
  creditCardAccepted?: boolean;
  cashlessAccepted?: boolean;
  overseasInsuranceAccepted?: boolean;
  walkInAvailable?: boolean;
  nightOpen?: boolean;
  weekendOpen?: boolean;
  emergencyAvailable?: boolean;
};

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
  
  // New verification and access status
  verification: ClinicVerification;
  accessInfo: ClinicAccessInfo;
}

export const departments = [
  { id: 'internal', name: { ja: '内科', en: 'Internal Medicine', zh: '内科', ko: '내과' } },
  { id: 'surgery', name: { ja: '外科', en: 'Surgery', zh: '外科', ko: '외과' } },
  { id: 'pediatrics', name: { ja: '小児科', en: 'Pediatrics', zh: '儿科', ko: '소아과' } },
  { id: 'orthopedics', name: { ja: '整形外科', en: 'Orthopedics', zh: '骨科', ko: '정형외과' } },
  { id: 'dentistry', name: { ja: '歯科', en: 'Dentistry', zh: '牙科', ko: '치과' } },
];
