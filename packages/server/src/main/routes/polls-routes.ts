import { Context } from '@/infra'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddPollController, makeShowPollController, makeDeletePollController } from '@/main/factories/controllers/poll-factories'

import { Router } from 'express'

export default (router: Router, ctx: Context): void => {
  router.post('/polls/', adaptRoute(makeAddPollController(ctx)))
  router.get('/polls/:pollID', adaptRoute(makeShowPollController(ctx)))
  router.delete('/polls/:pollID', adaptRoute(makeDeletePollController(ctx)))
}
