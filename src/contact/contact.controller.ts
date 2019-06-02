import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ContactService } from './contact.service';
import { SmsService } from '../sms/sms.service';
import { CreateContactDTO } from './contact.dto';

@Controller('/api/v1/contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly smsService: SmsService,
    ) {}

  @Get()
  async getAllContacts() {
    return this.contactService.get();
  }

  @Post()
  async createContact(@Body() { phone, name }: CreateContactDTO) {
    const contact = await this.contactService.getOne({ phone });

    if (contact) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `a contact with ${phone} already exists`,
      }, 409);
    }

    return this.contactService.create({ phone, name });
  }

  @Get(':phone')
  async getSingleContact(@Param() params) {
    const { phone } = params;
    const contact = await this.contactService.getOne({ phone });

    if (!contact) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Cannot GET /api/v1/contact/${phone}`,
      }, 404);
    }

    return contact;
  }

  @Get(':phone/sms/sent')
  async getSmsSentByContact(@Param() params) {
    const { phone } = params;
    return this.smsService.getSentSms(phone);
  }

  @Get(':phone/sms/received')
  async getSmsReceivedByContact(@Param() params) {
    const { phone } = params;
    return this.smsService.getReceivedSms(phone);
  }

  @Delete(':phone')
  async deleteContact(@Param() params) {
    const { phone } = params;
    const contact = await this.contactService.getOne({ phone });

    if (!contact) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `Cannot DELETE /api/v1/contact/${phone}`,
      }, 422);
    }

    await this.contactService.delete({ phone });
    return true;
  }
}
