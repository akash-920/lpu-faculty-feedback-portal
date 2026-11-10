import React, { useState, useEffect } from 'react';
import { CourseItem, StudentProfile } from './types';
import { INITIAL_STUDENT, INITIAL_COURSES } from './data/mockData';
import { Header } from './components/Header';
import { StudentHero } from './components/StudentHero';
import { CourseCard } from './components/CourseCard';
import { EvaluationModal } from './components/EvaluationModal';
import { ClearanceSlipModal } from './components/ClearanceSlipModal';
import { ConfidentialityModal } from './components/ConfidentialityModal';
import { ReceiptModal } from './components/ReceiptModal';
import { Toast } from './components/Toast';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function App() {
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem('lpu_evaluated_courses');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_COURSES;
  });

  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'SUBMITTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [evaluatingCourse, setEvaluatingCourse] = useState<CourseItem | null>(null);
  const [receiptCourse, setReceiptCourse] = useState<CourseItem | null>(null);
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sync courses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lpu_evaluated_courses', JSON.stringify(courses));
    } catch {
      // storage unavailable
    }
  }, [courses]);

  const completedCount = courses.filter((c) => c.status === 'SUBMITTED').length;
  const totalCount = courses.length;

  const handleStartEvaluation = (course: CourseItem) => {
    setEvaluatingCourse(course);
  };

  const handleViewReceipt = (course: CourseItem) => {
    setReceiptCourse(course);
  };

  const handleSubmitSuccess = (courseId: string, submissionData: any) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            status: 'SUBMITTED',
            submittedAt: submissionData.submittedAt,
            submissionRef: submissionData.submissionRef,
          };
        }
        return c;
      })
    );

    showToast(
      `Evaluation for ${courses.find((c) => c.id === courseId)?.code} submitted successfully! Recorded on UMS.`,
      'success'
    );
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset evaluation portal back to original demo state?')) {
      localStorage.removeItem('lpu_evaluated_courses');
      setCourses(INITIAL_COURSES);
      showToast('Portal state restored to default.', 'info');
    }
  };

  // Filter & Search
  const filteredCourses = courses.filter((c) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'PENDING' && c.status === 'PENDING') ||
      (activeTab === 'SUBMITTED' && c.status === 'SUBMITTED');

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.code.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.faculty.name.toLowerCase().includes(q) ||
      c.faculty.cabin.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Header
        student={student}
        completedCount={completedCount}
        totalCount={totalCount}
        onOpenClearance={() => setShowClearanceModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Student Banner & Quick Stats */}
        <StudentHero
          student={student}
          totalCourses={totalCount}
          completedCourses={completedCount}
          onOpenClearance={() => setShowClearanceModal(true)}
          onOpenHelp={() => setShowHelpModal(true)}
        />

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start sm:self-auto text-xs">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Courses ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                activeTab === 'PENDING'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3 h-3 text-amber-600" />
              <span>Pending ({totalCount - completedCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('SUBMITTED')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                activeTab === 'SUBMITTED'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Completed ({completedCount})</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course code, faculty, block..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-slate-50/50 text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEvaluate={handleStartEvaluation}
                onViewReceipt={handleViewReceipt}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-semibold text-slate-800 text-sm">No courses found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No registered courses matched your current filter or search criteria.
            </p>
            <button
              onClick={() => {
                setActiveTab('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Educational / Guidance Banner */}
        <div className="mt-10 bg-slate-100/70 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-orange-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">
                How does LPU evaluate this data?
              </span>
              <span>
                Feedback is gathered under the Continuous Academic Quality Assurance Protocol. Mean scores are calculated per section and shared with the Academic Council to improve lab curriculum and faculty pedagogy.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowHelpModal(true)}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium underline"
            >
              Read University Policy
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={handleResetDemoData}
              className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1"
              title="Reset state to initial mock data"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      </main>

      {/* University Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">
              L
            </div>
            <span className="font-semibold text-slate-700">
              Lovely Professional University (LPU)
            </span>
            <span className="text-slate-400">| Academic Evaluation System</span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Jalandhar - Delhi G.T. Road, Phagwara, Punjab (India) - 144411 • UMS Portal v4.18
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EvaluationModal
        course={evaluatingCourse}
        student={student}
        isOpen={!!evaluatingCourse}
        onClose={() => setEvaluatingCourse(null)}
        onSubmitSuccess={handleSubmitSuccess}
        onShowToast={showToast}
      />

      <ClearanceSlipModal
        isOpen={showClearanceModal}
        onClose={() => setShowClearanceModal(false)}
        student={student}
        courses={courses}
      />

      <ReceiptModal
        course={receiptCourse}
        isOpen={!!receiptCourse}
        onClose={() => setReceiptCourse(null)}
      />

      <ConfidentialityModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      {/* Floating Notifications */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;

