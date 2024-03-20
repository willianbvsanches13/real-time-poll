import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { ShowPollRepository } from '@/data/protocols';
import { DbShowPoll } from '@/data/usecases';

const param: ShowPollRepository.Result = {
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
  updated_at: new Date(),
}

class ShowPollRepositorySpy implements ShowPollRepository {
  async show(data: ShowPollRepository.Params): Promise<ShowPollRepository.Result> {
    return new Promise(resolve => resolve(param));
  }
}

describe('showPoll Usecase', () => {
  it('should showPollRepository with correct values', async () => {
    const showPollRepository = new ShowPollRepositorySpy();
    const sut = new DbShowPoll(showPollRepository);
    const showSpy = jest.spyOn(showPollRepository, 'show');
    await sut.show('any_id');
    expect(showSpy).toHaveBeenCalledWith('any_id');
  });

  it('should throw if ShowPollRepository throws', async () => {
    const showPollRepository = new ShowPollRepositorySpy();
    const sut = new DbShowPoll(showPollRepository);
    jest.spyOn(showPollRepository, 'show').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.show('any_id');
    await expect(promise).rejects.toThrow();
  });
});
