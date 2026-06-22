"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { departments } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle, Search, Clock, Stethoscope, Languages,
  Shield, CreditCard, CheckCircle, ArrowRight, ChevronRight,
} from 'lucide-react';

const DEPT_ICONS: Record<string, string> = {
  internal:      '🩺',
  surgery:       '🔬',
  pediatrics:    '👶',
  orthopedics:   '🦴',
  dermatology:   '🌿',
  ophthalmology: '👁️',
  ent:           '👂',
  obgyn:         '🤱',
  psychiatry:    '🧠',
  urology:       '💊',
};

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文',    flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const ADVANTAGES = [
  { icon: '✅', ja: '確認済みデータ', en: 'Verified Data',   descJa: '直接電話＋AI確認',       descEn: 'Phone + AI verified'   },
  { icon: '🌐', ja: '多言語対応',     en: 'Multilingual',    descJa: '英・中・韓・スペイン語',  descEn: 'EN · ZH · KO · ES'     },
  { icon: '🕐', ja: 'リアルタイム',   en: 'Real-time Hours', descJa: '診療時間を正確表示',      descEn: 'Accurate time slots'   },
  { icon: '🗺️', ja: '東京全域',       en: 'All Tokyo',       descJa: '4,430施設カバー',         descEn: '4,430 clinics covered' },
];

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();

  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [openNow,      setOpenNow]      = useState(false);
  const [englishToday, setEnglishToday] = useState(false);
  const [creditCard,   setCreditCard]   = useState(false);
  const [insurance,    setInsurance]    = useState(false);
  const [nightWeekend, setNightWeekend] = useState(false);
  const [walkIn,       setWalkIn]       = useState(false);
  const [verified,     setVerified]     = useState(false);
  const [showMore,     setShowMore]     = useState(false);

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (selectedDept)  p.set('dept',         selectedDept);
    if (selectedLang)  p.set('lang',         selectedLang);
    if (openNow)       p.set('open',         'true');
    if (englishToday)  p.set('engtoday',     'true');
    if (creditCard)    p.set('card',         'true');
    if (insurance)     p.set('insurance',    'true');
    if (nightWeekend)  p.set('nightweekend', 'true');
    if (walkIn)        p.set('walkin',       'true');
    if (verified)      p.set('verified',     'true');
    router.push(`/hospitals?${p}`);
  };

  const quickSearch = (params: Record<string, string>) =>
    router.push(`/hospitals?${new URLSearchParams(params)}`);

  const toggleDept = (id: string)   => setSelectedDept(v => v === id   ? '' : id);
  const toggleLang = (code: string) => setSelectedLang(v => v === code ? '' : code);

  const deptLabel = (d: typeof departments[0]) =>
    (d.name[language as keyof typeof d.name] as string) || d.name.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16 space-y-10">

      {/* ── 1. TITLE ── */}
      <div className="text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200/80 rounded-full px-3.5 py-1 text-xs font-bold text-brand-700 shadow-xs">
            東京 · 4,430施設 · 厚生労働省オープンデータ
          </span>
          <span className="inline-flex items-center gap-1.5 bg-accent-50 border border-accent-200 rounded-full px-3.5 py-1 text-xs font-bold text-accent-700 shadow-xs">
            <CheckCircle className="w-3.5 h-3.5 text-accent-600" />
            確認済みクリニック収録
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Tokyo <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">Med Finder</span>
        </h1>
        <p className="text-base text-slate-500 font-semibold">
          外国人旅行者のための東京医療機関検索
        </p>
      </div>

      {/* ── 2. 医療機関を探す ── */}
      <div className="glass-panel rounded-3xl shadow-xl shadow-indigo-100/40 border border-slate-200/40 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-5 sm:px-8 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl text-white">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('search.title')}</h2>
        </div>

        <div className="p-6 sm:p-8 space-y-7">

          {/* ── 1タップ クイック検索 ── */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => quickSearch({ open: 'true' })}
              className="group flex items-center gap-2.5 bg-accent-50 border border-accent-200 rounded-2xl px-4 py-3.5 hover:bg-accent-100 active:scale-95 transition-all text-left"
            >
              <Clock className="w-5 h-5 text-accent-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-accent-700 leading-tight">今すぐ開いている</p>
                <p className="text-xs text-accent-500 font-semibold mt-0.5">Open Now</p>
              </div>
              <ChevronRight className="w-4 h-4 text-accent-300 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => quickSearch({ lang: 'en', open: 'true' })}
              className="group flex items-center gap-2.5 bg-brand-50 border border-brand-200 rounded-2xl px-4 py-3.5 hover:bg-brand-100 active:scale-95 transition-all text-left"
            >
              <Languages className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-brand-700 leading-tight">英語対応 · 開院中</p>
                <p className="text-xs text-brand-400 font-semibold mt-0.5">English · Open Now</p>
              </div>
              <ChevronRight className="w-4 h-4 text-brand-300 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-slate-100" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">または条件を絞り込む</span>
            <div className="flex-1 border-t border-slate-100" />
          </div>

          {/* Open Now toggle */}
          <button
            onClick={() => setOpenNow(v => !v)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
              openNow ? 'bg-accent-50 border-accent-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`relative w-10 h-[22px] rounded-full transition-colors flex-shrink-0 ${openNow ? 'bg-accent-500' : 'bg-slate-300'}`}>
              <div className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-all ${openNow ? 'left-[22px]' : 'left-[3px]'}`} />
            </div>
            <Clock className={`w-4 h-4 ${openNow ? 'text-accent-600' : 'text-slate-400'}`} />
            <span className={`text-sm font-bold ${openNow ? 'text-accent-700' : 'text-slate-600'}`}>{t('filter.openNow')}</span>
          </button>

          {/* Department tiles */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-brand-500" />
              {t('search.department')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {departments.map(d => (
                <button
                  key={d.id}
                  onClick={() => toggleDept(d.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all active:scale-95 ${
                    selectedDept === d.id
                      ? 'bg-brand-50 border-brand-400 text-brand-700 shadow-sm'
                      : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="text-lg leading-none flex-shrink-0">{DEPT_ICONS[d.id]}</span>
                  <span className="text-xs font-bold truncate">{deptLabel(d)}</span>
                  {selectedDept === d.id && (
                    <CheckCircle className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-brand-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Language pills */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-brand-500" />
              {t('search.language')}
            </p>
            <div className="flex flex-wrap gap-2">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => toggleLang(l.code)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                    selectedLang === l.code
                      ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced filters — collapsed */}
          <div>
            <button
              onClick={() => setShowMore(v => !v)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMore ? 'rotate-90' : ''}`} />
              {showMore ? '詳細フィルターを閉じる' : '詳細フィルターを表示'}
            </button>

            {showMore && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {[
                  { state: verified,     set: setVerified,     icon: <CheckCircle className="w-4 h-4 flex-shrink-0" />, label: t('filter.verified')     },
                  { state: englishToday, set: setEnglishToday, icon: <Languages   className="w-4 h-4 flex-shrink-0" />, label: t('filter.englishToday') },
                  { state: creditCard,   set: setCreditCard,   icon: <CreditCard  className="w-4 h-4 flex-shrink-0" />, label: t('filter.creditCard')   },
                  { state: insurance,    set: setInsurance,    icon: <Shield      className="w-4 h-4 flex-shrink-0" />, label: t('filter.insurance')    },
                  { state: nightWeekend, set: setNightWeekend, icon: <Clock       className="w-4 h-4 flex-shrink-0" />, label: t('filter.nightWeekend') },
                  { state: walkIn,       set: setWalkIn,       icon: <Stethoscope className="w-4 h-4 flex-shrink-0" />, label: t('filter.walkIn')       },
                ].map(({ state, set, icon, label }, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border cursor-pointer transition-all select-none ${
                      state
                        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'
                    }`}
                  >
                    <input type="checkbox" className="sr-only" checked={state} onChange={e => set(e.target.checked)} />
                    <span className={state ? 'text-brand-600' : 'text-slate-400'}>{icon}</span>
                    <span className="text-xs font-bold truncate">{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all outline-none cursor-pointer"
          >
            <Search className="w-5 h-5" />
            {t('btn.search')}
          </button>
        </div>
      </div>

      {/* ── 3. 緊急ですか？ ── */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-emergency-600" />
          <h2 className="text-xl font-extrabold text-slate-900">
            緊急ですか？ <span className="text-emergency-600 font-bold text-lg">/ Emergency?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 119 — Ambulance */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emergency-600 to-rose-700 text-white p-6 rounded-3xl shadow-lg border border-emergency-500/20 hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Ambulance / Fire</span>
                <AlertCircle className="w-5 h-5 opacity-80" />
              </div>
              <h3 className="text-xl font-bold">{t('emergency.title')}</h3>
              <p className="text-xs text-rose-100 font-medium leading-relaxed">
                {t('emergency.desc')}
              </p>
            </div>
            <div className="pt-5 flex gap-3">
              <a href="tel:119" className="flex-grow inline-flex items-center justify-center py-2.5 px-4 text-sm font-extrabold rounded-2xl bg-white text-emergency-600 hover:bg-rose-50 transition-all shadow-md shadow-rose-900/10">
                Call 119
              </a>
              <Link href="/emergency" className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/10 text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* #7119 — Consultation */}
          <div className="relative overflow-hidden bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">救急相談</span>
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t('emergency.consultation')}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {t('emergency.consultationDesc')}
              </p>
            </div>
            <div className="pt-5 flex gap-3">
              <a href="tel:7119" className="flex-grow inline-flex items-center justify-center py-2.5 px-4 text-sm font-extrabold rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-md shadow-amber-100">
                Call #7119
              </a>
              <Link href="/emergency" className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/50 transition-all">
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. CORE ADVANTAGE ── */}
      <div className="space-y-5">
        <div className="text-center">
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-400">
            Core Advantage
          </span>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700/30">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-28 h-28 bg-brand-500/10 rounded-full blur-2xl" />
          <p className="text-sm font-semibold text-slate-200 leading-relaxed relative z-10 mb-4">
            {t('trust.banner')}
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            <span className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300">📞 Phone Verified</span>
            <span className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300">🤖 AI Interviewed</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ADVANTAGES.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
              <span className="text-2xl leading-none">{item.icon}</span>
              <p className="text-sm font-extrabold text-slate-800">
                {language === 'ja' ? item.ja : item.en}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'ja' ? item.descJa : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
