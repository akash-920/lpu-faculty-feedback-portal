import React from 'react';
import { CourseItem } from '../types';
import { 
  BookOpen, 
  User, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Receipt,
  Mail
} from 'lucide-react';

interface CourseCardProps {
  course: CourseItem;
  onEvaluate: (course: CourseItem) => void;
  onViewReceipt: (course: CourseItem) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEvaluate,
  onViewReceipt,
}) => {
  const isSubmitted = course.status === 'SUBMITTED';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-sm hover:shadow-md p-5 flex flex-col justify-between">
      <div>
        {/* Header: Code & Status */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                {course.code}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {course.credits} Credits
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {course.type}
            </span>
          </div>

          {/* Status Badge */}
          {isSubmitted ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Pending
            </span>
          )}
        </div>

        {/* Course Title */}
        <h3 className="font-semibold text-slate-800 text-base mb-4 leading-snug">
          {course.title}
        </h3>

        {/* Faculty Details Box */}
        <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 mb-4 text-xs">
          <div className="flex items-center gap-2 font-medium text-slate-900 mb-1">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{course.faculty.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">
              ({course.faculty.uid})
            </span>
          </div>
          <div className="text-slate-500 text-[11px] pl-5.5 space-y-0.5">
            <div>{course.faculty.designation}</div>
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{course.faculty.cabin}</span>
            </div>
          </div>
        </div>

        {isSubmitted && course.submittedAt && (
          <div className="text-[11px] text-slate-500 mb-4 flex items-center justify-between px-1">
            <span>Submitted on: {course.submittedAt}</span>
            {course.submissionRef && (
              <span className="font-mono text-[10px] text-slate-400">
                {course.submissionRef}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100">
        {isSubmitted ? (
          <button
            onClick={() => onViewReceipt(course)}
            className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-500" />
            <span>View Evaluation Receipt</span>
          </button>
        ) : (
          <button
            onClick={() => onEvaluate(course)}
            className="w-full py-2 px-3 rounded-lg text-xs font-medium text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Start Course Evaluation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

