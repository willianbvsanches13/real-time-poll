import { describe, it, expect,  } from '@jest/globals';

import { AddVote, ShowPoll } from '@/domain/usecases';
import { AddVoteController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers/http-helper';
import { mockAddVoteControllerParams, mockAddVoteResult, mockPollResult } from '@/tests/domain/mocks';

const param = mockAddVoteControllerParams();

const result = mockAddVoteResult();

const pollResult = mockPollResult();

const httpResponse: AddVoteController.Response = {
  statusCode: 200,
  body: 'ok',
}

class AddPersistedVoteSpy implements AddVote {
  async add(data: AddVote.Params): Promise<AddVote.Result> {
    return new Promise(resolve => resolve(result));
  }
}
class AddLoggedVoteSpy implements AddVote {
  async add(data: AddVote.Params): Promise<AddVote.Result> {
    return new Promise(resolve => resolve(result));
  }
}

class showPollSpy implements ShowPoll {
  async show(data: ShowPoll.Params): Promise<ShowPoll.Result> {
    const mocked = mockPollResult() as ShowPoll.Result;
    return new Promise(resolve => resolve(mocked));
  }
}

type SutTypes = {
  sut: AddVoteController;
  addPersistedVoteRepository: AddVote;
  addLoggedVoteRepository: AddVote;
  showPollRepository: ShowPoll;
}

const makeSUT = (): SutTypes => {
  const addPersistedVoteRepository = new AddPersistedVoteSpy();
  const addLoggedVoteRepository = new AddLoggedVoteSpy();
  const showPollRepository = new showPollSpy();
  const sut = new AddVoteController(
    addPersistedVoteRepository,
    addLoggedVoteRepository,
    showPollRepository
  );
  return {
    sut,
    addPersistedVoteRepository,
    addLoggedVoteRepository,
    showPollRepository
  }
}

describe('AddVote Controller', () => {
  it('should addVoteController with correct values on persisted vote', async () => {
    const { sut, addPersistedVoteRepository, showPollRepository } = makeSUT();
    jest.spyOn(showPollRepository, 'show').mockResolvedValue({
      ...pollResult,
      can_change_vote: true,
    } as ShowPoll.Result);
    const addSpy = jest.spyOn(addPersistedVoteRepository, 'add');
    const response = await sut.handle(param);

    expect(addSpy).toHaveBeenCalledWith({
      poll_id: param.pollID,
      user_id: param.user_id,
      option_ids: param.optionIDs
    });
    expect(response).toEqual(httpResponse);
  });

  it('should addVoteController with correct values on logged vote', async () => {
    const { sut, addLoggedVoteRepository, showPollRepository } = makeSUT();
    jest.spyOn(showPollRepository, 'show').mockResolvedValue({
      ...pollResult,
      can_change_vote: false,
    } as ShowPoll.Result);
    const addSpy = jest.spyOn(addLoggedVoteRepository, 'add');
    const response = await sut.handle(param);

    expect(addSpy).toHaveBeenCalledWith({
      poll_id: param.pollID,
      user_id: param.user_id,
      option_ids: param.optionIDs
    });
    expect(response).toEqual(httpResponse);
  });

  it('should return InternalServerError if AddVote throws', async () => {
    const { sut, addPersistedVoteRepository, showPollRepository } = makeSUT();
    jest.spyOn(showPollRepository, 'show').mockResolvedValue({
      ...pollResult,
      can_change_vote: true,
    } as ShowPoll.Result);
    const error = new Error();
    error.stack = '';
    jest.spyOn(addPersistedVoteRepository, 'add').mockImplementationOnce(() => { throw error; });
    const response = await sut.handle(param);
    expect(response.body.name).toEqual('ServerError');
    expect(response.body.stack).toEqual('Internal server error');
  });
});
