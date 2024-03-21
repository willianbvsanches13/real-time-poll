import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { Server } from 'socket.io';
import { Context } from "@/infra";
import { makeDbShowPoll } from "../factories/usecases";
import { ShowPoll } from "@/domain/usecases";

export class RealTimeVoteControllerDecorator implements Controller {
  private showPoll: ShowPoll;
  constructor(private readonly controller: Controller, ctx: Context, private readonly io: Server) {
    this.showPoll = makeDbShowPoll(ctx);
  }

  async handle(request: any): Promise<HttpResponse> {
    const response = await this.controller.handle(request);

    if (request.pollID) {
      const result = await this.showPoll.show(request.pollID);
      const event = {
        id: result?.id,
        title: result?.title,
        question: result?.question,
        options: result?.options.map((option) => ({
          id: option.id,
          description: option.description,
          votes: option.votes,
        })),
        start_at: result?.start_at,
        end_at: result?.end_at,
        can_change_vote: result?.can_change_vote,
        is_multiple: result?.is_multiple,
      }
      this.io.to(request.pollID).emit('updated-votes', event);
    }
    return response;
  }
}
