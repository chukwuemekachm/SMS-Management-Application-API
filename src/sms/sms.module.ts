import { Module } from '@nestjs/common';

import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { ContactService } from '../contact/contact.service';

@Module({
  controllers: [SmsController],
  exports: [SmsService],
  imports: [ContactService],
  providers: [SmsService, ContactService],
})
export class SmsModule {}
