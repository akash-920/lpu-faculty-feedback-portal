export interface StudentProfile {
  name: string;
  regNo: string;
  rollNo: string;
  section: string;
  programme: string;
  school: string;
  block: string;
  term: string;
  academicYear: string;
  mentorName: string;
  avatarUrl?: string;
  lastSyncTime: string;
}

export type EvaluationStatus = 'PENDING' | 'SUBMITTED';

export interface FacultyInfo {
  id: string;
  uid: string;
  name: string;
  designation: string;
  cabin: string;
  email: string;
  photoUrl?: string;
}

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  credits: number;
  type: 'Theory' | 'Practical' | 'Theory + Practical';
  status: EvaluationStatus;
  faculty: FacultyInfo;
  submittedAt?: string;
  submissionRef?: string;
}

export interface EvaluationCriterion {
  id: string;
  label: string;
  description: string;
  category: 'FACULTY' | 'COURSE' | 'LAB';
}

export interface EvaluationFormData {
  courseId: string;
  ratings: Record<string, number>; // criterionId -> 1 to 5
  tags: string[];
  strengths: string;
  improvements: string;
  isAnonymous: boolean;
  satisfactionLevel: 'high' | 'moderate' | 'neutral' | 'low';
}

export interface StoredSubmission {
  courseId: string;
  submissionId: string;
  timestamp: string;
  ratings: Record<string, number>;
  averageScore: number;
  tags: string[];
  isAnonymous: boolean;
  commentsGiven: boolean;
}

