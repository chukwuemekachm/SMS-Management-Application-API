import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { SmsModule } from './sms/sms.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    DatabaseModule,
    SmsModule,
    ContactModule,
  ],
})
export class AppModule {}
