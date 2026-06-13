"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { initialHospitals } from '@/data/mockHospitals';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft, CheckCircle, CreditCard, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

function HospitalsContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const filteredHospitals = initialHospitals.filter(h => {
    if (deptFilter && !h.departments.includes(deptFilter)) return false;
    if (langFilter && !h.supportedLanguages.includes(langFilter as any)) return false;
    if (openNowFilter && !h.isOpenNow) return false;
    
    // Advanced filters
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

  if (!isClient) return null; // Avoid hydration mismatch on useSearchParams

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Navigation & Pilot Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Search
        </Link>
        
        {/* Pilot Verification Progress Bar (Pitch deck feature) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">Shinjuku Verification Status:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
              <div className="bg-brand-600 h-full rounded-full" style={{ width: '32%' }}></div>
            </div>
            <span className="text-xs font-extrabold text-brand-600">32 / 100 verified (32%)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Hospital List */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {filteredHospitals.length} <span className="text-slate-500 font-medium text-lg">Clinics Found</span>
            </h1>
          </div>
          
          <div className="overflow-y-auto max-h-[750px] pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {filteredHospitals.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-3xl p-8 text-center text-slate-500 font-medium">
                No clinics found matching your criteria in Shinjuku-ku.
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
                      ) : hospital.verification.status === 'in_progress' ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> Verifying...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-slate-200">
                          Open Data Source
                        </span>
                      )}
                      
                      {hospital.verification.lastConfirmedAt && (
                        <span className="text-[10px] font-bold text-slate-400">
                          Confirmed: {hospital.verification.lastConfirmedAt}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className="text-lg font-bold leading-snug text-slate-900 hover:text-brand-600 transition-colors">
                        {hospital.name[language] || hospital.name.en}
                      </h2>
                      {hospital.emergencyAccepted && (
                        <span className="inline-flex items-center gap-1 bg-emergency-50 text-emergency-700 text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap border border-emergency-200">
                          <AlertTriangle className="w-3.5 h-3.5" /> Emergency
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-4 space-y-2">
                      <p className="flex items-start gap-2.5">
                        <MapPin className="w-4.5 h-4.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span>{hospital.address[language] || hospital.address.en}</span>
                      </p>
                      
                      {hospital.verification.status === 'verified' && (
                        <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          Verified via: <span className="text-slate-700 underline">{getVerificationMethodLabel(hospital.verification.confirmedBy)}</span>
                        </p>
                      )}
                    </div>

                    <div className="mb-4 pt-3 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Departments</p>
                      <p className="text-sm text-slate-700 font-semibold">{getDeptNames(hospital.departments)}</p>
                    </div>

                    {/* Extended Feature Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hospital.accessInfo.englishSupportToday ? (
                        <span className="bg-brand-50 text-brand-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-brand-100 uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> English Today
                        </span>
                      ) : (
                        <span className="bg-slate-50 text-slate-400 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200 uppercase">
                          No English Today
                        </span>
                      )}

                      {hospital.accessInfo.creditCardAccepted && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> Credit Card OK
                        </span>
                      )}

                      {hospital.accessInfo.overseasInsuranceAccepted && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200 flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Insurance Docs OK
                        </span>
                      )}

                      {hospital.accessInfo.walkInAvailable && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">
                          Walk-in OK
                        </span>
                      )}

                      {(hospital.accessInfo.nightOpen || hospital.accessInfo.weekendOpen) && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">
                          Night / Weekend
                        </span>
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
              Google Maps integration will render here. In production, it displays the {filteredHospitals.length} filtered clinics with verified indicators, live English support status, and route navigation.
            </p>
            <div className="pt-4">
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-xs font-semibold text-slate-300">
                Pilot Area Shinjuku Sandbox
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
