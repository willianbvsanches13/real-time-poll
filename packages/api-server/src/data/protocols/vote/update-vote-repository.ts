import { VoteModel } from '@/domain/models';
import { UpdateVote } from '@/domain/usecases';

export interface UpdateVoteRepository {
  update: (data: UpdateVoteRepository.Params) => Promise<UpdateVoteRepository.Result>;
}

export namespace UpdateVoteRepository {
  export type Params = Omit<VoteModel, 'updated_at' | 'deleted_at' | 'created_at'>;
  export type Result = UpdateVote.Result;
}

