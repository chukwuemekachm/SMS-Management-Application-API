import { Query } from 'pg';

import { SmsController } from '../sms.controller';
import { SmsService } from '../sms.service';
import { ContactService } from '../../contact/contact.service';
import { DatabaseService } from '../../database/database.service';
import { CreateSmsDTO } from '../sms.dto';

const sms = [
  {
    id: '076c861b-c1ae-44ce-89e9-cebba0aa036c',
    sender: '0707498901',
    receiver: '0703458901',
    message: 'Now I see.',
    status: 'sent',
    createdat: '2019-06-01T12:33:30.118Z',
  },
  {
    id: '076c861b-c1ae-44ce-89e9-cebba0aa036c',
    sender: '0707498901',
    receiver: '0703458901',
    message: 'Alright',
    status: 'sent',
    createdat: '2019-06-01T12:33:30.118Z',
  },
];

describe('SmsController', () => {
  let smsController: SmsController;
  let smsService: SmsService;
  let contactService: ContactService;
  let databaseService: DatabaseService;

  beforeAll(() => {
    databaseService = new DatabaseService();
    smsService = new SmsService(databaseService);
    contactService = new ContactService(databaseService);
    smsController = new SmsController(smsService, contactService);
  });

  describe('getAllSms', () => {
    it('should return an array of sms', async () => {
      const result: any = { rows: sms };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await smsController.getAllSms()).toEqual(sms);
    });
  });

  describe('getSingleSms', () => {
    it('should return a single sms', async () => {
      const result: any = { rows: [sms[0]] };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await smsController.getSingleSms({ id: sms[0].id })).toEqual(sms[0]);
    });
  });

  describe('createSms', () => {
    it('should create and return an sms', async () => {
      const result: any = { rows: [sms[0]] };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValue(result as Query);

      expect(await smsController.createSms({ ...sms[0] } as CreateSmsDTO)).toEqual(sms[0]);
    });
  });

  describe('createSms', () => {
    it('should throw a 422 when sender or receiver does not exist', async () => {
      try {
        const result: any = { rows: [] };
        jest.spyOn(databaseService.pool, 'query').mockResolvedValue(result as Query);

        await smsController.createSms({ ...sms[0] } as CreateSmsDTO);
      } catch ({ response: { status } }) {
        expect(status).toEqual(422);
      }
    });
  });
});
