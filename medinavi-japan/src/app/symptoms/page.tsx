"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { departments, Language } from '@/types';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, ChevronRight, Info } from 'lucide-react';

// 症状 → 目安となる診療科（deptId）。
// これは「診断」ではなく、どの科を受診すればよいかの“案内”に留める（要件4・5）。
// 歯科はプロジェクトのスコープ外のため含めない。
type SymptomItem = {
  emoji: string;
  deptId: string;
  label: Record<Language, string>;
};

const SYMPTOMS: SymptomItem[] = [
  { emoji: '🤒', deptId: 'internal',      label: { ja: '発熱・風邪・のどの痛み', en: 'Fever / Cold / Sore throat', zh: '发烧・感冒・喉咙痛', ko: '발열・감기・인후통', es: 'Fiebre / Resfriado / Dolor de garganta' } },
  { emoji: '🤢', deptId: 'internal',      label: { ja: '腹痛・下痢・吐き気',     en: 'Stomachache / Diarrhea / Nausea', zh: '腹痛・腹泻・恶心', ko: '복통・설사・메스꺼움', es: 'Dolor de estómago / Diarrea / Náuseas' } },
  { emoji: '🦴', deptId: 'orthopedics',   label: { ja: '打撲・骨折・捻挫',       en: 'Bruise / Fracture / Sprain', zh: '挫伤・骨折・扭伤', ko: '타박상・골절・염좌', es: 'Golpe / Fractura / Esguince' } },
  { emoji: '🩹', deptId: 'surgery',       label: { ja: '切り傷・やけど',         en: 'Cut / Burn', zh: '割伤・烧伤', ko: '자상・화상', es: 'Corte / Quemadura' } },
  { emoji: '🌿', deptId: 'dermatology',   label: { ja: '発疹・かゆみ・湿疹',     en: 'Rash / Itch / Eczema', zh: '皮疹・瘙痒・湿疹', ko: '발진・가려움・습진', es: 'Erupción / Picazón / Eccema' } },
  { emoji: '👁️', deptId: 'ophthalmology', label: { ja: '目の痛み・充血',         en: 'Eye pain / Red eye', zh: '眼痛・充血', ko: '눈 통증・충혈', es: 'Dolor ocular / Ojo rojo' } },
  { emoji: '👂', deptId: 'ent',           label: { ja: '耳・鼻・のどの不調',     en: 'Ear / Nose / Throat', zh: '耳・鼻・喉不适', ko: '귀・코・목 이상', es: 'Oído / Nariz / Garganta' } },
  { emoji: '👶', deptId: 'pediatrics',    label: { ja: '子どもの発熱・体調不良', en: "Child's fever / illness", zh: '儿童发烧・不适', ko: '아이 발열・컨디션 난조', es: 'Fiebre / malestar infantil' } },
  { emoji: '🤱', deptId: 'obgyn',         label: { ja: '女性の健康・妊娠の相談', en: "Women's health / Pregnancy", zh: '女性健康・妊娠咨询', ko: '여성 건강・임신 상담', es: 'Salud femenina / Embarazo' } },
  { emoji: '💧', deptId: 'urology',       label: { ja: '排尿の悩み',             en: 'Urinary problems', zh: '排尿问题', ko: '배뇨 문제', es: 'Problemas urinarios' } },
  { emoji: '🧠', deptId: 'psychiatry',    label: { ja: '不安・不眠・気分の落ち込み', en: 'Anxiety / Insomnia / Low mood', zh: '焦虑・失眠・情绪低落', ko: '불안・불면・우울', es: 'Ansiedad / Insomnio / Ánimo bajo' } },
];

export default function SymptomsGuide() {
  const { language, t } = useLanguage();

  const deptName = (deptId: string) => {
    const d = departments.find(d => d.id === deptId);
    return d ? (d.name[language as keyof typeof d.name] || d.name.en) : deptId;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> {t('nav.home')}
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{t('symptom.title')}</h1>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">{t('symptom.lead')}</p>
      </div>

      {/* 緊急時の注意（要件5: 119誘導） */}
      <div className="bg-emergency-50 border border-emergency-200 p-4 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-emergency-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-xs text-emergency-800 font-bold leading-relaxed">{t('symptom.emergency')}</p>
          <a href="tel:119" className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-extrabold rounded-xl bg-emergency-600 text-white hover:bg-emergency-700 transition-colors">
            Call 119
          </a>
        </div>
      </div>

      {/* 症状カード一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SYMPTOMS.map((s, i) => (
          <Link
            key={i}
            href={`/hospitals?dept=${s.deptId}`}
            className="group bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 hover:border-brand-300 hover:bg-brand-50/30 active:scale-[0.98] transition-all"
          >
            <span className="text-2xl leading-none flex-shrink-0">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 leading-tight">{s.label[language] || s.label.en}</p>
              <p className="text-xs text-brand-600 font-semibold mt-0.5">→ {deptName(s.deptId)}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* ディスクレイマー（診断ではない, 要件5） */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 font-semibold leading-relaxed">{t('symptom.disclaimer')}</p>
      </div>
    </div>
  );
}
