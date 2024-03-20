import { AddVote, ShowPoll } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols/controller';
import { HttpResponse } from '@/presentation/protocols/http';
import { ok, serverError } from '@/presentation/helpers/http-helper';

export class AddVoteController implements Controller {
  constructor(
    private readonly addPersistedVote: AddVote,
    private readonly addLoggedVote: AddVote,
    private readonly showPoll: ShowPoll,
  ) {}
  async handle(request: AddVoteController.Request): Promise<HttpResponse> {
    const data: AddVote.Params = {
      poll_id: request.pollID,
      option_ids: request.optionIDs,
      user_id: request.user_id
    };

    try {
      const poll = await this.showPoll.show(request.pollID);
      if (poll?.can_change_vote) {
        await this.addPersistedVote.add(data);
        return ok('ok');
      }
      await this.addLoggedVote.add(data);
      return ok('ok');
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }
}

export namespace AddVoteController {
  export type Request = {
    pollID: string;
    optionIDs: string[];
    user_id: string;
  };
  export type Response = HttpResponse;
}
