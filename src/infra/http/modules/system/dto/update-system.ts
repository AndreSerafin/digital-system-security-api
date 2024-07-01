import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const updateSystemBodySchema = z.object({
  acronym: z.string().optional(),
  attendance_email: z.string().email().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(SystemStatus).optional(),
  url: z.string().url().optional(),
  update_justification: z.string(),
})

export const updateSystemBodyValidationPipe = new ZodValidationPipe(
  updateSystemBodySchema,
)

export type UpdateSystemBodySchema = z.infer<typeof updateSystemBodySchema>
