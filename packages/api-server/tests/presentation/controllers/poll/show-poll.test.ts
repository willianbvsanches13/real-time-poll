import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { ShowPoll } from '@/domain/usecases';
import { ShowPollController } from '@/presentation/controllers';


const result: ShowPoll.Result = {
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
  };

const httpResponse: ShowPollController.Response = {
  statusCode: 200,
  body: result,
}

class ShowPollSpy implements ShowPoll {
  async show(data: ShowPoll.Params): Promise<ShowPoll.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('ShowPoll Controller', () => {
  it('should showPollController with correct values', async () => {
    const showPollRepository = new ShowPollSpy();
    const sut = new ShowPollController(showPollRepository);
    const showSpy = jest.spyOn(showPollRepository, 'show');
    const response = await sut.handle(result.id);

    expect(showSpy).toHaveBeenCalledWith(result.id);
    expect(response).toEqual(httpResponse);
  });

  it('should throw if ShowPoll throws', async () => {
    const showPollRepository = new ShowPollSpy();
    const sut = new ShowPollController(showPollRepository);
    jest.spyOn(showPollRepository, 'show').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(result.id);
    await expect(promise).rejects.toThrow();
  });
});
