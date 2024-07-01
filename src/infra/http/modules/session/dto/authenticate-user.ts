import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const authenticateUserBodyValidationPipe = new ZodValidationPipe(
  authenticateUserBodySchema,
)

export type AuthenticateUserBodySchema = z.infer<
  typeof authenticateUserBodySchema
>
