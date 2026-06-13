"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { departments } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Search, Clock, Calendar, Stethoscope, Languages, Shield, CreditCard, CheckCircle, ArrowRight, MapPin, Sparkles } from 'lucide-react';

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();
  
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [openNow, setOpenNow] = useState(false);
  const [englishToday, setEnglishToday] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [nightWeekend, setNightWeekend] = useState(false);
  const [walkIn, setWalkIn] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedDept) params.set('dept', selectedDept);
    if (selectedLang) params.set('lang', selectedLang);
    if (openNow) params.set('open', 'true');
    if (englishToday) params.set('engtoday', 'true');
    if (creditCard) params.set('card', 'true');
    if (insurance) params.set('insurance', 'true');
    if (nightWeekend) params.set('nightweekend', 'true');
    if (walkIn) params.set('walkin', 'true');
    if (verified) params.set('verified', 'true');
    
    router.push(`/hospitals?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16 space-y-10">
      
      {/* Pilot Area & Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200/80 rounded-full px-3.5 py-1 text-xs font-bold text-brand-700 shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          {t('trust.pilotArea')}
        </div>
        <div className="inline-flex items-center gap-1.5 bg-accent-50 border border-accent-200 rounded-full px-3.5 py-1 text-xs font-bold text-accent-700 shadow-xs">
          <CheckCircle className="w-3.5 h-3.5 text-accent-600" />
          {t('trust.stats')}
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Reliable Medical Access <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">Verified for Foreigners</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-semibold leading-relaxed">
          Search Shinjuku clinics with verified credit card support, real-time English capability, and emergency procedures.
        </p>
      </div>

      {/* Trust Signal Bar (Pitch Deck Value Proposition) */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-28 h-28 bg-brand-500/10 rounded-full blur-2xl"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-300">
              <Sparkles className="w-3 h-3" /> Core Advantage
            </span>
            <p className="text-sm font-semibold text-slate-200 leading-relaxed">
              {t('trust.banner')}
            </p>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <span className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 whitespace-nowrap">
              📞 Phone Verified
            </span>
            <span className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 whitespace-nowrap">
              🤖 AI Interviewed
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Split Action Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Ambulance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emergency-600 to-rose-700 text-white p-6 rounded-3xl shadow-lg border border-emergency-500/20 hover:shadow-xl transition-shadow flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Ambulance / Fire</span>
              <AlertCircle className="w-5 h-5 opacity-80" />
            </div>
            <h2 className="text-xl font-bold">{t('emergency.title')}</h2>
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

        {/* Consultation Card */}
        <div className="relative overflow-hidden bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Emergency Advice</span>
              <Sparkles className="w-5 h-5 text-brand-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t('emergency.consultation')}</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {t('emergency.consultationDesc')}
            </p>
          </div>
          <div className="pt-5 flex gap-3">
            <a href="tel:7119" className="flex-grow inline-flex items-center justify-center py-2.5 px-4 text-sm font-extrabold rounded-2xl bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-md shadow-indigo-100">
              Call #7119
            </a>
            <Link href="/emergency" className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/50 transition-all">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="glass-panel rounded-3xl shadow-xl shadow-indigo-100/40 border border-slate-200/40 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-5 sm:px-8 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl text-white">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {t('search.title')}
          </h2>
        </div>
        
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-brand-500" />
                {t('search.department')}
              </label>
              <div className="relative">
                <select 
                  className="w-full pl-4 pr-10 py-3 text-sm bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">Any Department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name[language as keyof typeof d.name] || d.name.en}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Languages className="w-4 h-4 text-brand-500" />
                {t('search.language')}
              </label>
              <div className="relative">
                <select 
                  className="w-full pl-4 pr-10 py-3 text-sm bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                >
                  <option value="">Any Language</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="ko">한국어</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Access & Trust Filters</span>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Verified Only */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${verified ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm shadow-emerald-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
                <CheckCircle className={`w-4 h-4 flex-shrink-0 ${verified ? 'text-accent-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.verified')}</span>
              </label>

              {/* English Support Today */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${englishToday ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={englishToday} onChange={(e) => setEnglishToday(e.target.checked)} />
                <Languages className={`w-4 h-4 flex-shrink-0 ${englishToday ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.englishToday')}</span>
              </label>

              {/* Credit Card Accepted */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${creditCard ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={creditCard} onChange={(e) => setCreditCard(e.target.checked)} />
                <CreditCard className={`w-4 h-4 flex-shrink-0 ${creditCard ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.creditCard')}</span>
              </label>

              {/* Overseas Insurance Accepted */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${insurance ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} />
                <Shield className={`w-4 h-4 flex-shrink-0 ${insurance ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.insurance')}</span>
              </label>

              {/* Night & Weekend Open */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${nightWeekend ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={nightWeekend} onChange={(e) => setNightWeekend(e.target.checked)} />
                <Clock className={`w-4 h-4 flex-shrink-0 ${nightWeekend ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.nightWeekend')}</span>
              </label>

              {/* Walk-in Available */}
              <label className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border transition-all cursor-pointer select-none ${walkIn ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input type="checkbox" className="sr-only" checked={walkIn} onChange={(e) => setWalkIn(e.target.checked)} />
                <Stethoscope className={`w-4 h-4 flex-shrink-0 ${walkIn ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{t('filter.walkIn')}</span>
              </label>
            </div>
            
            {/* Simple Open Now Filter */}
            <div className="flex items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500 cursor-pointer"
                  checked={openNow}
                  onChange={(e) => setOpenNow(e.target.checked)}
                />
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {t('filter.openNow')}
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              onClick={handleSearch}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all outline-none cursor-pointer"
            >
              {t('btn.search')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
