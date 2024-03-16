import { AddPoll } from '@/domain/usecases/add-poll';

export interface AddPollRepository {
  add: (data: AddPollRepository.Params) => Promise<AddPollRepository.Result>;
}

export namespace AddPollRepository {
  export type Params = AddPoll.Params;
  export type Result = AddPoll.Result;
}

export class AddPollRepositorySpy implements AddPollRepository {
  async add(data: AddPollRepository.Params): Promise<AddPollRepository.Result> {
    return new Promise(resolve => resolve(data));
  }
}
