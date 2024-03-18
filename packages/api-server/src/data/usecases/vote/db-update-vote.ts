import { UpdateVote } from '@/domain/usecases';
import { UpdateVoteRepository } from '@/data/protocols';

export class DbUpdateVote implements UpdateVote {
  constructor(
    private readonly updateVoteRepository: UpdateVoteRepository,
  ) {}

  async update(data: UpdateVote.Params): Promise<UpdateVote.Result> {
    return this.updateVoteRepository.update(data);
  }
}
