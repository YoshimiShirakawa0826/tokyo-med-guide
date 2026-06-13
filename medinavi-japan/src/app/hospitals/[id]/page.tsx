"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { initialHospitals } from '@/data/mockHospitals';
import { departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HospitalDetail() {
  const { language, t } = useLanguage();
  const params = useParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const hospital = initialHospitals.find(h => h.id === params.id);

  if (!hospital) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Hospital not found</h1>
        <Link href="/hospitals" className="text-brand-600 hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  const getDeptNames = (deptIds: string[]) => {
    return deptIds.map(id => {
      const d = departments.find(d => d.id === id);
      return d ? (d.name[language as keyof typeof d.name] || d.name.en) : id;
    }).join(', ');
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/hospitals" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to list
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200/60 overflow-hidden">
        {/* Banner header */}
        <div className={`px-6 py-8 sm:px-8 border-b ${hospital.emergencyAccepted ? 'bg-gradient-to-r from-emergency-50 to-orange-50/50 border-emergency-100' : 'bg-gradient-to-r from-slate-50 to-indigo-50/20 border-slate-200/60'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${hospital.emergencyAccepted ? 'text-emergency-700' : 'text-slate-900'}`}>
                {hospital.name[language] || hospital.name.en}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {hospital.supportedLanguages.map(lang => (
                  <span key={lang} className="bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg font-bold border border-brand-100 uppercase">
                    {lang} Speaker Available
                  </span>
                ))}
                {hospital.walkInAllowed && (
                  <span className="bg-accent-50 text-accent-700 text-xs px-2.5 py-1 rounded-lg font-bold border border-accent-100">
                    Walk-in Accepted
                  </span>
                )}
              </div>
            </div>
            
            {hospital.emergencyAccepted && (
              <span className="inline-flex items-center gap-1.5 bg-emergency-100/80 text-emergency-800 px-4 py-2 rounded-2xl font-extrabold text-sm border border-emergency-200">
                <AlertTriangle className="w-4.5 h-4.5 text-emergency-600 animate-pulse" /> Emergency OK
              </span>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Contact & Location</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{hospital.address[language] || hospital.address.en}</p>
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

                <div className="flex items-start pt-3 border-t border-slate-50">
                  <Phone className="w-5 h-5 text-slate-400 mt-1.5 mr-3 flex-shrink-0" />
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-slate-800 font-bold text-lg">{hospital.phone}</p>
                    <a 
                      href={`tel:${hospital.phone.replace(/-/g, '')}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Medical Services</h2>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Departments</p>
                  <p className="text-slate-800 font-semibold text-sm">{getDeptNames(hospital.departments)}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-200/60">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {hospital.isOpenNow ? (
                      <span className="text-accent-700 font-bold text-sm bg-accent-50 px-2 py-0.5 rounded border border-accent-100">Open Now</span>
                    ) : (
                      <span className="text-slate-500 font-semibold text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Currently Closed</span>
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-50/50 border border-brand-100 p-5 rounded-2xl space-y-3">
              <h3 className="flex items-center gap-2 text-brand-800 font-bold text-sm uppercase tracking-wider">
                <Info className="w-4.5 h-4.5 text-brand-600" /> Important Notice
              </h3>
              <p className="text-xs text-brand-900/80 leading-relaxed font-semibold">
                Please bring your passport, residence card (if applicable), and health insurance card or travel insurance documents.
              </p>
              <p className="text-xs text-brand-900/80 leading-relaxed font-semibold">
                Wait times may vary. If you have severe symptoms, do not wait - call 119 for an ambulance immediately.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs text-slate-500 space-y-1">
              <p><span className="font-semibold text-slate-700">Data Source:</span> {hospital.dataSource}</p>
              <p><span className="font-semibold text-slate-700">Last Updated:</span> {hospital.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
