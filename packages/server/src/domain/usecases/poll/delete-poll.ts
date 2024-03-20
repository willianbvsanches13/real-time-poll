export interface DeletePoll {
  delete: (pollID: DeletePoll.Params) => Promise<DeletePoll.Result>;
}

export namespace DeletePoll {
  export type Params = string;
  export type Result = boolean;
}
