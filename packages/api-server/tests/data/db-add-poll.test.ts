import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { AddPollRepository } from '@/data/protocols/add-poll-repository';
import { UniqueIdGenerator } from '@/data/protocols/unique-id-generator';
import { DbAddPoll } from '@/data/usecases/db-add-poll';
import { AddPoll } from '@/domain/usecases/add-poll';

const param: AddPoll.Params = {
  title: faker.lorem.words(5),
  question: faker.lorem.paragraph(1),
  options: [
    {
      description: faker.lorem.words(5),
      votes: 0
    },
    {
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

const result: AddPollRepository.Result = {
  ...param,
  id: 'any_id',
  options: param.options.map(option => ({
    ...option,
    id: 'any_id',
    poll_id: 'any_id',
  })),
}

class AddPollRepositorySpy implements AddPollRepository {
  async add(data: AddPollRepository.Params): Promise<AddPollRepository.Result> {
    return new Promise(resolve => resolve(data));
  }
}

class UniqueIdGeneratorSpy implements UniqueIdGenerator {
  generate(): string {
    return 'any_id';
  }
}

describe('Add Poll', () => {
  it('should addPollRepository with correct values', async () => {
    const addPollRepository = new AddPollRepositorySpy();
    const uniqueIdGenerator = new UniqueIdGeneratorSpy();
    const sut = new DbAddPoll(addPollRepository, uniqueIdGenerator);
    const addSpy = jest.spyOn(addPollRepository, 'add');
    await sut.add(param);
    expect(addSpy).toHaveBeenCalledWith(result);
  });

  it('should throw if UniqueIdGenerator throws', async () => {
    const addPollRepository = new AddPollRepositorySpy();
    const uniqueIdGenerator = new UniqueIdGeneratorSpy();
    const sut = new DbAddPoll(addPollRepository, uniqueIdGenerator);
    jest.spyOn(uniqueIdGenerator, 'generate').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.add(param);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if AddPollRepository throws', async () => {
    const addPollRepository = new AddPollRepositorySpy();
    const uniqueIdGenerator = new UniqueIdGeneratorSpy();
    const sut = new DbAddPoll(addPollRepository, uniqueIdGenerator);
    jest.spyOn(addPollRepository, 'add').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.add(param);
    await expect(promise).rejects.toThrow();
  });
});
