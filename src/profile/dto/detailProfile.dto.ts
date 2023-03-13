import { IsNotEmpty } from 'class-validator';

export class DetailProfileDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;

  createdAt: Date;
}
