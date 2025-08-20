export type Career = {
  id: number;
  title: string;
  company: string | null;
  location: string | null;
  type: string | null;
  description: string | null;
  requirements: string | null;
  salary_range: string | null;
  is_active: boolean;
  created_at: string;
};
