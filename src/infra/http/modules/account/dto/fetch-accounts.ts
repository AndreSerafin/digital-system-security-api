import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const fetchAccountsBodySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  email: z.string().email().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
})

export class FetchAccountsDTO extends createZodDto(fetchAccountsBodySchema) {}
