import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const updateSystemBodySchema = z.object({
  acronym: z.string().optional(),
  attendance_email: z.string().email().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(SystemStatus).optional(),
  url: z.string().url().optional(),
  update_justification: z.string(),
})

export class UpdateSystemUserDTO extends createZodDto(updateSystemBodySchema) {}
