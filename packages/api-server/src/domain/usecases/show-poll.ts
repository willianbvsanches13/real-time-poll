import { PollModel } from '@/domain/models';

export interface ShowPoll {
  show: (pollID: ShowPoll.Params) => Promise<ShowPoll.Result | null>;
}

export namespace ShowPoll {
  export type Params = string;
  export type Result = Omit<PollModel, 'deleted_at'>;
}
