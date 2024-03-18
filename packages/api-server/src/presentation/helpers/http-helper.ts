import { HttpResponse } from '@/presentation/protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
