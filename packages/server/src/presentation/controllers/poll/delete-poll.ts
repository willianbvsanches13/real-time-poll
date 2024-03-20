import { DeletePoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class DeletePollController implements Controller {
  constructor(private readonly deletePoll: DeletePoll) {}
  async handle(request: DeletePollController.Request): Promise<HttpResponse> {
    if (!request.pollID) {
      return {
        statusCode: 400,
        body: new Error('pollID is required')
      };
    }
    const result = await this.deletePoll.delete(request.pollID);
    return ok(result);
  }
}

export namespace DeletePollController {
  export type Request = { pollID: string };
  export type Response = HttpResponse;
}
