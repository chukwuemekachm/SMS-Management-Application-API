import 'dotenv/config';
import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';

import { RedirectInterceptor } from './shared/redirect.interceptor';

const {
  API_DOCS = 'https://documenter.getpostman.com/view/3397523/S1TVYdfr?version=latest',
} = process.env;

@Controller('/api/v1')
export class AppController {
  @Get('/docs')
  @UseInterceptors(new RedirectInterceptor(API_DOCS))
  // tslint:disable-next-line:no-empty
  async getAllSms() {}
}
