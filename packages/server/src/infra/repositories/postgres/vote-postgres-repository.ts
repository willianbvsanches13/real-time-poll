import { AddVoteRepository, UpdateVoteRepository } from "@/data/protocols";
import { Context } from "@/infra/adapters/prisma-adapter";

export class VotePostgresRepository implements AddVoteRepository, UpdateVoteRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddVoteRepository.Params): Promise<AddVoteRepository.Result | null> {
    const [vote, _up] = await this.prismaAdapter.prisma.$transaction([
      this.prismaAdapter.prisma.vote.upsert({
        where: {
          poll_id_user_id: {
            poll_id: data.poll_id,
            user_id: data.user_id,
          },
        },
        update: {
          option_ids: data.option_ids,
          updated_at: new Date(),
          deleted_at: null,
        },
        create: {
          id: data.id,
          poll_id: data.poll_id,
          option_ids: data.option_ids,
          user_id: data.user_id,
          created_at: data.created_at,
          updated_at: new Date(),
          deleted_at: null,
        }
      }),
      this.prismaAdapter.prisma.option.updateMany({
        where: {
          poll_id: data.poll_id,
          id: {
            in: data.option_ids
          },
        },
        data: {
          votes: {
            increment: 1
          }
        }
      })
    ]);

    return vote
  }

  async update(data: UpdateVoteRepository.Params): Promise<UpdateVoteRepository.Result> {
    const vote = await this.prismaAdapter.prisma.vote.findFirst({
      where: {
        id: data.id,
        poll_id: data.poll_id,
        user_id: data.user_id,
      }
    });

    if (!vote) {
      throw new Error('Vote not found');
    }

    const [_dec, _inc, updatedVote] = await this.prismaAdapter.prisma.$transaction([
      this.prismaAdapter.prisma.option.updateMany({
        where: {
          id: {
            in: vote.option_ids
          },
          poll_id: data.poll_id,
        },
        data: {
          votes: {
            decrement: 1
          }
        }
      }),
      this.prismaAdapter.prisma.option.updateMany({
        where: {
          poll_id: data.poll_id,
          id: {
            in: data.option_ids
          },
        },
        data: {
          votes: {
            increment: 1
          }
        }
      }),
      this.prismaAdapter.prisma.vote.update({
        where: {
          id: data.id,
          poll_id: data.poll_id,
          user_id: data.user_id,
        },
        data: {
          option_ids: data.option_ids,
        }
      }),
    ]);

    return updatedVote;
  }
}
