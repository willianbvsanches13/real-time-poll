import { AddVoteRepository } from "@/data/protocols";
import { Context } from "@/infra/prisma-adapter";

export class VotePostgresRepository implements AddVoteRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result> {
    const voteValue = {
      id: data.id,
      poll_id: data.poll_id,
      option_ids: data.option_ids,
      user_id: data.user_id,
      created_at: data.created_at,
      updated_at: new Date(),
    }

    return this.prismaAdapter.prisma.vote.create({
      data: {
        id: data.id,
        poll_id: data.poll_id,
        option_ids: data.option_ids,
        user_id: data.user_id,
        created_at: data.created_at,
        updated_at: new Date(),
        deleted_at: null,
      }
    });
  }
}
