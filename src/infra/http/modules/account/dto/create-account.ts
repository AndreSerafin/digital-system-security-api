import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const createAccountBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
})

export class CreateAccountDTO extends createZodDto(createAccountBodySchema) {}
