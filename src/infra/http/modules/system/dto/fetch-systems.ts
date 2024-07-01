import { ZodValidationPipe } from '@/infra/http/pipes/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

export const fetchSystemsQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  acronym: z.string().optional(),
  attendance_email: z.string().email().optional(),
  description: z.string().optional(),
})

export const fetchSystemsQueryParamsValidationPipe = new ZodValidationPipe(
  fetchSystemsQueryParamsSchema,
)

export type FetchSystemsQueryParamsSchema = z.infer<
  typeof fetchSystemsQueryParamsSchema
>
