import { Context } from '@/infra'
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'
import { Server } from 'socket.io'

export default (app: Express, ctx: Context, io: Server): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(join(__dirname, '../routes')).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router, ctx, io)
    }
  })
}
