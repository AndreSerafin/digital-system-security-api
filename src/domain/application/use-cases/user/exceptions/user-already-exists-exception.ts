import { UseCaseException } from '@/core/exceptions/use-case-exception'

export class UserAlreadyExistsException
  extends Error
  implements UseCaseException
{
  constructor(identifier: string) {
    super(`User "${identifier}" already exists`)
  }
}
