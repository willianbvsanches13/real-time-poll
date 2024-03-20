import { Prisma, PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export type Context = {
  prisma: PrismaClient
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

export const createContext = (): Context => {
  return {
    prisma: new PrismaClient(),
  }
}
export async function pollMiddleware(params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>): Promise<any> {
  if (params.model === 'Poll') {
    switch (params.action) {
      case 'deleteMany':
        params.action = 'updateMany'
        params.args.data = {
          ...params.args.data,
          deleted_at: new Date()
        }
        break
      case 'delete':
        params.action = 'update'
        params.args.data = {
          ...params.args.data,
          deleted_at: new Date()
        }
        break
      case 'findFirst':
      case 'findMany':
      case 'findUnique':
        params.args.where = {
          ...params.args.where,
          deleted_at: null
        }
        break
    }
  }
  return next(params)
}

export const softDeleteMiddleware = (ctx: Context) => {
  ctx.prisma.$use(pollMiddleware)
}
