import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { AddPoll } from '@/domain/usecases';
import { AddPollController } from '@/presentation/controllers';
import { mockAddPollControllerParam } from '@/tests/domain/mocks';

const param = mockAddPollControllerParam();

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
    expect(response).toEqual({
      ...httpResponse,
      body: {
        id: result.id,
        title: result.title,
        question: result.question,
        options: result.options.map((option) => ({ id: option.id, description: option.description })),
        can_change_vote: result.can_change_vote,
        start_at: result.start_at,
        end_at: result.end_at,
      },
    });
  });

  it('should throw if AddPoll throws', async () => {
    const addPollRepository = new AddPollSpy();
    const sut = new AddPollController(addPollRepository);
    jest.spyOn(addPollRepository, 'add').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).rejects.toThrow();
  });
});
