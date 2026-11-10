import React from 'react';
import { StudentProfile } from '../types';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Layers, 
  AlertCircle, 
  FileCheck, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface StudentHeroProps {
  student: StudentProfile;
  totalCourses: number;
  completedCourses: number;
  onOpenClearance: () => void;
  onOpenHelp: () => void;
}

export const StudentHero: React.FC<StudentHeroProps> = ({
  student,
  totalCourses,
  completedCourses,
  onOpenClearance,
  onOpenHelp
}) => {
  const pendingCount = totalCourses - completedCourses;
  const percentage = Math.round((completedCourses / (totalCourses || 1)) * 100);
  const isFullyCompleted = completedCourses === totalCourses && totalCourses > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6">
      {/* Top Banner: Student Details */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              LPU Student Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Section: <strong className="text-slate-800">{student.section}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Roll No: <strong className="text-slate-800">{student.rollNo}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {student.name}
          </h1>

          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-2 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>{student.programme}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{student.school} ({student.block})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{student.term}</span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 min-w-[280px] lg:max-w-xs w-full">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-slate-600">Feedback Completion</span>
            <span className="text-slate-900 font-semibold">{percentage}% ({completedCourses}/{totalCourses})</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFullyCompleted ? 'bg-emerald-500' : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-slate-500">
              {pendingCount > 0 ? `${pendingCount} course(s) pending` : 'All evaluations finished!'}
            </span>
            <button
              onClick={onOpenClearance}
              className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1 hover:underline"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Clearance Slip
            </button>
          </div>
        </div>
      </div>

      {/* LPU Examination & Hall Ticket Notice */}
      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-950">University Academic Advisory: </span>
            <span>
              End-Term course evaluation is mandatory to generate your 
              <strong> End-Term Examination Hall Ticket & view Continuous Assessment (CA) grades on UMS</strong>.
              All submissions are strictly 100% confidential and anonymized.
            </span>
          </div>
        </div>

        <button
          onClick={onOpenHelp}
          className="shrink-0 text-xs text-amber-800 hover:text-amber-950 underline font-medium self-end sm:self-auto"
        >
          Privacy Guarantee
        </button>
      </div>
    </div>
  );
};

