import { describe, it, expect, beforeEach } from '@jest/globals';
import { MockContext, Context, createMockContext } from '@/infra/adapters/prisma-adapter';
import { faker } from '@faker-js/faker';

import { AddVoteRepository } from '@/data/protocols';
import { VotePostgresRepository } from '@/infra/repositories/postgres/vote-postgres-repository';

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

const poll = {
  id: 'any_id',
    title: faker.lorem.words(5),
    question: faker.lorem.paragraph(1),
    options: [
      {
        id: 'any_id',
        poll_id: 'any_id',
        description: faker.lorem.words(5),
        votes: 0
      },
      {
        id: 'any_id',
        poll_id: 'any_id',
        description: faker.lorem.words(5),
        votes: 0
      }
    ],
    is_multiple: faker.helpers.maybe(() => 1, { probability: 0.5 }) === 1,
    can_change_vote: true,
    show_results_after_much_votes: 1,
    start_at: faker.date.anytime(),
    end_at: faker.date.future(),
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
}

describe('VoteRepository Postgres', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  it('should add Vote with correct values can change', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.poll.findFirst.mockResolvedValue(poll);
    mockCtx.prisma.vote.create.mockResolvedValue(vote);
    await expect(sut.add(result)).resolves.toEqual(vote);
  });

  it('should AddVotePostgres throw if prisma throws', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.vote.create.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.add(result)).rejects.toThrow();
  });

  it('should update Vote with correct values', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.vote.update.mockResolvedValue(vote);
    await expect(sut.update(result)).resolves.toEqual(vote);
  });

  it('should UpdateVotePostgres throw if prisma throws', async () => {
    const sut = new VotePostgresRepository(ctx);

    mockCtx.prisma.vote.update.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.update(result)).rejects.toThrow();
  });

});
