import { AddVote, UpdateVote } from '@/domain/usecases';
import { VotePostgresRepository, Context, ShortUniqueIdAdapter, VoteLoggedRepository } from '@/infra';
import { DbAddPersistedVote, DbAddVote, DbUpdateVote } from '@/data/usecases';

export const makeDbAddPersistedVote = (ctx: Context): AddVote => {
  const pollMongoRepository = new VotePostgresRepository(ctx);
  const shortUniqueIdAdapter = new ShortUniqueIdAdapter();
  return new DbAddPersistedVote(pollMongoRepository, shortUniqueIdAdapter);
}

export const makeDbAddLoggedVote = (ctx: Context): AddVote => {
  const pollMongoRepository = new VoteLoggedRepository(ctx);
  return new DbAddVote(pollMongoRepository);
}

export const makeDbUpdateVote = (ctx: Context): UpdateVote => {
  const pollMongoRepository = new VotePostgresRepository(ctx);
  return new DbUpdateVote(pollMongoRepository);
}

