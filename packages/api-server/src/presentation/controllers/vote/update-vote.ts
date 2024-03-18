import { VoteModel } from '@/domain/models';
import { UpdateVote } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok } from '@/presentation/helpers/http-helper';

export class UpdateVoteController implements Controller {
  constructor(private readonly updateVote: UpdateVote) {}
  async handle(request: UpdateVoteController.Request): Promise<HttpResponse> {
    const result = await this.updateVote.update(request);
    return ok(result);
  }
}

export namespace UpdateVoteController {
  export type Request = Omit<VoteModel, 'created_at' | 'updated_at'>;
  export type Response = HttpResponse;
}
