import { Context } from '@/infra'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddVoteController, makeUpdateVoteController } from '@/main/factories/controllers/vote-factories'

import { Router } from 'express'
import { Server } from 'socket.io'

export default (router: Router, ctx: Context, io: Server): void => {
  console.log('polls-routes.ts')
  router.post('/polls/:pollID/vote', adaptRoute(makeAddVoteController(ctx, io)))
  router.put('/polls/:pollID/vote/:voteID', adaptRoute(makeUpdateVoteController(ctx, io)))
}
