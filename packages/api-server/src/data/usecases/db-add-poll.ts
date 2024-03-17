import { AddPoll } from '@/domain/usecases';
import { AddPollRepository, UniqueIdGenerator } from '@/data/protocols';

export class DbAddPoll implements AddPoll {
  constructor(
    private readonly addPollRepository: AddPollRepository,
    private readonly uniqueIdGenerator: UniqueIdGenerator,
  ) {}

  async add(data: AddPoll.Params): Promise<AddPoll.Result> {
    const uid = this.uniqueIdGenerator.generate();
    return this.addPollRepository.add({
      ...data,
      id: uid,
      options: data.options.map(option => ({
        ...option,
        id: this.uniqueIdGenerator.generate(),
        poll_id: uid,
      }))
    });
  }
}
