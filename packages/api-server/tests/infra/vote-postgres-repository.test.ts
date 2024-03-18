import { describe, it, expect, beforeEach } from '@jest/globals';
import { MockContext, Context, createMockContext } from '@/infra/prisma-adapter';

import { AddVoteRepository } from '@/data/protocols';
import { VotePostgresRepository } from '@/infra/vote-postgres-repository';

jest.useFakeTimers({
  now: new Date('2021-01-01'),
});

const result: AddVoteRepository.Result = {
  id: 'any_id',
  poll_id: 'any_id',
  user_id: 'any_id',
  option_ids: ['any_id'],
  created_at: new Date(),
  updated_at: new Date(),
}

const vote = {
  id: result.id,
  poll_id: result.poll_id,
  option_ids: result.option_ids,
  user_id: result.user_id,
  created_at: result.created_at,
  updated_at: result.updated_at,
  deleted_at: null,
}

describe('VoteRepository Postgres', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  it('should add Vote with correct values', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.vote.create.mockResolvedValue(vote);
    await expect(sut.add(result)).resolves.toEqual(vote);

  });

  it('should AddVotePostgres throw if prisma throws', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.vote.create.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.add(result)).rejects.toThrow();

  });

});
