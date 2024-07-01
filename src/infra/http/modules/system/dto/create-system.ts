import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const createsystemUserBodySchema = z.object({
  acronym: z.string(),
  attendanceEmail: z.string().email(),
  authorId: z.string(),
  description: z.string(),
  status: z.nativeEnum(SystemStatus),
  url: z.string().url(),
})

export const createsystemUserBodyValidationPipe = new ZodValidationPipe(
  createsystemUserBodySchema,
)

export type CreateSystemUserBodySchema = z.infer<
  typeof createsystemUserBodySchema
>
