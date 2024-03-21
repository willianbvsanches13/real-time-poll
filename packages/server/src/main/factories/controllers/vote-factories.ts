import { AddVoteController, UpdateVoteController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols/controller";
import { Context } from "@/infra";
import { makeDbAddPersistedVote, makeDbAddLoggedVote, makeDbUpdateVote, makeDbShowPoll } from "@/main/factories/usecases";
import { makeRealTimeVoteControllerDecorator } from '@/main/factories/decorators/real-time-vote-controller-decorator-factory'
import { Server } from "socket.io";

export const makeAddVoteController = (ctx: Context, io: Server): Controller => {
  const controller = new AddVoteController(
    makeDbAddPersistedVote(ctx),
    makeDbAddLoggedVote(ctx),
    makeDbShowPoll(ctx),
  );
  return makeRealTimeVoteControllerDecorator(controller, ctx, io);
}

export const makeUpdateVoteController = (ctx: Context, io: Server): Controller => {
  const controller = new UpdateVoteController(makeDbUpdateVote(ctx));
  return makeRealTimeVoteControllerDecorator(controller, ctx, io);
}

