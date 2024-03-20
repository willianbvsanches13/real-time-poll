import { AddPollRepository, DeletePollRepository, ShowPollRepository } from "@/data/protocols";
import { Context } from "@/infra/adapters/prisma-adapter";
import { Prisma } from "@prisma/client";

export class PollPostgresRepository implements AddPollRepository, DeletePollRepository, ShowPollRepository {
  constructor(private readonly prismaAdapter: Context) { }
  async add(data: AddPollRepository.Params): Promise<AddPollRepository.Result> {
    const pollValue = {
      can_change_vote: data.can_change_vote,
      end_at: data.end_at,
      is_multiple: data.is_multiple,
      question: data.question,
      show_results_after_much_votes: data.show_results_after_much_votes,
      start_at: data.start_at,
      title: data.title,
      options: [
        ...data?.options.map(option => ({
          id: option.id,
          poll_id: option.poll_id,
          description: option.description,
          votes: option.votes || 0,
        }))
      ],
      updated_at: new Date(),
      id: data.id,
    }

    const poll = await this.prismaAdapter.prisma.poll.create({
      data: pollValue
    });

    let jsonOptions = poll?.options as Prisma.InputJsonArray;
    const options = jsonOptions.map((option: AddPollRepository.Options) => ({
      id: option?.id,
      poll_id: poll.id,
      description: option?.description,
      votes: option?.votes,
    }));

    return {
      ...poll,
      options,
    };
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.prismaAdapter.prisma.poll.delete({
      where: {
        id
      }
    });
    return !!result;
  }

  async show(id: string): Promise<ShowPollRepository.Result | null> {
    const poll = await this.prismaAdapter.prisma.poll.findFirst({
      where: {
        id,
        deleted_at: null
      },
    });

    if (!poll) {
      return null;
    }

    let jsonOptions = poll?.options as Prisma.InputJsonArray;
    const options = jsonOptions.map((option: AddPollRepository.Options) => ({
      id: option?.id,
      poll_id: poll?.id,
      description: option?.description,
      votes: option?.votes,
    }))

    return {
      ...poll,
      options: options
    };
  }
}
