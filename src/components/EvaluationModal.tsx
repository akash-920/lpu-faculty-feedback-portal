import React, { useState, useEffect } from 'react';
import { CourseItem, EvaluationCriterion, StudentProfile } from '../types';
import { EVALUATION_CRITERIA, QUICK_TAGS } from '../data/mockData';
import { RatingInput } from './RatingInput';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  User, 
  Building2, 
  Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EvaluationModalProps {
  course: CourseItem | null;
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (courseId: string, submissionData: any) => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  course,
  student,
  isOpen,
  onClose,
  onSubmitSuccess,
  onShowToast,
}) => {
  if (!isOpen || !course) return null;

  const storageKey = `lpu_feedback_draft_${course.id}`;

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setRatings(parsed.ratings || {});
        setSelectedTags(parsed.selectedTags || []);
        setStrengths(parsed.strengths || '');
        setImprovements(parsed.improvements || '');
        setIsAnonymous(parsed.isAnonymous ?? true);
      } else {
        // Reset state for new course
        setRatings({});
        setSelectedTags([]);
        setStrengths('');
        setImprovements('');
        setIsAnonymous(true);
      }
    } catch {
      // Ignore parse errors
    }
    setValidationError(null);
  }, [course.id, storageKey]);

  // Handle rating change
  const handleRatingChange = (criterionId: string, val: number) => {
    setRatings((prev) => {
      const updated = { ...prev, [criterionId]: val };
      // Save draft in background
      saveDraft(updated, selectedTags, strengths, improvements, isAnonymous);
      return updated;
    });
    setValidationError(null);
  };

  const handleToggleTag = (tagId: string) => {
    setSelectedTags((prev) => {
      const updated = prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
        : [...prev, tagId];
      saveDraft(ratings, updated, strengths, improvements, isAnonymous);
      return updated;
    });
  };

  const saveDraft = (
    r: Record<string, number>,
    t: string[],
    s: string,
    imp: string,
    anon: boolean
  ) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ratings: r,
          selectedTags: t,
          strengths: s,
          improvements: imp,
          isAnonymous: anon,
          lastUpdated: new Date().toISOString(),
        })
      );
    } catch {
      // storage unavailable
    }
  };

  const handleManualSave = () => {
    saveDraft(ratings, selectedTags, strengths, improvements, isAnonymous);
    onShowToast('Evaluation progress saved as draft.', 'info');
  };

  // Group criteria
  const facultyCriteria = EVALUATION_CRITERIA.filter((c) => c.category === 'FACULTY');
  const courseLabCriteria = EVALUATION_CRITERIA.filter(
    (c) => c.category === 'COURSE' || c.category === 'LAB'
  );

  const completedRatingsCount = Object.keys(ratings).filter((k) => ratings[k] > 0).length;
  const totalCriteriaCount = EVALUATION_CRITERIA.length;
  const isFormComplete = completedRatingsCount === totalCriteriaCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      const missingCount = totalCriteriaCount - completedRatingsCount;
      setValidationError(
        `Please provide ratings for all ${totalCriteriaCount} evaluation parameters (${missingCount} remaining).`
      );
      // scroll to error
      const el = document.getElementById('modal-criteria-container');
      if (el) el.scrollTop = 0;
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Clear draft
      localStorage.removeItem(storageKey);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f97316', '#38bdf8', '#10b981', '#fbbf24'],
        });
      } catch {
        // ignore
      }

      const submissionRef = `LPU-EVAL-${Date.now().toString().slice(-6)}`;
      const submissionData = {
        courseId: course.id,
        ratings,
        selectedTags,
        strengths,
        improvements,
        isAnonymous,
        submittedAt: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' IST',
        submissionRef,
      };

      onSubmitSuccess(course.id, submissionData);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
                {course.code}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {course.credits} Credits • {course.type}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Course & Faculty Evaluation
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualSave}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Save draft"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div
          id="modal-criteria-container"
          className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800"
        >
          {/* Faculty Card Brief */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-semibold flex items-center justify-center shrink-0 border border-orange-200 text-sm">
                {course.faculty.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">
                  {course.faculty.name}
                </div>
                <div className="text-slate-500">
                  {course.faculty.designation} • {course.faculty.cabin}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted Confidential Feedback</span>
            </div>
          </div>

          {/* Validation Banner if missing fields */}
          {validationError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Section 1: Faculty Evaluation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Part 1: Faculty Teaching Effectiveness
                </h3>
                <p className="text-xs text-slate-500">
                  Rate teaching quality, engagement, and objective evaluation.
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {facultyCriteria.filter((c) => ratings[c.id] > 0).length} / {facultyCriteria.length} rated
              </span>
            </div>

            <div className="space-y-3">
              {facultyCriteria.map((c) => (
                <RatingInput
                  key={c.id}
                  criterionId={c.id}
                  label={c.label}
                  description={c.description}
                  value={ratings[c.id] || 0}
                  onChange={(val) => handleRatingChange(c.id, val)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Course & Practical Lab Evaluation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Part 2: Curriculum & Practical Learning
                </h3>
                <p className="text-xs text-slate-500">
                  Assess syllabus content, UMS lecture materials, and lab experience.
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {courseLabCriteria.filter((c) => ratings[c.id] > 0).length} / {courseLabCriteria.length} rated
              </span>
            </div>

            <div className="space-y-3">
              {courseLabCriteria.map((c) => (
                <RatingInput
                  key={c.id}
                  criterionId={c.id}
                  label={c.label}
                  description={c.description}
                  value={ratings[c.id] || 0}
                  onChange={(val) => handleRatingChange(c.id, val)}
                />
              ))}
            </div>
          </div>

          {/* Section 3: Quick Attribute Tags */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Part 3: Quick Impressions (Optional)
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Tap tags that best represent your experience in this course:
            </p>

            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Qualitative Feedback Comments */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Faculty & Course Strengths (What worked well?)
              </label>
              <textarea
                value={strengths}
                onChange={(e) => {
                  setStrengths(e.target.value);
                  saveDraft(ratings, selectedTags, e.target.value, improvements, isAnonymous);
                }}
                rows={2}
                placeholder="E.g., Clear explanation of thread synchronization algorithms and helpful lab viva sessions..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white text-slate-800 placeholder:text-slate-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Constructive Suggestions (How can this course or delivery improve?)
              </label>
              <textarea
                value={improvements}
                onChange={(e) => {
                  setImprovements(e.target.value);
                  saveDraft(ratings, selectedTags, strengths, e.target.value, isAnonymous);
                }}
                rows={2}
                placeholder="E.g., More live coding demonstrations before assigning complex lab experiments..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white text-slate-800 placeholder:text-slate-400 resize-none"
              />
            </div>
          </div>

          {/* Anonymity Setting */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs">
            <input
              type="checkbox"
              id="anonymity-check"
              checked={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
                saveDraft(ratings, selectedTags, strengths, improvements, e.target.checked);
              }}
              className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
            />
            <label htmlFor="anonymity-check" className="cursor-pointer text-slate-700">
              <strong className="text-slate-900 block font-medium">
                Submit as 100% Anonymous Feedback (Recommended)
              </strong>
              <span>
                Your Name and Registration Number will be stripped. The faculty will only see aggregated numerical metrics and non-identifiable suggestions after semester grades are finalized.
              </span>
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Evaluation Progress: <strong className="text-slate-900">{completedRatingsCount} of {totalCriteriaCount}</strong> metrics answered
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/70 border border-slate-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-sm flex items-center gap-1.5 ${
                isFormComplete
                  ? 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800'
                  : 'bg-slate-400 cursor-not-allowed opacity-90'
              }`}
            >
              {isSubmitting ? (
                <span>Submitting to UMS...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Final Evaluation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

