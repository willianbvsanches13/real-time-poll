import { PollModel, OptionModel } from '@/domain/models';
import { AddPoll } from '@/domain/usecases';

export interface AddPollRepository {
  add: (data: AddPollRepository.Params) => Promise<AddPollRepository.Result>;
}

export namespace AddPollRepository {
  export type Params = Omit<PollModel, 'updated_at' | 'deleted_at'>;
  export type Result = AddPoll.Result;
  export type Options = OptionModel;
}

