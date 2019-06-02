import { Query } from 'pg';

import { ContactController } from '../contact.controller';
import { ContactService } from '../contact.service';
import { SmsService } from '../../sms/sms.service';
import { DatabaseService } from '../../database/database.service';

const contacts = [
  {
    name: 'Test User 1',
    phone: '070985859',
  },
  {
    name: 'Test User 2',
    phone: '070985845',
  },
];

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

describe('CatsController', () => {
  let contactController: ContactController;
  let contactService: ContactService;
  let smsService: SmsService;
  let databaseService: DatabaseService;

  beforeAll(() => {
    databaseService = new DatabaseService();
    smsService = new SmsService(databaseService);
    contactService = new ContactService(databaseService);
    contactController = new ContactController(contactService, smsService);
  });

  describe('getAllContacts', () => {
    it('should return an array of contacts', async () => {
      const result: any = { rows: contacts };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await contactController.getAllContacts()).toEqual(contacts);
    });
  });

  describe('getSingleContact', () => {
    it('should return a single contact when it exists', async () => {
      const result: any = { rows: [contacts[0]] };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await contactController.getSingleContact({ phone: contacts[0].phone })).toEqual(contacts[0]);
    });

    it('should throw a 404 exception when contact does not exist', async () => {
      try {
        const result: any = { rows: [] };
        jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

        await contactController.getSingleContact({ phone: '098799876777' });
      } catch ({ response: { status } }) {
        expect(status).toEqual(404);
      }
    });
  });

  describe('getSmsReceivedByContact', () => {
    it('should return an array of sms received by the contact', async () => {
      const result: any = { rows: sms };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await contactController.getSmsReceivedByContact({ phone: contacts[0].phone })).toEqual(sms);
    });
  });

  describe('getSmsSentByContact', () => {
    it('should return an array of sms sent by the contact', async () => {
      const result: any = { rows: sms };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await contactController.getSmsSentByContact({ phone: contacts[0].phone })).toEqual(sms);
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact and return true', async () => {
      const result: any = { rows: [contacts[0]] };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

      expect(await contactController.deleteContact({ phone: contacts[0].phone })).toBeTruthy();
    });

    it('should throw a 422 exception when contact does not exist', async () => {
      try {
        const result: any = { rows: [] };
        jest.spyOn(databaseService.pool, 'query').mockResolvedValueOnce(result as Query);

        await contactController.deleteContact({ phone: contacts[0].phone });
      } catch ({ response: { status } }) {
        expect(status).toEqual(422);
      }
    });
  });

  describe('createContact', () => {
    it('should create and return a new contact when contact does not exist', async () => {
      const result: any = { rows: [] };
      jest.spyOn(databaseService.pool, 'query').mockResolvedValue(result as Query);

      expect(await contactController.createContact({ ...contacts[0] })).toEqual({});
    });

    it('should throw a 409 exception when contact already exists', async () => {
      try {
        const result: any = { rows: [contacts[0]] };
        jest.spyOn(databaseService.pool, 'query').mockResolvedValue(result as Query);

        await contactController.createContact({ ...contacts[0] });
      } catch ({ response: { status } }) {
        expect(status).toEqual(409);
      }
    });
  });
});
