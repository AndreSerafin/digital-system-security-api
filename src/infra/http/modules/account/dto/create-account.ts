import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const createAccountBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
})

export const createAccountBodyValidationPipe = new ZodValidationPipe(
  createAccountBodySchema,
)

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>
