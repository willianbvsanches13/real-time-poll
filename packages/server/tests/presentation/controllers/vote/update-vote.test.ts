import { describe, it, expect } from '@jest/globals';

import { UpdateVote } from '@/domain/usecases';
import { UpdateVoteController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers/http-helper';

const param: UpdateVoteController.Request = {
  voteID: 'any_id',
  pollID: 'any_id',
  user_id: 'any_id',
  optionIDs: ['any_id'],
}

const result: UpdateVote.Result = {
  id: param.voteID,
  poll_id: param.pollID,
  option_ids: param.optionIDs,
  user_id: param.user_id,
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

    expect(updateSpy).toHaveBeenCalledWith({
      id: param.voteID,
      poll_id: param.pollID,
      user_id: param.user_id,
      option_ids: param.optionIDs
    });
    expect(response).toEqual(httpResponse);
  });

  it('should return internal server error if UpdateVote throws', async () => {
    const updateVoteRepository = new UpdateVoteSpy();
    const sut = new UpdateVoteController(updateVoteRepository);
    jest.spyOn(updateVoteRepository, 'update').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).resolves.toEqual(serverError(new Error()));
  });
});
