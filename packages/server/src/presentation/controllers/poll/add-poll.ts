import { InputPollModel } from '@/domain/models';
import { AddPoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class AddPollController implements Controller {
  constructor(private readonly addPoll: AddPoll) {}
  async handle(request: AddPollController.Request): Promise<HttpResponse> {
    const poll = await this.addPoll.add(request);
    return ok({
      id: poll.id,
      title: poll.title,
      question: poll.question,
      options: poll.options.map((option) => ({ id: option.id, value: option.description })),
      can_change_vote: poll.can_change_vote,
      start_at: poll.start_at,
      end_at: poll.end_at,
    });
  }
}

export namespace AddPollController {
  export type Request = InputPollModel;
  export type Response = HttpResponse;
}
