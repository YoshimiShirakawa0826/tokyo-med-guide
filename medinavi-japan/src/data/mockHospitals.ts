import { Hospital } from '../types';

export const initialHospitals: Hospital[] = [
  {
    id: 'hosp-001',
    name: {
      ja: '東京セントラル病院',
      en: 'Tokyo Central Hospital',
      zh: '东京中央医院',
      ko: '도쿄 센트럴 병원'
    },
    address: {
      ja: '東京都新宿区西新宿1-1-1',
      en: '1-1-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
      zh: '东京都新宿区西新宿1-1-1',
      ko: '도쿄도 신주쿠구 니시신주쿠 1-1-1'
    },
    phone: '03-1234-5678',
    latitude: 35.6894,
    longitude: 139.6917,
    departments: ['internal', 'surgery', 'pediatrics'],
    supportedLanguages: ['ja', 'en', 'zh'],
    isOpenNow: true,
    hasHolidayService: true,
    walkInAllowed: true,
    emergencyAccepted: true,
    updatedAt: '2026-06-13',
    dataSource: '東京都医療機関案内サービス (モック)'
  },
  {
    id: 'hosp-002',
    name: {
      ja: '渋谷インターナショナルクリニック',
      en: 'Shibuya International Clinic',
      zh: '涩谷国际诊所',
      ko: '시부야 인터내셔널 클리닉'
    },
    address: {
      ja: '東京都渋谷区渋谷2-2-2',
      en: '2-2-2 Shibuya, Shibuya-ku, Tokyo',
      zh: '东京都涩谷区涩谷2-2-2',
      ko: '도쿄도 시부야구 시부야 2-2-2'
    },
    phone: '03-9876-5432',
    latitude: 35.6580,
    longitude: 139.7016,
    departments: ['internal', 'dentistry'],
    supportedLanguages: ['ja', 'en', 'zh', 'ko'],
    isOpenNow: true,
    hasHolidayService: false,
    walkInAllowed: true,
    emergencyAccepted: false,
    updatedAt: '2026-06-10',
    dataSource: 'クリニック公式ウェブサイト (モック)'
  },
  {
    id: 'hosp-003',
    name: {
      ja: '港区救急センター',
      en: 'Minato Emergency Center',
      zh: '港区急救中心',
      ko: '미나토구 응급 센터'
    },
    address: {
      ja: '東京都港区芝公園3-3-3',
      en: '3-3-3 Shibakoen, Minato-ku, Tokyo',
      zh: '东京都港区芝公园3-3-3',
      ko: '도쿄도 미나토구 시바코엔 3-3-3'
    },
    phone: '03-5555-4444',
    latitude: 35.6585,
    longitude: 139.7454,
    departments: ['surgery', 'orthopedics'],
    supportedLanguages: ['ja', 'en'],
    isOpenNow: true,
    hasHolidayService: true,
    walkInAllowed: false, // Emergency only
    emergencyAccepted: true,
    updatedAt: '2026-06-12',
    dataSource: '救急医療情報システム (モック)'
  }
];
