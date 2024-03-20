import { AddVoteRepository } from "@/data/protocols";
import { Context } from "@/infra/adapters/prisma-adapter";

export class VoteLoggedRepository implements AddVoteRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result | null> {
    await this.prismaAdapter.prisma.option.updateMany({
      where: {
        poll_id: data.poll_id,
        id : {
          in: data.option_ids
        },
      },
      data: {
        votes: {
          increment: 1
        }
      }
    });

    console.log('Voted => ', data);

    return null
  }
}
