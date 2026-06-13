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
    'filter.openNow': '現在開院中',
    'filter.holiday': '休日診療あり',
    'filter.walkIn': '予約不要（Walk-in）',
    'emergency.title': '緊急の方へ',
    'emergency.desc': '命に関わる緊急症状がある場合は、すぐに119番に電話してください。',
    'btn.search': 'この条件で探す',
    'footer.disclaimer': '※当アプリは診断を行うものではありません。受診先の目安としてご利用ください。',
    'nav.home': 'ホーム',
    'nav.hospitals': '医療機関一覧',
    'nav.emergency': '緊急時ガイド',
  },
  en: {
    'app.name': 'MediNavi JAPAN',
    'search.title': 'Find Medical Institutions',
    'search.department': 'Search by Department',
    'search.language': 'Search by Language',
    'filter.openNow': 'Open Now',
    'filter.holiday': 'Holiday Service',
    'filter.walkIn': 'Walk-in Allowed',
    'emergency.title': 'In Case of Emergency',
    'emergency.desc': 'If you have life-threatening symptoms, call 119 immediately.',
    'btn.search': 'Search',
    'footer.disclaimer': '* This app does not provide medical diagnosis. Use for reference only.',
    'nav.home': 'Home',
    'nav.hospitals': 'Hospitals',
    'nav.emergency': 'Emergency',
  },
  zh: {
    'app.name': 'MediNavi JAPAN',
    'search.title': '查找医疗机构',
    'search.department': '按科室查找',
    'search.language': '按语言查找',
    'filter.openNow': '目前营业',
    'filter.holiday': '节假日门诊',
    'filter.walkIn': '无需预约',
    'emergency.title': '紧急情况',
    'emergency.desc': '如果您有生命危险的症状，请立即拨打119。',
    'btn.search': '搜索',
    'footer.disclaimer': '* 本应用不提供医疗诊断。仅供参考。',
    'nav.home': '首页',
    'nav.hospitals': '医院列表',
    'nav.emergency': '紧急指南',
  },
  ko: {
    'app.name': 'MediNavi JAPAN',
    'search.title': '의료기관 찾기',
    'search.department': '진료과 검색',
    'search.language': '언어 검색',
    'filter.openNow': '현재 진료중',
    'filter.holiday': '휴일 진료',
    'filter.walkIn': '예약 불필요',
    'emergency.title': '응급상황인 경우',
    'emergency.desc': '생명이 위급한 증상이 있는 경우 즉시 119로 전화하십시오.',
    'btn.search': '검색',
    'footer.disclaimer': '* 이 앱은 의료 진단을 제공하지 않습니다. 참고용으로만 사용하십시오.',
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
