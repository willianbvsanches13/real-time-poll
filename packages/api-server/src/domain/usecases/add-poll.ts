import { PollModel, InputPollModel } from '@/domain/models/poll';

export interface AddPoll {
  add: (poll: AddPoll.Params) => Promise<AddPoll.Result>;
}

export namespace AddPoll {
  export type Params = InputPollModel;
  export type Result = Omit<PollModel, 'updated_at' | 'deleted_at'>;
}
