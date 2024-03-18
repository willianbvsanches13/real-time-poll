export interface DeletePollRepository {
  delete: (data: DeletePollRepository.Params) => Promise<DeletePollRepository.Result>;
}

export namespace DeletePollRepository {
  export type Params = string;
  export type Result = boolean;
}

