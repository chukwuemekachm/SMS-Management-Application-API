import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Contact, CreateContactDTO, ContactDTO } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({ name, phone }: CreateContactDTO): Promise<Contact> {
    try {
      const query = `
        INSERT INTO contact(name, phone, createdat)
        VALUES($1, $2, NOW())
        RETURNING name, phone, createdat;
      `;
      const values = [name, phone];
      const { rows: [row] } = await this.databaseService.pool.query(query, values);
      return new ContactDTO(row || {});
    } catch (error) {
      throw error;
    }
  }

  async get(condition = {}): Promise<Contact[]> {
    try {
      let query = `
        SELECT name, phone, createdAt
        FROM contact
        WHERE 1=1
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` AND ${key} = $${values.length + 1}`;
        values.push(condition[key]);
      }
      query += ';';
      const { rows } = await this.databaseService.pool.query(query, values);
      return rows.map(row => new ContactDTO(row));
    } catch (error) {
      throw error;
    }
  }

  async getOne(condition): Promise<Contact> {
    try {
      const [row] = await this.get(condition);
      return row;
    } catch (error) {
      throw error;
    }
  }

  async delete(condition = {}): Promise<any> {
    try {
      let query = `
        DELETE FROM contact
        WHERE 1=1
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` AND ${key} = $${values.length + 1}`;
        values.push(condition[key]);
      }
      query += ';';
      return this.databaseService.pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}
