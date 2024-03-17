import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { AddPoll } from '@/domain/usecases';
import { AddPollController } from '@/presentation/controllers/add-poll';

const param: AddPollController.Request = {
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

const result: AddPoll.Result = {
  ...param,
  id: 'any_id',
  options: param.options.map(option => ({
    ...option,
    id: 'any_id',
    poll_id: 'any_id',
  })),
}

const httpResponse: AddPollController.Response = {
  statusCode: 200,
  body: 'ok',
}

class AddPollSpy implements AddPoll {
  async add(data: AddPoll.Params): Promise<AddPoll.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('AddPoll Controller', () => {
  it('should addPollController with correct values', async () => {
    const addPollRepository = new AddPollSpy();
    const sut = new AddPollController(addPollRepository);
    const addSpy = jest.spyOn(addPollRepository, 'add');
    const response = await sut.handle(param);

    expect(addSpy).toHaveBeenCalledWith(param);
    expect(response).toEqual(httpResponse);
  });

  it('should throw if AddPoll throws', async () => {
    const addPollRepository = new AddPollSpy();
    const sut = new AddPollController(addPollRepository);
    jest.spyOn(addPollRepository, 'add').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).rejects.toThrow();
  });
});
