import { Module } from '@nestjs/common';

import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { SmsService } from '../sms/sms.service';

@Module({
  controllers: [ContactController],
  exports: [ContactService],
  imports: [SmsService],
  providers: [ContactService, SmsService],
})
export class ContactModule {}
