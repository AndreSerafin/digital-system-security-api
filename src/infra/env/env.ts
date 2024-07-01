import { z } from 'nestjs-zod/z'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
  FIRST_SUPER_ADMIN_NAME: z.string(),
  FIRST_SUPER_ADMIN_EMAIL: z.string().email(),
  FIRST_SUPER_ADMIN_PASSWORD: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
