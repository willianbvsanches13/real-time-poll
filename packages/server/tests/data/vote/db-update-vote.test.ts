import { describe, it, expect } from '@jest/globals';

import { UpdateVoteRepository, UniqueIdGenerator } from '@/data/protocols';
import { DbUpdateVote } from '@/data/usecases';
import { UpdateVote } from '@/domain/usecases';

jest.useFakeTimers({
  now: new Date('2021-01-01'),
});

const param: UpdateVote.Params = {
  id: 'any_id',
  poll_id: 'any_id',
  user_id: 'any_id',
  option_ids: ['any_id'],
}

const result: UpdateVoteRepository.Result = {
  ...param,
  id: 'any_id',
  created_at: new Date(),
  updated_at: new Date(),
}

class UpdateVoteRepositorySpy implements UpdateVoteRepository {
  async update(data: UpdateVoteRepository.Params): Promise<UpdateVoteRepository.Result> {
    return new Promise(resolve => resolve(result));
  }
}


describe('UpdateVote Usecase', () => {
  it('should updateVoteRepository with correct values', async () => {
    const updateVoteRepository = new UpdateVoteRepositorySpy();
    const sut = new DbUpdateVote(updateVoteRepository);
    const updateSpy = jest.spyOn(updateVoteRepository, 'update');
    await sut.update(param);

    expect(updateSpy).toHaveBeenCalledWith(param);
  });

  it('should throw if UpdateVoteRepository throws', async () => {
    const updateVoteRepository = new UpdateVoteRepositorySpy();
    const sut = new DbUpdateVote(updateVoteRepository);
    jest.spyOn(updateVoteRepository, 'update').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.update(param);
    await expect(promise).rejects.toThrow();
  });
});
