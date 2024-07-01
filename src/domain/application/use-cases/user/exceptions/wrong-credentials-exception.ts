import { UseCaseException } from '@/core/exceptions/use-case-exception'

export class WrongCredentialsException
  extends Error
  implements UseCaseException
{
  constructor() {
    super('Credentials are not valid')
  }
}
