import { Hospital } from '../types';

export const initialHospitals: Hospital[] = [
  {
    id: 'hosp-shinjuku-001',
    name: {
      ja: '新宿インターナショナルクリニック',
      en: 'Shinjuku International Clinic',
      zh: '新宿国际诊所',
      ko: '신주쿠 인터내셔널 클리닉'
    },
    address: {
      ja: '東京都新宿区西新宿1-12-1',
      en: '1-12-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区西新宿1-12-1',
      ko: '도쿄도 신주쿠구 니시신주쿠 1-12-1'
    },
    phone: '03-1111-2222',
    latitude: 35.6898,
    longitude: 139.6968,
    departments: ['internal', 'pediatrics', 'dentistry'],
    supportedLanguages: ['ja', 'en'],
    isOpenNow: true,
    hasHolidayService: true,
    walkInAllowed: true,
    emergencyAccepted: false,
    updatedAt: '2026-06-13',
    dataSource: 'Direct Phone Call (Verified)',
    verification: {
      status: 'verified',
      lastConfirmedAt: '2026-06-13',
      confirmedBy: 'phone',
      confidenceScore: 98,
      notes: 'English staff present at reception and consulting room today.'
    },
    accessInfo: {
      englishSupportToday: true,
      supportedLanguages: ['en', 'ja'],
      creditCardAccepted: true,
      cashlessAccepted: true,
      overseasInsuranceAccepted: true,
      walkInAvailable: true,
      nightOpen: true,
      weekendOpen: true,
      emergencyAvailable: false
    }
  },
  {
    id: 'hosp-shinjuku-002',
    name: {
      ja: '歌舞伎町救急メディカルセンター',
      en: 'Kabukicho Emergency Medical Center',
      zh: '歌舞伎町急救医疗中心',
      ko: '가부키초 응급 메디컬 센터'
    },
    address: {
      ja: '東京都新宿区歌舞伎町2-8-3',
      en: '2-8-3 Kabukicho, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区歌舞伎町2-8-3',
      ko: '도쿄도 신주쿠구 가부키초 2-8-3'
    },
    phone: '03-2222-3333',
    latitude: 35.6961,
    longitude: 139.7025,
    departments: ['surgery', 'orthopedics', 'internal'],
    supportedLanguages: ['ja', 'en', 'zh', 'ko'],
    isOpenNow: true,
    hasHolidayService: true,
    walkInAllowed: false,
    emergencyAccepted: true,
    updatedAt: '2026-06-12',
    dataSource: 'AI Interview Verified',
    verification: {
      status: 'verified',
      lastConfirmedAt: '2026-06-12',
      confirmedBy: 'ai_interview',
      confidenceScore: 95,
      notes: 'Emergency unit open 24/7. Interpretation device & multilingual staff available.'
    },
    accessInfo: {
      englishSupportToday: true,
      supportedLanguages: ['en', 'ja', 'zh', 'ko'],
      creditCardAccepted: true,
      cashlessAccepted: false,
      overseasInsuranceAccepted: true,
      walkInAvailable: false,
      nightOpen: true,
      weekendOpen: true,
      emergencyAvailable: true
    }
  },
  {
    id: 'hosp-shinjuku-003',
    name: {
      ja: '大久保ファミリークリニック',
      en: 'Okubo Family Clinic',
      zh: '大久保家庭诊所',
      ko: '오쿠보 패밀리 클리닉'
    },
    address: {
      ja: '東京都新宿区大久保1-15-2',
      en: '1-15-2 Okubo, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区大久保1-15-2',
      ko: '도쿄도 신주쿠구 오쿠보 1-15-2'
    },
    phone: '03-3333-4444',
    latitude: 35.7012,
    longitude: 139.7048,
    departments: ['internal', 'pediatrics'],
    supportedLanguages: ['ja', 'zh', 'ko', 'en'],
    isOpenNow: true,
    hasHolidayService: false,
    walkInAllowed: true,
    emergencyAccepted: false,
    updatedAt: '2026-06-11',
    dataSource: 'Manual Visit & Verification',
    verification: {
      status: 'verified',
      lastConfirmedAt: '2026-06-11',
      confirmedBy: 'manual_visit',
      confidenceScore: 97,
      notes: 'Chinese and Korean fluent doctors. English translation available via iPad.'
    },
    accessInfo: {
      englishSupportToday: true,
      supportedLanguages: ['zh', 'ko', 'en', 'ja'],
      creditCardAccepted: false,
      cashlessAccepted: true,
      overseasInsuranceAccepted: false,
      walkInAvailable: true,
      nightOpen: false,
      weekendOpen: true,
      emergencyAvailable: false
    }
  },
  {
    id: 'hosp-shinjuku-004',
    name: {
      ja: '西新宿ハートクリニック',
      en: 'Nishi-Shinjuku Heart Clinic',
      zh: '西新宿心脏诊所',
      ko: '니시신주쿠 하트 클리닉'
    },
    address: {
      ja: '東京都新宿区西新宿6-5-1',
      en: '6-5-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区西新宿6-5-1',
      ko: '도쿄도 신주쿠구 니시신주쿠 6-5-1'
    },
    phone: '03-4444-5555',
    latitude: 35.6934,
    longitude: 139.6912,
    departments: ['internal'],
    supportedLanguages: ['ja', 'en'],
    isOpenNow: false,
    hasHolidayService: false,
    walkInAllowed: true,
    emergencyAccepted: false,
    updatedAt: '2026-06-05',
    dataSource: 'Official Website Info',
    verification: {
      status: 'in_progress',
      lastConfirmedAt: '2026-06-05',
      confirmedBy: 'official_website',
      confidenceScore: 80,
      notes: 'English speaking doctor on duty on weekdays. Cash only.'
    },
    accessInfo: {
      englishSupportToday: false,
      supportedLanguages: ['en', 'ja'],
      creditCardAccepted: false,
      cashlessAccepted: false,
      overseasInsuranceAccepted: false,
      walkInAvailable: true,
      nightOpen: false,
      weekendOpen: false,
      emergencyAvailable: false
    }
  },
  {
    id: 'hosp-shinjuku-005',
    name: {
      ja: '高田馬場小児科・内科',
      en: 'Takadanobaba Pediatrics & Internal Medicine',
      zh: '高田马场儿科内科诊所',
      ko: '다카다노바바 소아과・내과'
    },
    address: {
      ja: '東京都新宿区高田馬場2-14-5',
      en: '2-14-5 Takadanobaba, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区高田马场2-14-5',
      ko: '도쿄도 신주쿠구 다카다노바바 2-14-5'
    },
    phone: '03-5555-6666',
    latitude: 35.7128,
    longitude: 139.7038,
    departments: ['internal', 'pediatrics'],
    supportedLanguages: ['ja', 'en'],
    isOpenNow: true,
    hasHolidayService: true,
    walkInAllowed: true,
    emergencyAccepted: false,
    updatedAt: '2026-05-20',
    dataSource: 'Open Data Source',
    verification: {
      status: 'unverified',
      lastConfirmedAt: '2026-05-20',
      confirmedBy: 'open_data',
      confidenceScore: 50,
      notes: 'Listed as English available in open data directory. Payment options unverified.'
    },
    accessInfo: {
      englishSupportToday: false,
      supportedLanguages: ['en', 'ja'],
      creditCardAccepted: true,
      cashlessAccepted: false,
      overseasInsuranceAccepted: false,
      walkInAvailable: true,
      nightOpen: false,
      weekendOpen: true,
      emergencyAvailable: false
    }
  }
];
