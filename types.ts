export type taskType = {
  id?: string;
  title?: string;
  start_time?: string;
  end_time?: string;
  start_date?: string;
  end_date?: string;
  desc?: string;
  project_id?: string;
  is_done?: boolean;
  is_deleted?: boolean;
  due_date?: string;
  created_at?: string;
  status?: "pending" | "complete" | "inprogress";
};

export type projectType = {
  id?: string;
  title?: string;
  start_date?: string;
  end_date?: string;
  desc?: string;
  created_at?: string;
  status?: string;
  is_done?: boolean;
  is_deleted?: boolean;
};
