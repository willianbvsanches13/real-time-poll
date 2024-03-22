import { UpdateVote } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok, serverError } from '@/presentation/helpers/http-helper';

export class UpdateVoteController implements Controller {
  constructor(private readonly updateVote: UpdateVote) {}
  async handle(request: UpdateVoteController.Request): Promise<HttpResponse> {
    const data: UpdateVote.Params = {
      id: request.voteID,
      poll_id: request.pollID,
      option_ids: request.optionIDs,
      user_id: request.user_id
    };
    try {
      const result = await this.updateVote.update(data);
      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }
}

export namespace UpdateVoteController {
  export type Request = {
    voteID: string;
    pollID: string;
    optionIDs: string[];
    user_id: string;
  };
  export type Response = HttpResponse;
}
