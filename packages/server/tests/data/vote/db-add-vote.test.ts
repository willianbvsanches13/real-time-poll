import { describe, it, expect } from '@jest/globals';

import { AddVoteRepository } from '@/data/protocols';
import { DbAddVote } from '@/data/usecases';
import { AddVote } from '@/domain/usecases';

jest.useFakeTimers({
  now: new Date('2021-01-01'),
});

const param: AddVote.Params = {
  poll_id: 'any_id',
  user_id: 'any_id',
  option_ids: ['any_id'],
}

const result: AddVoteRepository.Result = {
  ...param,
  id: 'any_id',
  created_at: new Date(),
  updated_at: new Date(),
}

class AddVoteRepositorySpy implements AddVoteRepository {
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result> {
    return new Promise(resolve => resolve(result));
  }
}

describe('AddVote Usecase', () => {
  it('should addVoteRepository with correct values', async () => {
    const addVoteRepository = new AddVoteRepositorySpy();
    const sut = new DbAddVote(addVoteRepository);
    const addSpy = jest.spyOn(addVoteRepository, 'add');
    await sut.add(param);

    expect(addSpy).toHaveBeenCalledWith({
      ...param,
      id: 'logged-vote',
      created_at: new Date(),
    });
  });

  it('should throw if AddVoteRepository throws', async () => {
    const addVoteRepository = new AddVoteRepositorySpy();
    const sut = new DbAddVote(addVoteRepository);
    jest.spyOn(addVoteRepository, 'add').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.add(param);
    await expect(promise).rejects.toThrow();
  });
});
