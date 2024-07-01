import { Module } from '@nestjs/common'
import { AccountModule } from './modules/account/account.module'
import { SessionModule } from './modules/session/session.module'

@Module({
  imports: [AccountModule, SessionModule],
})
export class HttpModule {}
