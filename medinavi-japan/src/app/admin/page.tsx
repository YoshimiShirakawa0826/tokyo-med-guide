"use client";

import { useState, useEffect } from 'react';
import { initialHospitals } from '@/data/mockHospitals';
import { Hospital } from '@/types';
import { Edit, Save, Plus, Database } from 'lucide-react';

export default function AdminDashboard() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isClient, setIsClient] = useState(false);

  // For MVP, we persist state to localStorage to simulate a database.
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('medinavi_hospitals');
    if (stored) {
      setHospitals(JSON.parse(stored));
    } else {
      setHospitals(initialHospitals);
    }
  }, []);

  const saveToStorage = (data: Hospital[]) => {
    setHospitals(data);
    localStorage.setItem('medinavi_hospitals', JSON.stringify(data));
  };

  const handleToggleOpen = (id: string) => {
    const updated = hospitals.map(h => 
      h.id === id ? { ...h, isOpenNow: !h.isOpenNow, updatedAt: new Date().toISOString().split('T')[0] } : h
    );
    saveToStorage(updated);
  };

  if (!isClient) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="bg-gradient-to-tr from-brand-600 to-indigo-500 p-2 rounded-2xl text-white shadow-md shadow-indigo-100">
            <Database className="w-6 h-6" />
          </div>
          Admin Dashboard
        </h1>
        <div>
          <button 
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => alert('Future feature: Add new hospital to Supabase')}
          >
            <Plus className="w-5 h-5" /> Add Hospital
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">Hospital Name (EN)</th>
                <th scope="col" className="px-6 py-4 text-left">Status</th>
                <th scope="col" className="px-6 py-4 text-left">Emergency</th>
                <th scope="col" className="px-6 py-4 text-left">Last Updated</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700 font-medium">
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{hospital.name.en}</div>
                    <div className="text-xs text-slate-400 font-semibold mt-0.5">{hospital.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleToggleOpen(hospital.id)}
                      className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-xl cursor-pointer transition-all border ${
                        hospital.isOpenNow 
                          ? 'bg-accent-50 border-accent-200 text-accent-700 hover:bg-accent-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {hospital.isOpenNow ? 'Open Now' : 'Closed'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.emergencyAccepted ? (
                      <span className="text-emergency-600 font-bold text-xs bg-emergency-50 border border-emergency-200 px-2 py-0.5 rounded-md">Yes</span>
                    ) : (
                      <span className="text-slate-400 text-xs bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                    {hospital.updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-brand-600 hover:text-brand-700 font-bold text-sm inline-flex items-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50/70 px-6 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-semibold">
            Note: Data modifications currently persist in your browser's LocalStorage for demonstration purposes. Future versions will connect to Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}
