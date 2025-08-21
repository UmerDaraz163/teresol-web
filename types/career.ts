// types/career.ts

// ✅ Single source of truth for job/career data structure.
export type Career = {
  id: number; // AUTO_INCREMENT int
  title: string | null; // text allows NULL
  location: string | null; // text allows NULL
  short_desc: string | null; // text allows NULL
  full_description: string | null; // text allows NULL
  department: string | null; // text allows NULL
  job_type: string | null; // text allows NULL (DB does not restrict)
  experience_level: string | null; // text allows NULL (DB does not restrict)
  is_active: boolean; // tinyint(1) → boolean
  closing_date: string | null; // date → string in TS (nullable)
  created_at: string; // timestamp → string
};
