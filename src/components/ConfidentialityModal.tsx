import React from 'react';
import { X, ShieldCheck, Lock, Award, EyeOff, CheckCircle } from 'lucide-react';

interface ConfidentialityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfidentialityModal: React.FC<ConfidentialityModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Student Feedback Privacy & Policy
              </h3>
              <p className="text-xs text-slate-500">
                Lovely Professional University Academic Regulations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <EyeOff className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-slate-900">
                Complete Anonymity Protection
              </strong>
              <span>
                Your individual ratings, responses, and qualitative remarks are decoupled from your Registration Number (12204892) and Name. Teachers only see cohort-level aggregated scores.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-slate-900">
                Post-Grading Report Disclosure
              </strong>
              <span>
                Faculty feedback analysis is compiled and released to department HODs and faculty only after end-term theory and lab marks are finalized and sealed on UMS.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-slate-900">
                Continuous Curriculum & Pedagogy Improvement
              </strong>
              <span>
                Your evaluations directly inform faculty training, course syllabus updates, lab equipment procurement in Block 34 / 36 / 38, and classroom resource allocations.
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Mandatory Completion Notice:</strong> As per LPU Academic Council guidelines, students must evaluate all registered courses to obtain the End-Term Examination Hall Ticket clearance.
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

