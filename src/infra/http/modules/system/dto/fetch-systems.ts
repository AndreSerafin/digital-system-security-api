import { createZodDto } from 'nestjs-zod'
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

export class FetchSystemsDTO extends createZodDto(
  fetchSystemsQueryParamsSchema,
) {}
