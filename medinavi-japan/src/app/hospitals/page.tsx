"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Hospital, Language, departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft, CheckCircle, CreditCard, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

function HospitalsContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/clinics.json')
      .then(r => r.json())
      .then((data: Hospital[]) => {
        const now = new Date();
        const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const todayKey = dayKeys[now.getDay()];
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const updated = data.map(h => {
          // 休診曜日チェック
          if (h.closedDays?.[todayKey]) return { ...h, isOpenNow: false };
          // 診療時間チェック（複数コマ対応）
          const todaySlots = h.openingHours?.[todayKey];
          if (todaySlots && todaySlots.length > 0) {
            const isOpen = todaySlots.some(slot => {
              const [sh, sm] = slot.start.split(':').map(Number);
              const [eh, em] = slot.end.split(':').map(Number);
              return nowMinutes >= sh * 60 + sm && nowMinutes <= eh * 60 + em;
            });
            return { ...h, isOpenNow: isOpen };
          }
          // 休診でなく時間データもない場合は開院とみなす
          return { ...h, isOpenNow: true };
        });
        setHospitals(updated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter params
  const deptFilter = searchParams.get('dept');
  const langFilter = searchParams.get('lang');
  const openNowFilter = searchParams.get('open') === 'true';
  const engTodayFilter = searchParams.get('engtoday') === 'true';
  const cardFilter = searchParams.get('card') === 'true';
  const insuranceFilter = searchParams.get('insurance') === 'true';
  const nightWeekendFilter = searchParams.get('nightweekend') === 'true';
  const walkInFilter = searchParams.get('walkin') === 'true';
  const verifiedFilter = searchParams.get('verified') === 'true';

  const filteredHospitals = hospitals.filter(h => {
    if (deptFilter && h.departments.length > 0 && !h.departments.includes(deptFilter)) return false;
    if (langFilter && !h.supportedLanguages.includes(langFilter as Language)) return false;  // eslint-disable-line @typescript-eslint/no-explicit-any
    if (openNowFilter && !h.isOpenNow) return false;
    if (engTodayFilter && !h.accessInfo.englishSupportToday) return false;
    if (cardFilter && !h.accessInfo.creditCardAccepted) return false;
    if (insuranceFilter && !h.accessInfo.overseasInsuranceAccepted) return false;
    if (nightWeekendFilter && !h.accessInfo.nightOpen && !h.accessInfo.weekendOpen) return false;
    if (walkInFilter && !h.accessInfo.walkInAvailable) return false;
    if (verifiedFilter && h.verification.status !== 'verified') return false;
    return true;
  });

  const getDeptNames = (deptIds: string[]) => {
    return deptIds.map(id => {
      const d = departments.find(d => d.id === id);
      return d ? (d.name[language as keyof typeof d.name] || d.name.en) : id;
    }).join(', ');
  };

  const getVerificationMethodLabel = (method?: string) => {
    switch(method) {
      case 'phone': return 'Direct Phone Call';
      case 'ai_interview': return 'AI Phone Interview';
      case 'manual_visit': return 'Manual Site Visit';
      case 'official_website': return 'Official Website';
      default: return 'Open Data Directory';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 font-semibold">
        Loading clinics...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Navigation & Data Source Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Search
        </Link>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">Tokyo Foreign-Language Clinics:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-brand-600">{hospitals.length.toLocaleString()} clinics · 厚生労働省 Open Data</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Hospital List */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {filteredHospitals.length.toLocaleString()} <span className="text-slate-500 font-medium text-lg">Clinics Found</span>
            </h1>
          </div>

          <div className="overflow-y-auto max-h-[750px] pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {filteredHospitals.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-3xl p-8 text-center text-slate-500 font-medium">
                No clinics found matching your criteria.
              </div>
            ) : (
              filteredHospitals.map(hospital => (
                <Link key={hospital.id} href={`/hospitals/${hospital.id}`} className="block">
                  <div className={`hover-lift bg-white rounded-3xl border p-6 transition-all ${hospital.verification.status === 'verified' ? 'border-brand-200 bg-brand-50/5' : 'border-slate-200/80 shadow-xs'}`}>

                    {/* Upper Verification & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      {hospital.verification.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 text-xs px-2.5 py-1 rounded-full font-bold border border-accent-200">
                          <CheckCircle className="w-3.5 h-3.5 text-accent-600" /> Verified Data
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-slate-200">
                          Open Data Source
                        </span>
                      )}

                      {hospital.verification.lastConfirmedAt && (
                        <span className="text-[10px] font-bold text-slate-400">
                          Updated: {hospital.updatedAt}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className="text-lg font-bold leading-snug text-slate-900 hover:text-brand-600 transition-colors">
                        {hospital.name[language] || hospital.name.en || hospital.name.ja}
                      </h2>
                      {hospital.emergencyAccepted && (
                        <span className="inline-flex items-center gap-1 bg-emergency-50 text-emergency-700 text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap border border-emergency-200">
                          <AlertTriangle className="w-3.5 h-3.5" /> Emergency
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-slate-600 mb-4 space-y-2">
                      <p className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span>{hospital.address[language] || hospital.address.ja}</span>
                      </p>
                    </div>

                    {/* Language badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hospital.supportedLanguages.includes('en') && (
                        <span className="bg-brand-50 text-brand-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-brand-100 uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> EN
                        </span>
                      )}
                      {hospital.supportedLanguages.includes('zh') && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">ZH</span>
                      )}
                      {hospital.supportedLanguages.includes('ko') && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">KO</span>
                      )}
                      {hospital.supportedLanguages.includes('es') && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">ES</span>
                      )}
                      {hospital.isOpenNow && (
                        <span className="bg-accent-50 text-accent-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-accent-100">Open Today</span>
                      )}
                      {hospital.accessInfo.weekendOpen && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">Weekend</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="w-full lg:w-1/2 h-[450px] lg:h-[750px] relative overflow-hidden bg-slate-950 rounded-3xl flex items-center justify-center border border-slate-800 shadow-lg shadow-slate-950/20">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute w-96 h-96 rounded-full bg-brand-500/10 blur-3xl -top-20 -right-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-accent-500/5 blur-3xl -bottom-20 -left-20"></div>

          <div className="text-center p-8 relative z-10 max-w-md space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-brand-600 to-indigo-500 text-white rounded-3xl shadow-xl shadow-brand-500/20 animate-bounce">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive Map Area</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Google Maps integration will render here. In production, it displays the {filteredHospitals.length.toLocaleString()} filtered clinics with verified indicators, live English support status, and route navigation.
            </p>
            <div className="pt-4">
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-xs font-semibold text-slate-300">
                Tokyo · {hospitals.length.toLocaleString()} clinics loaded
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Hospitals() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold">Loading hospitals...</div>}>
      <HospitalsContent />
    </Suspense>
  );
}
