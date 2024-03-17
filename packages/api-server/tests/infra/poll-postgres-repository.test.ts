import { describe, it, expect, beforeEach } from '@jest/globals';
import { MockContext, Context, createMockContext } from '@/infra/prisma-adapter';
import { faker } from '@faker-js/faker';
import { AddPollRepository } from '@/data/protocols/add-poll-repository';
import { PollPostgresRepository } from '@/infra/poll-postgres-repository';

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
  deleted_at: null,
  updated_at: new Date(),
  id: result.id,
}

describe('Poll Postgres Repository', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  it('should add Poll with correct values', async () => {
    const sut = new PollPostgresRepository(ctx);

    mockCtx.prisma.poll.create.mockResolvedValue(poll);
    await expect(sut.add(result)).resolves.toEqual(poll);

  });

});
