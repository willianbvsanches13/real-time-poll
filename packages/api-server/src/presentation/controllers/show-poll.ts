import { ShowPoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class ShowPollController implements Controller {
  constructor(private readonly showPoll: ShowPoll) {}
  async handle(request: ShowPollController.Request): Promise<HttpResponse> {
    const result = await this.showPoll.show(request);
    return ok(result);
  }
}

export namespace ShowPollController {
  export type Request = string;
  export type Response = HttpResponse;
}
