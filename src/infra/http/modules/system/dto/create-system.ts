import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const createSystemBodySchema = z.object({
  acronym: z.string(),
  attendance_email: z.string().email(),
  description: z.string(),
  status: z.nativeEnum(SystemStatus),
  url: z.string().url(),
})

export class CreateSystemUserDTO extends createZodDto(createSystemBodySchema) {}
