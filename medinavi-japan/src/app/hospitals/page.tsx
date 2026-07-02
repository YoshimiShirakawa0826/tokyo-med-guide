"use client";

import { useLanguage } from '@/components/LanguageProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Hospital, Language, departments } from '@/types';
import { MapPin, Phone, Clock, AlertTriangle, ArrowLeft, CheckCircle, CreditCard, Shield, Sparkles, MessageSquare, Navigation, ExternalLink, Wallet, LocateFixed } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { useGeolocation, distanceKm, formatDistance, DISTANCE_OPTIONS, SHINJUKU_CENTER } from '@/lib/geo';

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
  const selfPayFilter = searchParams.get('selfpay') === 'true';

  // 距離フィルタ（要件2）。位置情報は任意。未許可でも新宿中心からの目安で動作する。
  const geo = useGeolocation();
  const distParam = searchParams.get('dist'); // '1'|'3'|'5'|'10'|'near'
  // 'off' = 距離ソートなし（既存の中立順を維持 = 広告非依存, 要件7） / null = 近い順 / number = X km 以内
  const [activeRadius, setActiveRadius] = useState<number | null | 'off'>(
    distParam ? (distParam === 'near' ? null : Number(distParam)) : 'off'
  );

  // 基準点: 現在地が取得できていればそれを、なければ新宿中心（目安）を使う。
  const refPoint = geo.coords ?? SHINJUKU_CENTER;
  const usingRealLocation = !!geo.coords;

  // 地図表示（要件3: 初期はリストのみ。ユーザーが「地図を表示」を押したときだけ OSM を読み込む）。
  // OpenStreetMap 埋め込みはキー不要・無料で、Google Maps API 課金は一切発生しない。
  const [mapVisible, setMapVisible] = useState(false);
  const [mapTarget, setMapTarget] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const mapCenter = mapTarget ?? { lat: refPoint.lat, lng: refPoint.lng, name: '' };
  const osmSrc = (lat: number, lng: number) => {
    const d = 0.012; // 約1km四方
    const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  };
  const showClinicOnMap = (lat: number, lng: number, name: string) => {
    setMapTarget({ lat, lng, name });
    setMapVisible(true);
  };

  const filteredHospitals = hospitals.filter(h => {
    if (deptFilter && h.departments.length > 0 && !h.departments.includes(deptFilter)) return false;
    if (langFilter && !h.supportedLanguages.includes(langFilter as Language)) return false;  // eslint-disable-line @typescript-eslint/no-explicit-any
    if (openNowFilter && !h.isOpenNow) return false;
    if (engTodayFilter && !h.accessInfo?.englishSupportToday) return false;
    if (cardFilter && !h.accessInfo?.creditCardAccepted) return false;
    if (insuranceFilter && !h.accessInfo?.overseasInsuranceAccepted) return false;
    if (nightWeekendFilter && !h.accessInfo?.nightOpen && !h.accessInfo?.weekendOpen) return false;
    if (walkInFilter && !h.accessInfo?.walkInAvailable) return false;
    if (verifiedFilter && h.verification?.status !== 'verified') return false;
    if (selfPayFilter && !h.accessInfo?.selfPayAvailable) return false;
    return true;
  });

  // 各施設に Haversine 距離を付与。距離モード時は半径で絞り込み＆近い順にソート。
  let processed = filteredHospitals.map(h => ({ h, dist: distanceKm(refPoint, h.latitude, h.longitude) }));
  if (activeRadius !== 'off') {
    if (typeof activeRadius === 'number') processed = processed.filter(x => x.dist <= activeRadius);
    processed = [...processed].sort((a, b) => a.dist - b.dist);
  }

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
              {processed.length.toLocaleString()} <span className="text-slate-500 font-medium text-lg">Clinics Found</span>
            </h1>
          </div>

          {/* ── 距離フィルタ（要件2）: 位置情報は任意。未許可でも新宿中心からの目安で動作 ── */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 space-y-2.5 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => geo.request()}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  usingRealLocation ? 'bg-accent-50 border-accent-300 text-accent-700' : 'bg-brand-50 border-brand-200 text-brand-700 hover:bg-brand-100'
                }`}
              >
                <LocateFixed className="w-3.5 h-3.5" /> {t('distance.useLocation')}
              </button>
              {DISTANCE_OPTIONS.map(opt => {
                const selected = activeRadius !== 'off' && activeRadius === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    onClick={() => setActiveRadius(sel => (sel === opt.value ? 'off' : opt.value))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                      selected ? 'bg-brand-600 border-brand-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {t(opt.labelKey)}
                  </button>
                );
              })}
            </div>
            {/* 基準点の説明（現在地 or 新宿中心の目安） */}
            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
              {geo.status === 'denied' ? t('distance.denied')
                : geo.status === 'unsupported' ? t('distance.unsupported')
                : usingRealLocation ? `📍 ${t('distance.useLocation')}`
                : t('distance.approx')}
            </p>
          </div>

          <div className="overflow-y-auto max-h-[750px] pr-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {processed.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-3xl p-8 text-center text-slate-500 font-medium">
                No clinics found matching your criteria.
              </div>
            ) : (
              processed.map(({ h: hospital, dist }) => (
                <div key={hospital.id} className={`hover-lift bg-white rounded-3xl border p-6 transition-all ${hospital.verification?.status === 'verified' ? 'border-brand-200 bg-brand-50/5' : 'border-slate-200/80 shadow-xs'}`}>

                  {/* Upper Verification & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    {hospital.verification?.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 text-xs px-2.5 py-1 rounded-full font-bold border border-accent-200">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-600" /> Verified Data
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-slate-200">
                        Open Data Source
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
                      <Navigation className="w-3 h-3" />
                      {formatDistance(dist)}{usingRealLocation ? ` ${t('distance.fromMe')}` : '*'}
                    </span>
                  </div>

                  <Link href={`/hospitals/${hospital.id}`} className="block group">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-600 transition-colors">
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

                    {/* Language & status badges */}
                    <div className="flex flex-wrap gap-2">
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
                      {hospital.walkInAllowed && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">Walk-in</span>
                      )}
                      {hospital.accessInfo?.weekendOpen && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-slate-200">Weekend</span>
                      )}
                      {hospital.accessInfo?.selfPayAvailable && (
                        <span className="bg-amber-50 text-amber-700 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-amber-200 flex items-center gap-1">
                          <Wallet className="w-3 h-3" /> {t('filter.selfPay')}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* アクション: 電話 / 地図（Maps URL スキーム＝課金なし, 要件3）。Link の外に置き anchor ネストを回避 */}
                  <div className="flex gap-2 pt-4 mt-4 border-t border-slate-100">
                    {hospital.phone ? (
                      <a
                        href={`tel:${hospital.phone.replace(/-/g, '')}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> {t('btn.callNow')}
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100">
                        <Phone className="w-3.5 h-3.5" /> —
                      </span>
                    )}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {t('btn.openMap')}
                    </a>
                    {/* この施設を右の OSM 地図パネルに表示（内部プレビュー・無料） */}
                    <button
                      onClick={() => showClinicOnMap(hospital.latitude, hospital.longitude, hospital.name[language] || hospital.name.en || hospital.name.ja)}
                      aria-label={t('map.show')}
                      title={t('map.show')}
                      className="inline-flex items-center justify-center py-2 px-3 rounded-xl text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-brand-600 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map Area — OpenStreetMap（要件3: ユーザーが押したときだけ読込。Google Maps API 不使用・課金ゼロ） */}
        <div className="w-full lg:w-1/2 h-[450px] lg:h-[750px] relative overflow-hidden rounded-3xl border border-slate-200 shadow-lg lg:sticky lg:top-20">
          {!mapVisible ? (
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
              <div className="absolute w-96 h-96 rounded-full bg-brand-500/10 blur-3xl -top-20 -right-20"></div>
              <div className="absolute w-96 h-96 rounded-full bg-accent-500/5 blur-3xl -bottom-20 -left-20"></div>

              <div className="text-center p-8 relative z-10 max-w-sm space-y-5">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-brand-600 to-indigo-500 text-white rounded-3xl shadow-xl shadow-brand-500/20">
                  <MapPin className="w-10 h-10" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white">Map</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t('map.hint')}</p>
                </div>
                <button
                  onClick={() => setMapVisible(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" /> {t('map.show')}
                </button>
                <p className="text-[11px] text-slate-500">© OpenStreetMap · キー不要・無料</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-white">
              <iframe
                title="OpenStreetMap"
                className="w-full h-full border-0"
                loading="lazy"
                src={osmSrc(mapCenter.lat, mapCenter.lng)}
              />
              {/* 上部オーバーレイ: 対象名 + 閉じる */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="pointer-events-auto max-w-[65%] truncate bg-white/95 backdrop-blur border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                  {mapCenter.name || (usingRealLocation ? t('distance.useLocation') : t('distance.approx'))}
                </span>
                <button
                  onClick={() => setMapVisible(false)}
                  className="pointer-events-auto bg-white/95 backdrop-blur border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 shadow-sm transition-colors"
                >
                  {t('map.hide')}
                </button>
              </div>
              {/* 対象への経路案内は Google Maps（外部リンク・URLスキーム・無料）で */}
              {mapTarget && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapTarget.lat},${mapTarget.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-brand-600 text-white rounded-xl px-3 py-2 text-xs font-bold shadow-md hover:bg-brand-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {t('btn.openMap')}
                </a>
              )}
            </div>
          )}
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
