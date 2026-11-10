import { StudentProfile, CourseItem, EvaluationCriterion } from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  name: "Aarav Sharma",
  regNo: "12204892",
  rollNo: "RK22DFB32",
  section: "K22DF",
  programme: "B.Tech Computer Science & Engineering (AI & ML)",
  school: "School of Computer Science & Engineering",
  block: "Block 34",
  term: "Autumn Term (2026-27)",
  academicYear: "3rd Year / 5th Semester",
  mentorName: "Dr. Sandeep Singh (Block 34-204)",
  lastSyncTime: "Today at 08:30 AM"
};

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: "cse316",
    code: "CSE316",
    title: "Operating Systems & Concurrency",
    credits: 4,
    type: "Theory + Practical",
    status: "PENDING",
    faculty: {
      id: "f-101",
      uid: "UID-19842",
      name: "Dr. Harpreet Kaur",
      designation: "Associate Professor",
      cabin: "Block 34, Cabin 402",
      email: "harpreet.19842@lpu.co.in"
    }
  },
  {
    id: "int219",
    code: "INT219",
    title: "Full Stack Web Development & Microservices",
    credits: 3,
    type: "Practical",
    status: "PENDING",
    faculty: {
      id: "f-102",
      uid: "UID-23114",
      name: "Prof. Vikramaditya Sen",
      designation: "Assistant Professor",
      cabin: "Block 36, Cabin 205",
      email: "vikramaditya.23114@lpu.co.in"
    }
  },
  {
    id: "cap282",
    code: "CAP282",
    title: "Database Management Systems & NoSQL Stores",
    credits: 4,
    type: "Theory + Practical",
    status: "PENDING",
    faculty: {
      id: "f-103",
      uid: "UID-21908",
      name: "Er. Simran Preet Singh",
      designation: "Assistant Professor",
      cabin: "Block 34, Cabin 315",
      email: "simran.21908@lpu.co.in"
    }
  },
  {
    id: "cse408",
    code: "CSE408",
    title: "Design and Analysis of Algorithms",
    credits: 4,
    type: "Theory",
    status: "PENDING",
    faculty: {
      id: "f-104",
      uid: "UID-18342",
      name: "Dr. Amitesh Verma",
      designation: "Professor & Program Chair",
      cabin: "Block 34, Cabin 510",
      email: "amitesh.18342@lpu.co.in"
    }
  },
  {
    id: "mth401",
    code: "MTH401",
    title: "Discrete Mathematics & Graph Theory",
    credits: 4,
    type: "Theory",
    status: "SUBMITTED",
    submittedAt: "08 Nov 2026, 14:22 IST",
    submissionRef: "LPU-EVAL-2611-94821",
    faculty: {
      id: "f-105",
      uid: "UID-16789",
      name: "Dr. Rajesh Kumar Mishra",
      designation: "Associate Professor",
      cabin: "Block 38, Cabin 112",
      email: "rajesh.16789@lpu.co.in"
    }
  },
  {
    id: "pea305",
    code: "PEA305",
    title: "Analytical Skills & Placement Readiness",
    credits: 2,
    type: "Practical",
    status: "SUBMITTED",
    submittedAt: "09 Nov 2026, 11:15 IST",
    submissionRef: "LPU-EVAL-2611-95104",
    faculty: {
      id: "f-106",
      uid: "UID-25410",
      name: "Ms. Neha Sharma",
      designation: "Senior Corporate Trainer",
      cabin: "Block 32, Cabin 108",
      email: "neha.25410@lpu.co.in"
    }
  }
];

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  // Faculty Teaching & Delivery
  {
    id: "c1",
    label: "Subject Knowledge & Clarity of Concepts",
    description: "Teacher explains complex core ideas systematically with relevant real-world illustrations and code examples.",
    category: "FACULTY"
  },
  {
    id: "c2",
    label: "Punctuality & Structured Syllabus Coverage",
    description: "Classes and lab sessions commence on time and the prescribed term syllabus is paced evenly.",
    category: "FACULTY"
  },
  {
    id: "c3",
    label: "Doubt Clearing & Student Engagement",
    description: "Faculty encourages questions, remains approachable during class/cabin hours, and provides patient answers.",
    category: "FACULTY"
  },
  {
    id: "c4",
    label: "Fairness in Continuous Assessment (CA) & Timely Uploads",
    description: "Evaluations, assignments, and quizzes are marked transparently and uploaded on LPU UMS promptly.",
    category: "FACULTY"
  },

  // Course & Practical / Infrastructure
  {
    id: "c5",
    label: "Course Curriculum Relevance & Depth",
    description: "Course contents match industry requirements, competitive coding standards, and university learning outcomes.",
    category: "COURSE"
  },
  {
    id: "c6",
    label: "LMS Course Material & Lecture Notes Quality",
    description: "Uploaded lecture slides, assignment briefs, and recommended textbooks on UMS are up-to-date and useful.",
    category: "COURSE"
  },
  {
    id: "c7",
    label: "Laboratory Guidance & Practical Hands-on Support",
    description: "Adequate lab machine availability, working compilers/IDEs, and faculty/lab technician assistance.",
    category: "LAB"
  }
];

export const QUICK_TAGS = [
  { id: "punctual", label: "⏰ Punctual & Consistent", sentiment: "positive" },
  { id: "clear_notes", label: "📝 Thorough UMS Notes", sentiment: "positive" },
  { id: "doubt_solver", label: "💡 Excellent Doubt Solver", sentiment: "positive" },
  { id: "interactive", label: "🤝 Interactive Classroom", sentiment: "positive" },
  { id: "fair_eval", label: "⚖️ Objective & Fair Marking", sentiment: "positive" },
  { id: "practical_focus", label: "💻 Hands-on Lab Focus", sentiment: "positive" },
  { id: "fast_pace", label: "⚡ Pace Can Be Moderated", sentiment: "constructive" },
  { id: "more_examples", label: "🔍 Needs More Code Demos", sentiment: "constructive" },
  { id: "heavy_assign", label: "📚 High Assignment Load", sentiment: "constructive" }
];

