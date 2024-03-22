export type OptionModel = {
  id?: string;
  description: string;
  votes?: number;
};

export type PollModel = {
  title: string;
  question: string;
  options: OptionModel[];
  is_multiple?: boolean;
  can_change_vote: boolean;
  show_results_after_much_votes?: number;
  start_at: Date;
  end_at: Date;
};

