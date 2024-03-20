import { VoteModel } from '@/domain/models';

export interface AddVote {
  add: (vote: AddVote.Params) => Promise<AddVote.Result | null>;
}

export namespace AddVote {
  export type Params = Omit<VoteModel, 'id' | 'updated_at' | 'deleted_at' | 'created_at'>;
  export type Result = Omit<VoteModel, 'deleted_at'>;
}
