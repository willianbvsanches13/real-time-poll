import { DeletePoll } from '@/domain/usecases';
import { DeletePollRepository } from '@/data/protocols';

export class DbDeletePoll implements DeletePoll {
  constructor(
    private readonly deletePollRepository: DeletePollRepository,
  ) {}

  async delete(data: DeletePoll.Params): Promise<DeletePoll.Result> {
    return this.deletePollRepository.delete(data);
  }
}
