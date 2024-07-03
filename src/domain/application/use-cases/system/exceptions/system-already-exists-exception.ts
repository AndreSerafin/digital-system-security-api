import { UseCaseException } from '@/core/exceptions/use-case-exception'

export class SystemAlreadyExistsException
  extends Error
  implements UseCaseException
{
  constructor(identifier: string) {
    super(`System "${identifier}" already exists`)
  }
}
