import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { SmsService } from './sms.service';
import { CreateSmsDTO } from './sms.dto';
import { ContactService } from '../contact/contact.service';

@Controller('/api/v1/sms')
export class SmsController {
  constructor(
    private smsService: SmsService,
    private contactService: ContactService,
  ) {}

  @Get()
  async getAllSms() {
    return this.smsService.get();
  }

  @Post()
  async createSms(@Body() sms: CreateSmsDTO) {
    const { sender, receiver } = sms;
    const [senderContact, receiverContact] = await Promise.all([
      this.contactService.getOne({ phone: sender }),
      this.contactService.getOne({ phone: receiver }),
    ]);

    if (!senderContact) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `${sender} is not a valid contact on the platform`,
      }, 422);
    }
    if (!receiverContact) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `${receiver} is not a valid contact on the platform`,
      }, 422);
    }

    return this.smsService.create(sms);
  }

  @Get(':id')
  async getSingleSms(@Param() params) {
    const { id } = params;
    return this.smsService.getOne({ id });
  }
}
