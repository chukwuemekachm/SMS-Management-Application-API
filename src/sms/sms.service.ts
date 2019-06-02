import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Sms, CreateSmsDTO, SmsDTO } from './sms.dto';

@Injectable()
export class SmsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({ sender, receiver, message, status }: CreateSmsDTO): Promise<Sms> {
    try {
      const query = `
        INSERT INTO sms(sender, receiver, message, status, createdat)
        VALUES($1, $2, $3, $4, NOW())
        RETURNING id, sender, receiver, message, status, createdat;
      `;
      const values = [sender, receiver, message, status];
      const { rows: [row] } = await this.databaseService.pool.query(query, values);
      return new SmsDTO(row);
    } catch (error) {
      throw error;
    }
  }

  async get(condition = {}): Promise<Sms[]> {
    try {
      let query = `
        SELECT id, sender, receiver, message, status, createdAt
        FROM sms
        WHERE 1=1
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` AND ${key} = $${values.length + 1}`;
        values.push(condition[key]);
      }
      query += ';';
      const { rows } = await this.databaseService.pool.query(query, values);
      return rows.map(row => new SmsDTO(row));
    } catch (error) {
      throw error;
    }
  }

  async getOne(condition): Promise<Sms> {
    try {
      const [row] = await this.get(condition);
      return row;
    } catch (error) {
      throw error;
    }
  }

  async getSentSms(sender: string): Promise<Sms[]> {
    try {
      const rows = await this.get({ sender });
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getReceivedSms(receiver: string): Promise<Sms[]> {
    try {
      const rows = await this.get({ receiver });
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
