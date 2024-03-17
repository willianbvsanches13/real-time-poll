import { describe, it, expect, beforeEach } from '@jest/globals';
import { Prisma } from '@prisma/client';

import {
  MockContext,
  Context,
  createMockContext,
  pollMiddleware,
  softDeleteMiddleware,
  createContext,
} from '@/infra/prisma-adapter';

describe('softDeleteMiddleware Prisma', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    jest.useFakeTimers({
      now: new Date('2021-01-01'),
    });
  })

  it('should add Poll with correct values', async () => {
    const prisma = createContext();

    expect(prisma).toBeDefined();
  });

  it('should add middleware to context correctly', async () => {
    softDeleteMiddleware(ctx);
    expect(ctx.prisma.$use).toHaveBeenCalled();
  });

  it('should call middleware with deleteMany params', async () => {
    const params: Prisma.MiddlewareParams = {
      model: 'Poll',
      action: 'deleteMany',
      args: {
        data: {}
      },
      dataPath: [],
      runInTransaction: false,
    };

    const next = jest.fn();
    await pollMiddleware(params, next);

    expect(next).toHaveBeenCalledWith({
      ...params,
      action: 'updateMany',
      args: {
        data: {
          ...params.args.data,
          deleted_at: new Date()
        },
      },
    });
  });

  it('should call middleware with delete params', async () => {
    const params: Prisma.MiddlewareParams = {
      model: 'Poll',
      action: 'delete',
      args: {
        data: {}
      },
      dataPath: [],
      runInTransaction: false,
    };

    const next = jest.fn();
    await pollMiddleware(params, next);

    expect(next).toHaveBeenCalledWith({
      ...params,
      action: 'update',
      args: {
        data: {
          ...params.args.data,
          deleted_at: new Date()
        },
      },
    });
  });

  it('should call middleware with findFirst params', async () => {
    const params: Prisma.MiddlewareParams = {
      model: 'Poll',
      action: 'findFirst',
      args: {
        where: {}
      },
      dataPath: [],
      runInTransaction: false,
    };

    const next = jest.fn();
    await pollMiddleware(params, next);

    expect(next).toHaveBeenCalledWith({
      ...params,
      action: 'findFirst',
      args: {
        where: {
          ...params.args.where,
          deleted_at: null,
        },
      },
    });
  });

  it('should call middleware with findMany params', async () => {
    const params: Prisma.MiddlewareParams = {
      model: 'Poll',
      action: 'findMany',
      args: {
        where: {}
      },
      dataPath: [],
      runInTransaction: false,
    };

    const next = jest.fn();
    await pollMiddleware(params, next);

    expect(next).toHaveBeenCalledWith({
      ...params,
      action: 'findMany',
      args: {
        where: {
          ...params.args.where,
          deleted_at: null,
        },
      },
    });
  });

  it('should call middleware with findUnique params', async () => {
    const params: Prisma.MiddlewareParams = {
      model: 'Poll',
      action: 'findUnique',
      args: {
        where: {}
      },
      dataPath: [],
      runInTransaction: false,
    };

    const next = jest.fn();
    await pollMiddleware(params, next);

    expect(next).toHaveBeenCalledWith({
      ...params,
      action: 'findUnique',
      args: {
        where: {
          ...params.args.where,
          deleted_at: null,
        },
      },
    });
  });
});
