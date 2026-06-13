"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { AlertCircle, Phone, Info, MapPin, Sparkles, Languages, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function EmergencyGuide() {
  const { t } = useLanguage();
  const [showLocation, setShowLocation] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);

  // Mock Shinjuku location for demo
  const mockLocation = {
    ja: '東京都新宿区歌舞伎町2-8-3 (歌舞伎町交番付近)',
    en: '2-8-3 Kabukicho, Shinjuku-ku, Tokyo (Near Kabukicho Koban / Police Box)',
    coordinates: '35.6961, 139.7025'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-emergency-700 text-xs px-3 py-1 rounded-full font-bold border border-rose-200">
          <AlertCircle className="w-3.5 h-3.5" /> Emergency Support Info
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">What to Do in a Medical Emergency</h1>
        <p className="text-sm sm:text-base text-slate-500 font-semibold leading-relaxed">
          Japan's emergency numbers and consultation advice. Choose the appropriate action based on severity.
        </p>
      </div>

      {/* Emergency Split Action Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 119: Severe / Ambulance */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emergency-600 to-rose-700 text-white p-8 rounded-3xl shadow-xl shadow-rose-900/10 flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-36 h-36 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Dial 119</span>
              <AlertCircle className="w-5 h-5 opacity-80" />
            </div>
            <h2 className="text-2xl font-black">Ambulance & Fire Emergency</h2>
            <p className="text-sm text-rose-100 font-semibold leading-relaxed">
              Call immediately if the patient has severe, life-threatening symptoms (e.g., loss of consciousness, severe chest pain, major bleeding, sudden paralysis).
            </p>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 text-xs font-semibold leading-relaxed">
              💡 **Multilingual interpretation** is available in 119 centers in major cities. Stay on the line - an interpreter will join.
            </div>
          </div>
          
          <div className="pt-6">
            <a 
              href="tel:119"
              className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-2xl bg-white text-emergency-600 hover:bg-rose-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-rose-950/20"
            >
              <Phone className="w-5 h-5 mr-2 animate-bounce" /> Call 119 (Ambulance)
            </a>
          </div>
        </div>

        {/* #7119: Advice / Consultation */}
        <div className="relative overflow-hidden bg-white border border-slate-200 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Dial #7119</span>
              <Sparkles className="w-5 h-5 text-brand-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Emergency Advice Line</h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Not sure if you need an ambulance? Dial #7119. A team of doctors, nurses, and emergency specialists will assess your symptoms and advise you.
            </p>
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-xs font-semibold text-slate-600 leading-relaxed">
              📞 In Tokyo, they will guide you to the nearest open clinic or tell you if an ambulance is necessary.
            </div>
          </div>
          
          <div className="pt-6">
            <a 
              href="tel:7119"
              className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-2xl bg-brand-600 text-white hover:bg-brand-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-indigo-100"
            >
              <Phone className="w-5 h-5 mr-2" /> Call #7119 (Consultation)
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Tool: Show Location Demo */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <button 
          onClick={() => setShowLocation(!showLocation)}
          className="w-full flex items-center justify-between font-bold text-slate-800 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" />
            <span>Show my current location (GPS Demo)</span>
          </div>
          {showLocation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showLocation && (
          <div className="pt-4 border-t border-slate-200/60 space-y-3 animate-fadeIn">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Shinjuku Pilot Sandbox Coordinates</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">日本語住所 (Japanese Address)</span>
                <p className="text-sm font-bold text-slate-800">{mockLocation.ja}</p>
                <p className="text-xs text-slate-400 mt-2 font-semibold">※オペレーターに現在地を聞かれたら、上の住所をそのまま読み上げてください。</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">English Address</span>
                <p className="text-sm font-bold text-slate-800">{mockLocation.en}</p>
                <p className="text-xs text-slate-400 mt-2 font-semibold">GPS Lat/Lon: {mockLocation.coordinates}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Tool: What to say phrases */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <button 
          onClick={() => setShowPhrases(!showPhrases)}
          className="w-full flex items-center justify-between font-bold text-slate-800 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-brand-600" />
            <span>What to say in Japanese during emergency</span>
          </div>
          {showPhrases ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showPhrases && (
          <div className="pt-4 border-t border-slate-200/60 space-y-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('emergency.sayThis')}</p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-start gap-4">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-1 rounded-md">1</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">「救急車をお願いします。」</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Pronunciation: Kyūkyūsha o onegai shimasu.</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">Meaning: Please send an ambulance.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-start gap-4">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-1 rounded-md">2</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">「場所は新宿の歌舞伎町です。」</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Pronunciation: Basho wa Shinjuku no Kabukichō desu.</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">Meaning: The location is Kabukicho, Shinjuku.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-start gap-4">
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-1 rounded-md">3</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">「英語が話せる人はいますか？」</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Pronunciation: Eigo ga hanaseru hito wa imasu ka?</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">Meaning: Is there anyone who speaks English?</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4">
        <Info className="w-5.5 h-5.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-800">Medical Decision Disclaimer</h4>
          <p className="text-amber-700 text-xs leading-relaxed font-semibold">
            This guide is intended for informational and referral purposes only. If you display signs of serious danger (loss of consciousness, heavy breathing, severe bleeding, chest pain), dial 119 immediately. Do not delay seeking professional emergency care.
          </p>
        </div>
      </div>
    </div>
  );
}
