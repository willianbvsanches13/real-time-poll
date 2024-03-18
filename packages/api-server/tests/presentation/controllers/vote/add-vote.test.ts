import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { AddVote } from '@/domain/usecases';
import { AddVoteController } from '@/presentation/controllers';

const param: AddVoteController.Request = {
  poll_id: 'any_id',
  user_id: 'any_id',
  option_ids: ['any_id'],
}

const result: AddVote.Result = {
  ...param,
  id: 'any_id',
  created_at: new Date(),
  updated_at: new Date(),
}

const httpResponse: AddVoteController.Response = {
  statusCode: 200,
  body: 'ok',
}

class AddVoteSpy implements AddVote {
  async add(data: AddVote.Params): Promise<AddVote.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('AddVote Controller', () => {
  it('should addVoteController with correct values', async () => {
    const addVoteRepository = new AddVoteSpy();
    const sut = new AddVoteController(addVoteRepository);
    const addSpy = jest.spyOn(addVoteRepository, 'add');
    const response = await sut.handle(param);

    expect(addSpy).toHaveBeenCalledWith(param);
    expect(response).toEqual(httpResponse);
  });

  it('should throw if AddVote throws', async () => {
    const addVoteRepository = new AddVoteSpy();
    const sut = new AddVoteController(addVoteRepository);
    jest.spyOn(addVoteRepository, 'add').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).rejects.toThrow();
  });
});
