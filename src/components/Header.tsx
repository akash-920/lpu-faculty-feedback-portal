import React from 'react';
import { StudentProfile } from '../types';
import { ShieldCheck, BookOpen, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  student: StudentProfile;
  completedCount: number;
  totalCount: number;
  onOpenClearance: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  completedCount,
  totalCount,
  onOpenClearance,
  onOpenHelp
}) => {
  const isFullyCompleted = completedCount === totalCount;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Portal Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            LPU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                Academic Evaluation Portal
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                UMS Companion
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-tight">
              Lovely Professional University • Faculty & Course Feedback
            </p>
          </div>
        </div>

        {/* Right Section: Student quick chip + Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Clearance Badge */}
          <button
            onClick={onOpenClearance}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isFullyCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="View Course Evaluation Clearance Slip"
          >
            {isFullyCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
            <span>
              Clearance Slip ({completedCount}/{totalCount})
            </span>
          </button>

          {/* Student Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-medium text-xs">
              AS
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <div className="font-medium text-slate-800">{student.name}</div>
              <div className="text-slate-400">Reg: {student.regNo}</div>
            </div>
          </div>

          {/* Help & Privacy button */}
          <button
            onClick={onOpenHelp}
            aria-label="Portal Help and Privacy"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Confidentiality & FAQ"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

