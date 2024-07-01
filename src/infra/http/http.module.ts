import { Module } from '@nestjs/common'
import { AccountModule } from './modules/account/account.module'
import { SessionModule } from './modules/session/session.module'
import { SystemModule } from './modules/system/system.module'

@Module({
  imports: [AccountModule, SessionModule, SystemModule],
})
export class HttpModule {}
