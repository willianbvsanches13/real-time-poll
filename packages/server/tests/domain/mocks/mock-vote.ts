import { AddVote } from "@/domain/usecases";
import { AddVoteController } from "@/presentation/controllers";

export const mockAddVoteParams = (): AddVote.Params => ({
  poll_id: "any_poll_id",
  user_id: "any_user_id",
  option_ids: ["any_option_id"],
});

export const mockAddVoteControllerParams = (): AddVoteController.Request => ({
  pollID: "any_poll_id",
  user_id: "any_user_id",
  optionIDs: ["any_option_id"],
});

export const mockAddVoteResult = (): AddVote.Result => ({
  id: "any_id",
  poll_id: "any_poll_id",
  user_id: "any_user_id",
  option_ids: ["any_option_id"],
  created_at: new Date(),
  updated_at: new Date(),
});
