import { AddVoteRepository } from "@/data/protocols";
import { Context } from "@/infra/adapters/prisma-adapter";
import { Prisma } from "@prisma/client";

export class VoteLoggedRepository implements AddVoteRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result | null> {
    const poll = await this.prismaAdapter.prisma.poll.findFirst({
      where: {
        id: data.poll_id,
        deleted_at: null,
      }
    });

    if (!poll) {
      throw new Error('Poll not found');
    }

    for (const option_id of data.option_ids) {
      if (Array.isArray(poll.options)) {
        for (const option of poll.options as { id: string, votes: number }[]) {
          option.votes = option.votes || 0;
          if (option !== null && option !== undefined) {
            if (option.id === option_id) {
              option.votes += 1;
            }
          }
        }
      }
    }
    await this.prismaAdapter.prisma.poll.update({
      where: {
        id: data.poll_id,
      },
      data: {
        options: poll.options as Prisma.InputJsonArray,
      }
    });

    console.log('Voted => ', data);

    return null
  }
}
