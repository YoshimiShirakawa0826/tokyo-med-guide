"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { departments } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Search, Clock, Calendar, Stethoscope, Languages, ArrowRight } from 'lucide-react';

export default function Home() {
  const { language, t } = useLanguage();
  const router = useRouter();
  
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [openNow, setOpenNow] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [walkIn, setWalkIn] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedDept) params.set('dept', selectedDept);
    if (selectedLang) params.set('lang', selectedLang);
    if (openNow) params.set('open', 'true');
    if (holiday) params.set('holiday', 'true');
    if (walkIn) params.set('walkin', 'true');
    
    router.push(`/hospitals?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Find the Right Medical Care <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">Anywhere in Japan</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          A multilingual navigation tool designed for tourists and expats to search open clinics, check language support, and get step-by-step navigation.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emergency-50 to-orange-50 border border-emergency-500/20 p-6 sm:p-8 rounded-3xl shadow-lg shadow-rose-100/50 hover:shadow-xl transition-shadow duration-300">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-emergency-500/5 rounded-full blur-xl"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
          <div className="bg-emergency-600 text-white p-3 rounded-2xl shadow-md shadow-rose-200">
            <AlertCircle className="h-7 w-7" />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-slate-800 mb-1">{t('emergency.title')}</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{t('emergency.desc')}</p>
          </div>
          <Link 
            href="/emergency"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-2xl text-white bg-emergency-600 hover:bg-emergency-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-rose-200/50"
          >
            {t('nav.emergency')} <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
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

          {/* Checkboxes */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Filters</span>
            <div className="flex flex-wrap gap-4">
              <label className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${openNow ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={openNow}
                  onChange={(e) => setOpenNow(e.target.checked)}
                />
                <Clock className={`w-4 h-4 ${openNow ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-sm font-semibold">{t('filter.openNow')}</span>
              </label>
              
              <label className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${holiday ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={holiday}
                  onChange={(e) => setHoliday(e.target.checked)}
                />
                <Calendar className={`w-4 h-4 ${holiday ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-sm font-semibold">{t('filter.holiday')}</span>
              </label>
              
              <label className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${walkIn ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-indigo-100' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/40'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={walkIn}
                  onChange={(e) => setWalkIn(e.target.checked)}
                />
                <Stethoscope className={`w-4 h-4 ${walkIn ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-sm font-semibold">{t('filter.walkIn')}</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              onClick={handleSearch}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all outline-none"
            >
              {t('btn.search')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
