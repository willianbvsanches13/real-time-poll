import { AddVote } from '@/domain/usecases';
import { AddVoteRepository, UniqueIdGenerator } from '@/data/protocols';

export class DbAddVote implements AddVote {
  constructor(
    private readonly addVoteRepository: AddVoteRepository,
    private readonly uniqueIdGenerator: UniqueIdGenerator,
  ) {}

  async add(data: AddVote.Params): Promise<AddVote.Result> {
    const uid = this.uniqueIdGenerator.generate();
    return this.addVoteRepository.add({
      ...data,
      id: uid,
      created_at: new Date(),
    });
  }
}
