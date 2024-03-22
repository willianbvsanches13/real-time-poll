import { ShowPoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok, badRequest } from '@/presentation/helpers/http-helper';

export class ShowPollController implements Controller {
  constructor(private readonly showPoll: ShowPoll) {}
  async handle(request: ShowPollController.Request): Promise<HttpResponse> {
    if (!request.pollID) {
      return badRequest(new Error('pollID is required'));
    }
    const poll = await this.showPoll.show(request.pollID);

    if (!poll) {
      return badRequest(new Error('Poll not found'));
    }

    return ok({
      id: poll.id,
      title: poll.title,
      question: poll.question,
      options: poll.options.map((option) => ({ id: option.id, description: option.description, votes: option.votes })),
      can_change_vote: poll.can_change_vote,
      start_at: poll.start_at,
      end_at: poll.end_at,
    });
  }
}

export namespace ShowPollController {
  export type Request = { pollID: string };
  export type Response = HttpResponse;
}
