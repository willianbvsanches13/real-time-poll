import { AddVote } from '@/domain/usecases';
import { AddVoteRepository } from '@/data/protocols';

export class DbAddVote implements AddVote {
  constructor(
    private readonly addVoteRepository: AddVoteRepository,
  ) {}

  async add(data: AddVote.Params): Promise<AddVote.Result | null> {

    return this.addVoteRepository.add({
      ...data,
      id: 'logged-vote',
      created_at: new Date(),
    });
  }
}
