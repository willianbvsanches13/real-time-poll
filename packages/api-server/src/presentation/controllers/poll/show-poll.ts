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
    const result = await this.showPoll.show(request.pollID);
    return ok(result);
  }
}

export namespace ShowPollController {
  export type Request = { pollID: string };
  export type Response = HttpResponse;
}
