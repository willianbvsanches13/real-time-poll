import { AddPollController, ShowPollController, DeletePollController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols/controller";
import { makeDbAddPoll, makeDbDeletePoll, makeDbShowPoll } from "@/main/factories/usecases";
import { Context } from "@/infra";

export const makeAddPollController = (ctx: Context): Controller => {
  const controller = new AddPollController(makeDbAddPoll(ctx));
  return controller;
}

export const makeShowPollController = (ctx: Context): Controller => {
  const controller = new ShowPollController(makeDbShowPoll(ctx));
  return controller;
}

export const makeDeletePollController = (ctx: Context): Controller => {
  const controller = new DeletePollController(makeDbDeletePoll(ctx));
  return controller;
}
