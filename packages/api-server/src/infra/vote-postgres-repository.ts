import { AddVoteRepository, UpdateVoteRepository } from "@/data/protocols";
import { Context } from "@/infra/prisma-adapter";

export class VotePostgresRepository implements AddVoteRepository, UpdateVoteRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result> {
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

  async update(data: UpdateVoteRepository.Params): Promise<UpdateVoteRepository.Result> {
    return this.prismaAdapter.prisma.vote.update({
      where: {
        id: data.id,
        poll_id: data.poll_id,
        user_id: data.user_id,
      },
      data: {
        option_ids: data.option_ids,
      }
    });
  }
}
