import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { GenderType, UserType } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserType, default: 'user' })
  @IsNotEmpty()
  role: UserType;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsString()
  avatar: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  age: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsOptional()
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsString()
  address: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  verificationCode: string;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender: GenderType;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  updatedAt: Date;
}
