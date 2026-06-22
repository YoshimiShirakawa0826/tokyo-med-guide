"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { Hospital, departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft, Info, ExternalLink, CheckCircle, CreditCard, Shield, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HospitalDetail() {
  const { language } = useLanguage();
  const params = useParams();
  const [hospital, setHospital] = useState<Hospital | null | undefined>(undefined);

  useEffect(() => {
    fetch('/data/clinics.json')
      .then(r => r.json())
      .then((data: Hospital[]) => {
        const found = data.find(h => h.id === params.id);
        if (found) {
          const now = new Date();
          const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
          const todayKey = dayKeys[now.getDay()];
          const nowMinutes = now.getHours() * 60 + now.getMinutes();
          if (found.closedDays?.[todayKey]) {
            found.isOpenNow = false;
          } else {
            const todaySlots = found.openingHours?.[todayKey];
            if (todaySlots && todaySlots.length > 0) {
              found.isOpenNow = todaySlots.some(slot => {
                const [sh, sm] = slot.start.split(':').map(Number);
                const [eh, em] = slot.end.split(':').map(Number);
                return nowMinutes >= sh * 60 + sm && nowMinutes <= eh * 60 + em;
              });
            } else {
              found.isOpenNow = true;
            }
          }
        }
        setHospital(found ?? null);
      })
      .catch(() => setHospital(null));
  }, [params.id]);

  if (hospital === undefined) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-500 font-semibold">Loading...</div>;
  }

  if (!hospital) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Clinic not found</h1>
        <Link href="/hospitals" className="text-brand-600 hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  const getDeptNames = (deptIds: string[]) => {
    return deptIds.length > 0
      ? deptIds.map(id => {
          const d = departments.find(d => d.id === id);
          return d ? (d.name[language as keyof typeof d.name] || d.name.en) : id;
        }).join(', ')
      : '—';
  };

  const getVerificationMethodLabel = (method?: string) => {
    switch(method) {
      case 'phone': return 'Direct Phone Call Verification';
      case 'ai_interview': return 'AI Phone Interview Verification';
      case 'manual_visit': return 'Manual Site Visit & Verification';
      case 'official_website': return 'Official Website Scrape';
      default: return 'Open Data Directory (厚生労働省)';
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/hospitals" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to list
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200/60 overflow-hidden">

        {/* Banner header */}
        <div className={`px-6 py-8 sm:px-8 border-b ${hospital.verification.status === 'verified' ? 'bg-gradient-to-r from-brand-50/20 to-indigo-50/10 border-brand-100/50' : 'bg-gradient-to-r from-slate-50 to-slate-100/30 border-slate-200/60'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {hospital.verification.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 text-xs px-2.5 py-1 rounded-full font-bold border border-accent-200">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-600" /> Verified Pilot Data
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-slate-200">
                    Open Data Source
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {hospital.name[language] || hospital.name.en || hospital.name.ja}
              </h1>
              {hospital.name.en && hospital.name.en !== hospital.name.ja && (
                <p className="text-sm text-slate-500 mt-1">{hospital.name.ja}</p>
              )}
            </div>

            {hospital.emergencyAccepted && (
              <span className="inline-flex items-center gap-1.5 bg-emergency-100/80 text-emergency-800 px-4 py-2 rounded-2xl font-extrabold text-sm border border-emergency-200">
                <AlertTriangle className="w-4 h-4 text-emergency-600 animate-pulse" /> Emergency Accepted
              </span>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Location & Contacts</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{hospital.address[language] || hospital.address.ja}</p>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      Open in Google Maps <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>

                {hospital.phone ? (
                  <div className="flex items-start pt-3 border-t border-slate-50">
                    <Phone className="w-5 h-5 text-slate-400 mt-1.5 mr-3 flex-shrink-0" />
                    <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-slate-800 font-bold text-base">{hospital.phone}</p>
                      <a
                        href={`tel:${hospital.phone.replace(/-/g, '')}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs font-bold rounded-xl shadow-xs text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 transition-colors"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                ) : null}

                {hospital.website && (
                  <div className="pt-3 border-t border-slate-50">
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      <Globe className="w-4 h-4" /> Official Website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Medical Department & Status */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Medical Services</h2>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Departments</p>
                  <p className="text-slate-800 font-semibold text-sm">{getDeptNames(hospital.departments)}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Today&apos;s Status</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {hospital.isOpenNow ? (
                          <span className="text-accent-700 font-bold text-xs bg-accent-50 px-2.5 py-0.5 rounded border border-accent-100">Open Now</span>
                        ) : (
                          <span className="text-slate-500 font-semibold text-xs bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">Closed Now</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weekend</p>
                      {hospital.accessInfo.weekendOpen ? (
                        <span className="text-slate-700 font-bold text-xs bg-white px-2.5 py-0.5 rounded border border-slate-200">Open on Weekends</span>
                      ) : (
                        <span className="text-slate-400 font-semibold text-xs bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">Weekdays Only</span>
                      )}
                    </div>
                  </div>
                  {/* 診療時間表 */}
                  {hospital.openingHours && (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Opening Hours</p>
                      <div className="grid grid-cols-4 gap-1 text-[10px]">
                        {(['mon','tue','wed','thu','fri','sat','sun'] as const).map((day, i) => {
                          const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
                          const slots = hospital.openingHours?.[day];
                          const closed = hospital.closedDays?.[day];
                          return (
                            <div key={day} className={`text-center p-1 rounded ${closed ? 'bg-slate-100 text-slate-300' : 'bg-white border border-slate-200'}`}>
                              <p className="font-bold text-slate-500">{labels[i]}</p>
                              {closed ? (
                                <p>—</p>
                              ) : slots && slots.length > 0 ? (
                                <div className="space-y-0.5">
                                  {slots.map((slot, si) => (
                                    <p key={si} className="text-slate-700">{slot.start}–{slot.end}</p>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-500">Open</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Supported Languages */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Supported Languages</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.supportedLanguages.map(lang => (
                  <span key={lang} className="bg-brand-50 text-brand-700 text-xs px-3 py-1 rounded-lg font-bold border border-brand-100 uppercase">
                    {lang === 'en' ? 'English' : lang === 'zh' ? '中文' : lang === 'ko' ? '한국어' : lang === 'es' ? 'Español' : '日本語'}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Verification Report */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Verification Report</h2>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-brand-300">Method</span>
                  <span className="text-xs font-bold text-slate-200">{getVerificationMethodLabel(hospital.verification.confirmedBy)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-brand-300">Data Updated</span>
                  <span className="text-xs font-bold text-slate-200">{hospital.updatedAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-300">Source</span>
                  <span className="text-xs font-bold text-slate-200">{hospital.dataSource}</span>
                </div>
              </div>
            </section>

            {/* Access Capabilities Grid */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Access Capabilities</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-2">
                  <Globe className={`w-4 h-4 ${hospital.accessInfo.englishSupportToday ? 'text-brand-500' : 'text-slate-300'}`} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">English Support</p>
                    <p className="text-xs font-extrabold text-slate-700">{hospital.accessInfo.englishSupportToday ? 'Available' : 'Limited'}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${hospital.accessInfo.creditCardAccepted ? 'text-brand-500' : 'text-slate-300'}`} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">Credit Card</p>
                    <p className="text-xs font-extrabold text-slate-700">{hospital.accessInfo.creditCardAccepted ? 'Accepted' : 'Unconfirmed'}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${hospital.accessInfo.overseasInsuranceAccepted ? 'text-brand-500' : 'text-slate-300'}`} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">Travel Insurance</p>
                    <p className="text-xs font-extrabold text-slate-700">{hospital.accessInfo.overseasInsuranceAccepted ? 'Docs Prepared' : 'Unconfirmed'}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${hospital.hasHolidayService ? 'text-brand-500' : 'text-slate-300'}`} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">Holiday Service</p>
                    <p className="text-xs font-extrabold text-slate-700">{hospital.hasHolidayService ? 'Available' : 'Closed'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Document Notices */}
            <div className="bg-brand-50/50 border border-brand-100 p-5 rounded-2xl space-y-3">
              <h3 className="flex items-center gap-2 text-brand-800 font-bold text-xs uppercase tracking-wider">
                <Info className="w-4 h-4 text-brand-600" /> Important Checklist
              </h3>
              <ul className="text-xs text-brand-900/80 leading-relaxed font-semibold list-disc pl-4 space-y-1">
                <li>Bring your Passport or Residence Card (if resident).</li>
                <li>Bring your Travel Insurance Certificate for smooth claims.</li>
                <li>Write down your current symptoms and medical history in advance.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
