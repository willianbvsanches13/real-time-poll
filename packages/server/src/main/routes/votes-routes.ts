import { Context } from '@/infra'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddVoteController, makeUpdateVoteController } from '@/main/factories/controllers/vote-factories'

import { Router } from 'express'

export default (router: Router, ctx: Context): void => {
  console.log('polls-routes.ts')
  router.post('/:pollID/vote', adaptRoute(makeAddVoteController(ctx)))
  router.put('/:pollID/vote/:voteID', adaptRoute(makeUpdateVoteController(ctx)))
}
