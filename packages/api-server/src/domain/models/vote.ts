export type VoteModel = {
  id: string;
  poll_id: string;
  option_ids: string[];
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
