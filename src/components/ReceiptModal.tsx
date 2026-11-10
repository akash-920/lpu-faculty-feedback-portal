import React from 'react';
import { CourseItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Printer, Calendar, Clock, User, Hash } from 'lucide-react';

interface ReceiptModalProps {
  course: CourseItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Course Evaluation Receipt
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase block">
                Submission Status
              </span>
              <span className="font-bold text-emerald-900 text-sm">
                Successfully Verified & Recorded
              </span>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-slate-400 text-xs">Course Code & Name</span>
              <span className="font-bold text-slate-900 text-right">
                {course.code} • {course.title}
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-slate-400 text-xs">Faculty</span>
              <span className="font-medium text-slate-800 text-right">
                {course.faculty.name} ({course.faculty.uid})
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-slate-400 text-xs">Submitted On</span>
              <span className="font-medium text-slate-800">
                {course.submittedAt || 'Recorded'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs">Reference Token</span>
              <span className="font-mono text-xs font-bold text-orange-600">
                {course.submissionRef || 'LPU-VERIFIED-2026'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            🔒 All responses are stored with university cryptographic tokenization. Individual identities are never revealed.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

