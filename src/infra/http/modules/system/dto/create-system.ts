import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const createSystemBodySchema = z.object({
  acronym: z.string(),
  attendance_email: z.string().email().optional(),
  description: z.string(),
  status: z.nativeEnum(SystemStatus).optional(),
  url: z.string().url(),
})

export class CreateSystemUserDTO extends createZodDto(createSystemBodySchema) {}
