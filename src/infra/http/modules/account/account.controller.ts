import { Controller, Post } from '@nestjs/common'

@Controller('/accounts')
export class AccountController {
  @Post()
  async create() {
    return { hello: 'hello' }
  }
}
