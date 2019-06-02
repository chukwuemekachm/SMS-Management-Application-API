import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { SmsModule } from './sms/sms.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    DatabaseModule,
    SmsModule,
    ContactModule,
  ],
})
export class AppModule {}
