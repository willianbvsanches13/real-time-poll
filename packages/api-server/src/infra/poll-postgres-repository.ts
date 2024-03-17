import { AddPollRepository } from "@/data/protocols/add-poll-repository";
import { Context } from "@/infra/prisma-adapter";

export class PollPostgresRepository implements AddPollRepository {
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
        ...data.options.map(option => ({
          id: option.id,
          poll_id: option.poll_id,
          description: option.description,
          votes: option.votes,
        }))
      ],
      deleted_at: new Date(0),
      updated_at: new Date(),
      id: data.id,
    }

    const poll = await this.prismaAdapter.prisma.poll.create({
      data: pollValue
    });

    const options = poll.options.map((option: AddPollRepository.Options)  => ({
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
}
