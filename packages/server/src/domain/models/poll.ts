import { OptionModel, InputOptionModel } from "./option";

export type PollModel = {
  id: string;
  title: string;
  question: string;
  options: OptionModel[];
  is_multiple?: boolean;
  can_change_vote: boolean;
  show_results_after_much_votes?: number;
  start_at: Date;
  end_at: Date;
  created_at?: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type InputPollModel = {
  title: string;
  question: string;
  options: InputOptionModel[];
  is_multiple?: boolean;
  can_change_vote: boolean;
  show_results_after_much_votes?: number;
  start_at: Date;
  end_at: Date;
};
