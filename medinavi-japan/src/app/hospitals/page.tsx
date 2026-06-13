"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { initialHospitals } from '@/data/mockHospitals';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

function HospitalsContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const deptFilter = searchParams.get('dept');
  const langFilter = searchParams.get('lang');
  const openNowFilter = searchParams.get('open') === 'true';
  const holidayFilter = searchParams.get('holiday') === 'true';
  const walkInFilter = searchParams.get('walkin') === 'true';

  const filteredHospitals = initialHospitals.filter(h => {
    if (deptFilter && !h.departments.includes(deptFilter)) return false;
    if (langFilter && !h.supportedLanguages.includes(langFilter as any)) return false;
    if (openNowFilter && !h.isOpenNow) return false;
    if (holidayFilter && !h.hasHolidayService) return false;
    if (walkInFilter && !h.walkInAllowed) return false;
    return true;
  });

  const getDeptNames = (deptIds: string[]) => {
    return deptIds.map(id => {
      const d = departments.find(d => d.id === id);
      return d ? (d.name[language as keyof typeof d.name] || d.name.en) : id;
    }).join(', ');
  };

  if (!isClient) return null; // Avoid hydration mismatch on useSearchParams

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Search
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Hospital List */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {filteredHospitals.length} <span className="text-slate-500 font-medium text-lg">Results Found</span>
            </h1>
          </div>
          
          <div className="overflow-y-auto max-h-[750px] pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {filteredHospitals.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-3xl p-8 text-center text-slate-500 font-medium">
                No hospitals found matching your criteria.
              </div>
            ) : (
              filteredHospitals.map(hospital => (
                <Link key={hospital.id} href={`/hospitals/${hospital.id}`} className="block">
                  <div className={`hover-lift bg-white rounded-3xl border p-6 transition-all ${hospital.emergencyAccepted ? 'border-rose-200 bg-rose-50/10' : 'border-slate-200/80 shadow-xs'}`}>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className={`text-lg font-bold leading-snug ${hospital.emergencyAccepted ? 'text-emergency-700' : 'text-slate-900 group-hover:text-brand-600'}`}>
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
                      <p className="flex items-center gap-2.5">
                        <Phone className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
                        <span>{hospital.phone}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Clock className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
                        {hospital.isOpenNow ? (
                          <span className="font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-md text-xs border border-accent-200">{t('filter.openNow')}</span>
                        ) : (
                          <span className="font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md text-xs border border-slate-200">Closed</span>
                        )}
                      </p>
                    </div>

                    <div className="mb-4 pt-3 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Departments</p>
                      <p className="text-sm text-slate-700 font-semibold">{getDeptNames(hospital.departments)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {hospital.supportedLanguages.map(lang => (
                        <span key={lang} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-bold border border-slate-200/60 uppercase">
                          {lang}
                        </span>
                      ))}
                      {hospital.walkInAllowed && (
                        <span className="bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg font-bold border border-brand-100">
                          Walk-in OK
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
          {/* Decorative background grid and circles simulating a Map UI */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute w-96 h-96 rounded-full bg-brand-500/10 blur-3xl -top-20 -right-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-accent-500/5 blur-3xl -bottom-20 -left-20"></div>
          
          <div className="text-center p-8 relative z-10 max-w-md space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-brand-600 to-indigo-500 text-white rounded-3xl shadow-xl shadow-brand-500/20 animate-bounce">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive Map Area</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Google Maps integration will render here. In production, it displays the {filteredHospitals.length} filtered hospitals with custom markers, popups, and route generation.
            </p>
            <div className="pt-4">
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-xs font-semibold text-slate-300">
                Requires Google Maps API Key Setup
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
