import React from 'react';
import { CourseItem, StudentProfile } from '../types';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Download,
  Building,
  QrCode
} from 'lucide-react';

interface ClearanceSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  courses: CourseItem[];
}

export const ClearanceSlipModal: React.FC<ClearanceSlipModalProps> = ({
  isOpen,
  onClose,
  student,
  courses,
}) => {
  if (!isOpen) return null;

  const completedCourses = courses.filter((c) => c.status === 'SUBMITTED');
  const isFullyCleared = completedCourses.length === courses.length && courses.length > 0;
  const pendingCount = courses.length - completedCourses.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Actions (no-print) */}
        <div className="no-print px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            University Document Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Clearance Slip Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900" id="clearance-slip">
          {/* Slip Header */}
          <div className="text-center pb-5 border-b-2 border-slate-800">
            <div className="inline-block px-3 py-1 mb-2 rounded bg-orange-100 text-orange-900 font-bold text-xs tracking-wider uppercase">
              Lovely Professional University
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase">
              Course Evaluation & Academic Clearance Slip
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Office of Academic Affairs • Autumn Term (Session 2026-27)
            </p>
          </div>

          {/* Status Clearance Stamp */}
          <div
            className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 ${
              isFullyCleared
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                : 'bg-amber-50/80 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm tracking-wide uppercase">
              {isFullyCleared ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Evaluation Completed • Hall Ticket Cleared</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Provisional Status • {pendingCount} Course(s) Remaining</span>
                </>
              )}
            </div>
            <p className="text-xs opacity-90 max-w-md">
              {isFullyCleared
                ? 'The student has fulfilled mandatory end-term faculty & course feedback requirements. Hall ticket download is unrestricted.'
                : 'Please complete all course evaluations before the deadline to ensure automatic admit card issuance.'}
            </p>
          </div>

          {/* Student Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Student Name
              </span>
              <span className="font-semibold text-slate-800">{student.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Registration No.
              </span>
              <span className="font-mono font-bold text-slate-900">{student.regNo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Roll / Section
              </span>
              <span className="font-medium text-slate-800">
                {student.rollNo} / {student.section}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Programme
              </span>
              <span className="font-medium text-slate-800">{student.programme}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Department & School
              </span>
              <span className="font-medium text-slate-800">{student.school}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Mentor
              </span>
              <span className="font-medium text-slate-800">{student.mentorName}</span>
            </div>
          </div>

          {/* Registered Courses Status Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Registered Courses & Feedback Status
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2.5">Course</th>
                    <th className="p-2.5">Faculty</th>
                    <th className="p-2.5 text-center">Cr</th>
                    <th className="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => {
                    const isDone = course.status === 'SUBMITTED';
                    return (
                      <tr key={course.id} className="hover:bg-slate-50/50">
                        <td className="p-2.5">
                          <span className="font-bold text-slate-900">{course.code}</span>
                          <span className="block text-[11px] text-slate-500 truncate max-w-[180px]">
                            {course.title}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-700">
                          <div>{course.faculty.name}</div>
                          <div className="text-[10px] text-slate-400">{course.faculty.cabin}</div>
                        </td>
                        <td className="p-2.5 text-center text-slate-600 font-medium">
                          {course.credits}
                        </td>
                        <td className="p-2.5 text-right">
                          {isDone ? (
                            <div>
                              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Cleared
                              </span>
                              <div className="font-mono text-[9px] text-slate-400">
                                {course.submissionRef || 'LPU-VERIFIED'}
                              </div>
                            </div>
                          ) : (
                            <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Slip Footer with Verification Reference */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="space-y-0.5 text-center sm:text-left">
              <div>
                Digital Clearance Hash: <span className="font-mono text-slate-700">SHA256:7a4f9e8b21c0...</span>
              </div>
              <div>Generated through LPU University Management System (UMS) Academic Service.</div>
            </div>

            <div className="border border-slate-200 p-2 rounded-lg bg-slate-50 flex items-center gap-2">
              <QrCode className="w-8 h-8 text-slate-700" />
              <div className="text-[9px] font-mono leading-tight">
                <strong>VERIFIED LPU UMS</strong>
                <div>REG: {student.regNo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="no-print px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Close Preview
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

