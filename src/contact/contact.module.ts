import { Module } from '@nestjs/common';

import { ContactService } from './contact.service';

@Module({
  controllers: [],
  exports: [ContactService],
  imports: [],
  providers: [ContactService],
})
export class ContactModule {}
