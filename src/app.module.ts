import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    DatabaseModule,
    SmsModule,
  ],
})
export class AppModule {}
