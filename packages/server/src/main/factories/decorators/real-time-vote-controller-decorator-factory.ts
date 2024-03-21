import { Context } from "@/infra";
import { RealTimeVoteControllerDecorator } from "@/main/decorators";
import { Controller } from "@/presentation/protocols/controller";
import { Server } from "socket.io";

export const makeRealTimeVoteControllerDecorator = (controller: Controller, ctx: Context, io: Server): Controller => {
  return new RealTimeVoteControllerDecorator(controller, ctx, io);
}
