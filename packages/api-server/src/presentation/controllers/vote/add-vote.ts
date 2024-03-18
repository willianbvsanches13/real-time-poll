import { VoteModel } from '@/domain/models';
import { AddVote } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class AddVoteController implements Controller {
  constructor(private readonly addVote: AddVote) {}
  async handle(request: AddVoteController.Request): Promise<HttpResponse> {
    await this.addVote.add(request);
    return ok('ok');
  }
}

export namespace AddVoteController {
  export type Request = Omit<VoteModel, 'id' | 'created_at' | 'updated_at'>;
  export type Response = HttpResponse;
}
