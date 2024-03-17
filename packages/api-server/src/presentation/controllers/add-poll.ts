import { InputPollModel } from '@/domain/models/poll';
import { AddPoll } from '@/domain/usecases/add-poll';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';

export class AddPollController implements Controller {
  constructor(private readonly addPoll: AddPoll) {}
  async handle(request: AddPollController.Request): Promise<HttpResponse> {
    await this.addPoll.add(request);
    return {
      statusCode: 200,
      body: 'ok',
    };
  }
}

export namespace AddPollController {
  export type Request = InputPollModel;
  export type Response = HttpResponse;
}
