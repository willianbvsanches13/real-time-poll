import { ShowPoll } from '@/domain/usecases';
import { ShowPollRepository } from '@/data/protocols';

export class DbShowPoll implements ShowPoll {
  constructor(
    private readonly showPollRepository: ShowPollRepository,
  ) {}

  async show(data: ShowPoll.Params): Promise<ShowPoll.Result | null> {
    return this.showPollRepository.show(data);
  }
}
