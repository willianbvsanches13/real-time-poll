import { describe, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { DeletePoll } from '@/domain/usecases';
import { DeletePollController } from '@/presentation/controllers/delete-poll';

const param: DeletePollController.Request = 'any_id';

const result: DeletePoll.Result = true;

const httpResponse: DeletePollController.Response = {
  statusCode: 200,
  body: true,
}

class DeletePollSpy implements DeletePoll {
  async delete(data: DeletePoll.Params): Promise<DeletePoll.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('DeletePoll Controller', () => {
  it('should deletePollController with correct values', async () => {
    const deletePollRepository = new DeletePollSpy();
    const sut = new DeletePollController(deletePollRepository);
    const deleteSpy = jest.spyOn(deletePollRepository, 'delete');
    const response = await sut.handle(param);

    expect(deleteSpy).toHaveBeenCalledWith(param);
    expect(response).toEqual(httpResponse);
  });

  it('should throw if DeletePoll throws', async () => {
    const deletePollRepository = new DeletePollSpy();
    const sut = new DeletePollController(deletePollRepository);
    jest.spyOn(deletePollRepository, 'delete').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.handle(param);
    await expect(promise).rejects.toThrow();
  });
});
