import { describe, it, expect } from '@jest/globals';

import { DeletePollRepository } from '@/data/protocols';
import { DbDeletePoll } from '@/data/usecases';

class DeletePollRepositorySpy implements DeletePollRepository {
  async delete(data: DeletePollRepository.Params): Promise<DeletePollRepository.Result> {
    return new Promise(resolve => resolve(true));
  }
}

describe('deletePoll Usecase', () => {
  it('should deletePollRepository with correct values', async () => {
    const deletePollRepository = new DeletePollRepositorySpy();
    const sut = new DbDeletePoll(deletePollRepository);
    const deleteSpy = jest.spyOn(deletePollRepository, 'delete');
    await sut.delete('any_id');
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });

  it('should throw if DeletePollRepository throws', async () => {
    const deletePollRepository = new DeletePollRepositorySpy();
    const sut = new DbDeletePoll(deletePollRepository);
    jest.spyOn(deletePollRepository, 'delete').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.delete('any_id');
    await expect(promise).rejects.toThrow();
  });
});
