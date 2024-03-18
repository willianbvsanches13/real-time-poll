import { ShowPoll } from '@/domain/usecases';

export interface ShowPollRepository {
  show: (data: ShowPollRepository.Params) => Promise<ShowPollRepository.Result | null>;
}

export namespace ShowPollRepository {
  export type Params = ShowPoll.Params;
  export type Result = ShowPoll.Result;
}

