import { Module } from '@nestjs/common';

import { SmsService } from './sms.service';

@Module({
  controllers: [],
  exports: [SmsService],
  imports: [],
  providers: [SmsService],
})
export class SmsModule {}
