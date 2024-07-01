import { UseCaseException } from '@/core/exceptions/use-case-exception'

export class UserNotFoundException extends Error implements UseCaseException {
  constructor() {
    super('User not found')
  }
}
