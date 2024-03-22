import { describe, it, expect, beforeEach } from '@jest/globals';
import { MockContext, Context, createMockContext } from '@/infra/adapters/prisma-adapter';
import { faker } from '@faker-js/faker';

import { AddPollRepository } from '@/data/protocols';
import { PollPostgresRepository } from '@/infra/repositories/postgres/poll-postgres-repository';

const result: AddPollRepository.Result = {
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
  can_change_vote: false,
  show_results_after_much_votes: 1,
  start_at: faker.date.anytime(),
  end_at: faker.date.future(),
}

const poll = {
  can_change_vote: result.can_change_vote,
  end_at: result.end_at,
  is_multiple: result.is_multiple,
  question: result.question,
  show_results_after_much_votes: result.show_results_after_much_votes,
  start_at: result.start_at,
  title: result.title,
  options: [
    ...result.options.map(option => ({
      id: option.id,
      poll_id: option.poll_id,
      description: option.description,
      votes: option.votes,
    }))
  ],
  created_at: new Date(),
  deleted_at: null,
  updated_at: new Date(),
  id: result.id,
}

describe('PollRepository Postgres', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  it('should add Poll with correct values', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.$transaction.mockResolvedValue([
      poll,
      poll.options,
    ]);
    await expect(sut.add(result)).resolves.toEqual(poll);

  });

  it('should AddPollPostgres throw if prisma throws', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.poll.create.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.add(result)).rejects.toThrow();

  });

  it('should show Poll correctly', async () => {
    const sut = new PollPostgresRepository(ctx);
    const { options, ...returnedPoll } = poll;
    mockCtx.prisma.poll.findFirst.mockResolvedValue({
      ...returnedPoll,
      is_multiple: returnedPoll.is_multiple ?? false,
      show_results_after_much_votes: returnedPoll.show_results_after_much_votes ?? 0,
    });
    await expect(sut.show(result.id)).resolves.toEqual(returnedPoll);
  });

  it("should show Poll correctly if register doesn't exists", async () => {
    const sut = new PollPostgresRepository(ctx);

    await expect(sut.show(result.id)).resolves.toEqual(null);
  });

  it('should ShowPollPostgres throw if prisma throws', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.poll.findFirst.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.show(result.id)).rejects.toThrow();

  });

  it('should delete Poll correctly', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.poll.delete.mockResolvedValue({
      ...poll,
      is_multiple: poll.is_multiple ?? false,
      show_results_after_much_votes: poll.show_results_after_much_votes ?? 0,
    });
    await expect(sut.delete('any_id')).resolves.toEqual(true);
  });

  it('should DeletePollPostgres throw if prisma throws', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.poll.delete.mockImplementationOnce(() => { throw new Error(); });
    await expect(sut.delete('any_id')).rejects.toThrow();

  });

});
