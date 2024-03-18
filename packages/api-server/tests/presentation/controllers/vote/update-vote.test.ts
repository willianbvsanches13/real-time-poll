import { describe, it, expect } from '@jest/globals';

import { UpdateVote } from '@/domain/usecases';
import { UpdateVoteController } from '@/presentation/controllers';

const param: UpdateVoteController.Request = {
  id: 'any_id',
  poll_id: 'any_id',
  user_id: 'any_id',
  option_ids: ['any_id'],
}

const result: UpdateVote.Result = {
  ...param,
  created_at: new Date(),
  updated_at: new Date(),
}

const httpResponse: UpdateVoteController.Response = {
  statusCode: 200,
  body: result,
}

class UpdateVoteSpy implements UpdateVote {
  async update(data: UpdateVote.Params): Promise<UpdateVote.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('UpdateVote Controller', () => {
  it('should updateVoteController with correct values', async () => {
    const updateVoteRepository = new UpdateVoteSpy();
    const sut = new UpdateVoteController(updateVoteRepository);
    const updateSpy = jest.spyOn(updateVoteRepository, 'update');
    const response = await sut.handle(param);

    expect(updateSpy).toHaveBeenCalledWith(param);
    expect(response).toEqual(httpResponse);
  });

  it('should throw if UpdateVote throws', async () => {
    const updateVoteRepository = new UpdateVoteSpy();
    const sut = new UpdateVoteController(updateVoteRepository);
    jest.spyOn(updateVoteRepository, 'update').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).rejects.toThrow();
  });
});
