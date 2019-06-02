import { IsString, IsEnum, MaxLength, MinLength } from 'class-validator';

enum STATUS {
  SENT = 'sent',
  PENDING = 'pending',
  DELIVERED = 'delivered',
}

export interface Sms {
  id?: string;
  sender: string;
  receiver: string;
  message: string;
  status: STATUS;
  createdat?: string;
}

export class CreateSmsDTO {
  @IsString()
  public readonly sender: string;

  @IsString()
  public readonly receiver: string;

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  public readonly message: string;

  @IsEnum(
    STATUS,
    {
      message: `status should be one of either ${STATUS.PENDING}, ${STATUS.SENT}, or ${STATUS.DELIVERED}`,
    },
  )
  public readonly status: STATUS;
}

// tslint:disable-next-line:max-classes-per-file
export class SmsDTO implements Sms {
  public readonly id: string;
  public readonly sender: string;
  public readonly receiver: string;
  public readonly message: string;
  public readonly status: STATUS;
  public readonly createdat: string;

  constructor({ id, sender, receiver, message, status, createdat }: Sms) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.status = status;
    this.createdat = createdat;
  }
}
