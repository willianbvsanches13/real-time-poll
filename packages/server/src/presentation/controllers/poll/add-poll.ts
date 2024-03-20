import { InputPollModel } from '@/domain/models';
import { AddPoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class AddPollController implements Controller {
  constructor(private readonly addPoll: AddPoll) {}
  async handle(request: AddPollController.Request): Promise<HttpResponse> {
    await this.addPoll.add(request);
    return ok('ok');
  }
}

export namespace AddPollController {
  export type Request = InputPollModel;
  export type Response = HttpResponse;
}
