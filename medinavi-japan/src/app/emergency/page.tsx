"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { AlertCircle, Phone, Info } from 'lucide-react';

export default function EmergencyGuide() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Heavy Emergency Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emergency-600 to-rose-700 text-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-rose-900/10 text-center space-y-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
        
        <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
          <AlertCircle className="w-12 h-12" />
        </div>
        
        <div className="space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('emergency.title')}</h1>
          <p className="text-rose-100 font-medium text-base sm:text-lg leading-relaxed">
            {t('emergency.desc')}
          </p>
        </div>
        
        <div className="pt-2">
          <a 
            href="tel:119"
            className="inline-flex items-center justify-center px-8 py-4.5 border border-transparent text-xl font-bold rounded-2xl bg-white text-emergency-600 hover:bg-rose-50 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-rose-950/20"
          >
            <Phone className="w-6 h-6 mr-2.5 animate-bounce" />
            Call 119 (Ambulance / Fire)
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-slate-100 border border-slate-200/50 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Info className="w-5 h-5 text-brand-500" />
            How to call 119
          </h2>
          <ol className="space-y-4 text-slate-600 text-sm font-semibold">
            <li className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>Dial <strong className="text-slate-900">119</strong> from any phone (free, works without SIM cards).</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Say clearly: <strong className="text-emergency-600 font-bold">"Kyukyu desu"</strong> (I need an ambulance).</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>State your location (look for address signs on vending machines or utility poles).</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <span>Briefly explain the patient's condition or injury.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex-shrink-0 mt-0.5">5</span>
              <span>Keep your line free. Do not hang up until instructed by the operator.</span>
            </li>
          </ol>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-slate-100 border border-slate-200/50 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="w-5 h-5 text-accent-500" />
            Other Helplines & Services
          </h2>
          <div className="space-y-4 division-y division-slate-100">
            <div className="pb-4 border-b border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm">Tokyo Himawari (Medical Consultation)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Multilingual medical information service regarding hospitals and the Japanese healthcare system.</p>
              <a href="tel:0352858181" className="inline-block text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm">03-5285-8181</a>
            </div>
            <div className="pt-2 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm">Police (Non-medical Emergencies)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">For traffic accidents, theft, loss of items, or other crimes.</p>
              <a href="tel:110" className="inline-block text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm">Call 110</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4">
        <Info className="w-5.5 h-5.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-800">Notice for International Travelers</h4>
          <p className="text-amber-700 text-xs leading-relaxed font-semibold">
            In Japan, emergency ambulance transport is free of charge. However, you will be billed for all medical treatments, tests, and medication received at the hospital. 
            Ensure you carry your travel insurance details and passport to the hospital.
          </p>
        </div>
      </div>
    </div>
  );
}
