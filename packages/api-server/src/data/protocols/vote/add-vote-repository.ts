import { VoteModel } from '@/domain/models';
import { AddVote } from '@/domain/usecases';

export interface AddVoteRepository {
  add: (data: AddVoteRepository.Params) => Promise<AddVoteRepository.Result>;
}

export namespace AddVoteRepository {
  export type Params = Omit<VoteModel, 'updated_at' | 'deleted_at'>;
  export type Result = AddVote.Result;
}

