import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const createSystemBodySchema = z.object({
  acronym: z.string(),
  attendance_email: z.string().email(),
  description: z.string(),
  status: z.nativeEnum(SystemStatus),
  url: z.string().url(),
})

export const createSystemBodyValidationPipe = new ZodValidationPipe(
  createSystemBodySchema,
)

export type CreateSystemBodySchema = z.infer<typeof createSystemBodySchema>
