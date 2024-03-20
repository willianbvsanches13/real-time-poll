import { AddVoteController, UpdateVoteController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols/controller";
import { Context } from "@/infra";
import { makeDbAddPersistedVote, makeDbAddLoggedVote, makeDbUpdateVote, makeDbShowPoll } from "@/main/factories/usecases";

export const makeAddVoteController = (ctx: Context): Controller => {
  const controller = new AddVoteController(
    makeDbAddPersistedVote(ctx),
    makeDbAddLoggedVote(ctx),
    makeDbShowPoll(ctx),
  );
  return controller;
}

export const makeUpdateVoteController = (ctx: Context): Controller => {
  const controller = new UpdateVoteController(makeDbUpdateVote(ctx));
  return controller;
}

