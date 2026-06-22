export type Language = 'ja' | 'en' | 'zh' | 'ko' | 'es';

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
  website?: string;
  closedDays?: Record<string, boolean>;
  openingHours?: Record<string, Array<{ start: string; end: string }> | null>;

  // New verification and access status
  verification: ClinicVerification;
  accessInfo: ClinicAccessInfo;
}

export const departments = [
  { id: 'internal',      name: { ja: '内科',     en: 'Internal Medicine', zh: '内科',   ko: '내과',     es: 'Medicina Interna' } },
  { id: 'surgery',       name: { ja: '外科',     en: 'Surgery',           zh: '外科',   ko: '외과',     es: 'Cirugía' } },
  { id: 'pediatrics',    name: { ja: '小児科',   en: 'Pediatrics',        zh: '儿科',   ko: '소아과',   es: 'Pediatría' } },
  { id: 'orthopedics',   name: { ja: '整形外科', en: 'Orthopedics',       zh: '骨科',   ko: '정형외과', es: 'Traumatología' } },
  { id: 'dermatology',   name: { ja: '皮膚科',   en: 'Dermatology',       zh: '皮肤科', ko: '피부과',   es: 'Dermatología' } },
  { id: 'ophthalmology', name: { ja: '眼科',     en: 'Ophthalmology',     zh: '眼科',   ko: '안과',     es: 'Oftalmología' } },
  { id: 'ent',           name: { ja: '耳鼻科',   en: 'ENT',               zh: '耳鼻科', ko: '이비인후과', es: 'ORL' } },
  { id: 'obgyn',         name: { ja: '産婦人科', en: 'OB/GYN',            zh: '妇产科', ko: '산부인과', es: 'Ginecología' } },
  { id: 'psychiatry',    name: { ja: '心療内科・精神科', en: 'Psychiatry', zh: '精神科', ko: '정신건강의학과', es: 'Psiquiatría' } },
  { id: 'urology',       name: { ja: '泌尿器科', en: 'Urology',           zh: '泌尿科', ko: '비뇨기과', es: 'Urología' } },
];
