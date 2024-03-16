import { PollModel } from '../models/poll';

export interface AddPoll {
  add: (poll: AddPoll.Params) => Promise<AddPoll.Result>;
}

export namespace AddPoll {
  export type Params = Omit<PollModel, 'updated_at' | 'deleted_at'>;
  export type Result = Omit<PollModel, 'updated_at' | 'deleted_at'>;
}
