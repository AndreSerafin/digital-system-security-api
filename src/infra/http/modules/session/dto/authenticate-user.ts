import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export class AuthenticateUserDTO extends createZodDto(
  authenticateUserBodySchema,
) {}
