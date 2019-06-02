import { IsString, MinLength, MaxLength } from 'class-validator';

export interface Contact {
  phone: string;
  name: string;
  createdat: string;
}

export class CreateContactDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  public readonly phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  public readonly name: string;
}

// tslint:disable-next-line:max-classes-per-file
export class ContactDTO implements Contact {
  public readonly phone: string;
  public readonly name: string;
  public readonly createdat: string;

  constructor({ phone, name, createdat }) {
    this.name = name;
    this.phone = phone;
    this.createdat = createdat;
  }
}
