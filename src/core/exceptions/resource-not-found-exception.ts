import { UseCaseException } from './use-case-exception'

export class ResourceNotFoundException
  extends Error
  implements UseCaseException
{
  constructor() {
    super('Resource not found')
  }
}
