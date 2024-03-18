import { VoteModel } from '@/domain/models';

export interface UpdateVote {
  update: (vote: UpdateVote.Params) => Promise<UpdateVote.Result>;
}

export namespace UpdateVote {
  export type Params = Omit<VoteModel, 'updated_at' | 'deleted_at' | 'created_at'>;
  export type Result = Omit<VoteModel, 'deleted_at'>;
}
