"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ja: {
    'app.name': 'MediNavi JAPAN',
    'search.title': '医療機関を探す',
    'search.department': '診療科から探す',
    'search.language': '対応言語から探す',
    
    // Filters
    'filter.openNow': '現在開院中',
    'filter.holiday': '休日診療あり',
    'filter.walkIn': '予約不要（Walk-in）',
    'filter.englishToday': '本日の英語対応',
    'filter.creditCard': 'クレカ・キャッシュレス決済',
    'filter.insurance': '海外旅行保険・書類対応',
    'filter.nightWeekend': '夜間・休日診療',
    'filter.verified': '確認済みデータのみ',

    // Trust & Shinjuku Pilot
    'trust.pilotArea': '実証実験エリア: 東京都新宿区',
    'trust.banner': 'オープンデータだけではありません。MediNavi JAPANは直接の電話、AIインタビュー、地域医療連携により、真の受診可否を確認しています。',
    'trust.stats': '確認済みクリニック: 新宿区内 32 / 100 件',
    'trust.badge': '検証済みデータ',
    'trust.lastConfirmed': '最終確認日',
    'trust.method': '確認方法',

    // Emergency UI
    'emergency.title': '緊急ですか？ 119番へ発信',
    'emergency.desc': '命に関わる症状や、救急車が必要な重症の場合は、ただちに119番にダイヤルしてください。通訳対応可能です。',
    'emergency.consultation': '救急相談は #7119 へ',
    'emergency.consultationDesc': '救急車を呼ぶべきか判断に迷う場合は、#7119の救急相談窓口で専門医や看護師のアドバイスを受けられます。',
    'emergency.location': '現在地を表示する',
    'emergency.phrases': '救急時の日本語フレーズ',
    'emergency.sayThis': '落ち着いて、電話口で以下を伝えてください：',
    
    'btn.search': 'この条件で探す',
    'footer.disclaimer': '※当アプリは診断を行うものではありません。受診先の目安としてご利用ください。実際の受診前には直接お電話等でご確認ください。',
    'nav.home': 'ホーム',
    'nav.hospitals': '医療機関一覧',
    'nav.emergency': '緊急時ガイド',
  },
  en: {
    'app.name': 'MediNavi JAPAN',
    'search.title': 'Find Medical Institutions',
    'search.department': 'Search by Department',
    'search.language': 'Search by Language',
    
    // Filters
    'filter.openNow': 'Open Now',
    'filter.holiday': 'Holiday Service',
    'filter.walkIn': 'Walk-in Allowed',
    'filter.englishToday': 'Real-time English Support',
    'filter.creditCard': 'Credit Card / Cashless',
    'filter.insurance': 'Overseas Insurance Accepted',
    'filter.nightWeekend': 'Night / Weekend Open',
    'filter.verified': 'Verified Data Only',

    // Trust & Shinjuku Pilot
    'trust.pilotArea': 'Pilot Area: Shinjuku-ku, Tokyo',
    'trust.banner': 'Not just open data. MediNavi JAPAN verifies real clinic access through direct calls, AI interviews, and local medical partnerships.',
    'trust.stats': 'Verified Clinics: 32 / 100 in Shinjuku',
    'trust.badge': 'Verified Data',
    'trust.lastConfirmed': 'Last Confirmed',
    'trust.method': 'Confirmed By',

    // Emergency UI
    'emergency.title': 'Emergency? Call 119',
    'emergency.desc': 'If you have life-threatening symptoms and need an ambulance immediately, dial 119. Multilingual support may be available through interpretation.',
    'emergency.consultation': 'Call #7119 for Emergency Consultation',
    'emergency.consultationDesc': 'If you are not sure whether to call an ambulance, dial #7119 for professional medical advice.',
    'emergency.location': 'Show My Current Location',
    'emergency.phrases': 'What to say in an emergency',
    'emergency.sayThis': 'Stay calm. Tell the operator:',
    
    'btn.search': 'Search',
    'footer.disclaimer': '* This app does not provide medical diagnosis. Use for reference only. Always confirm directly before visiting.',
    'nav.home': 'Home',
    'nav.hospitals': 'Hospitals',
    'nav.emergency': 'Emergency Guide',
  },
  zh: {
    'app.name': 'MediNavi JAPAN',
    'search.title': '查找医疗机构',
    'search.department': '按科室查找',
    'search.language': '按语言查找',
    
    // Filters
    'filter.openNow': '目前营业',
    'filter.holiday': '节假日门诊',
    'filter.walkIn': '无需预约',
    'filter.englishToday': '今日英语服务',
    'filter.creditCard': '信用卡/无现金支付',
    'filter.insurance': '接受海外保险',
    'filter.nightWeekend': '夜间/周末门诊',
    'filter.verified': '仅限已确认数据',

    // Trust & Shinjuku Pilot
    'trust.pilotArea': '实证实验区域: 东京都新宿区',
    'trust.banner': '不仅是开放数据。MediNavi JAPAN通过直接电话、AI面谈和地方医疗合作验证真实的就医可及性。',
    'trust.stats': '新宿区已确认诊所: 32 / 100',
    'trust.badge': '已验证数据',
    'trust.lastConfirmed': '最后确认日',
    'trust.method': '确认方法',

    // Emergency UI
    'emergency.title': '紧急情况？请拨打 119',
    'emergency.desc': '如果您有危及生命的症状且需要救护车，请立即拨打119。可通过口译获得多语言支持。',
    'emergency.consultation': '拨打 #7119 咨询紧急情况',
    'emergency.consultationDesc': '如果您不确定是否要叫救护车，请拨打#7119获取专业医疗建议。',
    'emergency.location': '显示我的当前位置',
    'emergency.phrases': '紧急情况下的日语常用语',
    'emergency.sayThis': '请保持冷静。告诉接线员：',
    
    'btn.search': '搜索',
    'footer.disclaimer': '* 本应用不提供医疗诊断。仅供参考。就诊前请务必直接确认。',
    'nav.home': '首页',
    'nav.hospitals': '医院列表',
    'nav.emergency': '紧急指南',
  },
  ko: {
    'app.name': 'MediNavi JAPAN',
    'search.title': '의료기관 찾기',
    'search.department': '진료과 검색',
    'search.language': '언어 검색',
    
    // Filters
    'filter.openNow': '현재 진료중',
    'filter.holiday': '휴일 진료',
    'filter.walkIn': '예약 불필요',
    'filter.englishToday': '오늘 영어 지원',
    'filter.creditCard': '신용카드/간편결제',
    'filter.insurance': '해외 여행자보험 대응',
    'filter.nightWeekend': '야간/주말 진료',
    'filter.verified': '인증된 데이터만',

    // Trust & Shinjuku Pilot
    'trust.pilotArea': '실증실험 구역: 도쿄도 신주쿠구',
    'trust.banner': '단순한 오픈 데이터가 아닙니다. MediNavi JAPAN은 직접 전화, AI 인터뷰, 지역 의료 연계를 통해 실제 진료 가능 여부를 검증합니다.',
    'trust.stats': '신주쿠 검증 완료 클리닉: 32 / 100건',
    'trust.badge': '검증된 데이터',
    'trust.lastConfirmed': '최종 확인일',
    'trust.method': '확인 방법',

    // Emergency UI
    'emergency.title': '응급상황인가요? 119로 전화',
    'emergency.desc': '생명이 위독한 증상이 있고 즉시 구급차가 필요한 경우 119로 전화하십시오. 통역 서비스 이용이 가능할 수 있습니다.',
    'emergency.consultation': '응급상담은 #7119로',
    'emergency.consultationDesc': '구급차를 불러야 할지 고민되는 경우, #7119로 전화하여 전문가의 의학적 조언을 받으실 수 있습니다.',
    'emergency.location': '현재 위치 표시',
    'emergency.phrases': '응급 시 유용한 일본어 표현',
    'emergency.sayThis': '차분하게 상담원에게 전달하십시오:',
    
    'btn.search': '검색',
    'footer.disclaimer': '* 이 앱은 의료 진단을 제공하지 않습니다. 참고용으로만 사용해 주십시오. 방문 전 반드시 직접 확인하시기 바랍니다.',
    'nav.home': '홈',
    'nav.hospitals': '병원 목록',
    'nav.emergency': '응급 가이드',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['ja']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
