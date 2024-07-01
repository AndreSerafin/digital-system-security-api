import { UseCaseException } from './use-case-exception'

export class NotAllowedException extends Error implements UseCaseException {
  constructor() {
    super('Not Allowed')
  }
}
