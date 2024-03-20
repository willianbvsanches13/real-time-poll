import { AddPoll, DeletePoll, ShowPoll } from '@/domain/usecases';
import { PollPostgresRepository, Context, ShortUniqueIdAdapter } from '@/infra';
import { DbAddPoll, DbDeletePoll, DbShowPoll } from '@/data/usecases';

export const makeDbAddPoll = (ctx: Context): AddPoll => {
  const pollMongoRepository = new PollPostgresRepository(ctx);
  const shortUniqueIdAdapter = new ShortUniqueIdAdapter();
  return new DbAddPoll(pollMongoRepository, shortUniqueIdAdapter);
}

export const makeDbDeletePoll = (ctx: Context): DeletePoll => {
  const pollMongoRepository = new PollPostgresRepository(ctx);
  return new DbDeletePoll(pollMongoRepository);
}

export const makeDbShowPoll = (ctx: Context): ShowPoll => {
  const pollMongoRepository = new PollPostgresRepository(ctx);
  return new DbShowPoll(pollMongoRepository);
}
