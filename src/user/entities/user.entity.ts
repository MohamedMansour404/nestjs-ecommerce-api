import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
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

  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Password must be between 3 and 20 characters' })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  @IsNotEmpty()
  Role: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsString()
  Avatar: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  Age: number;

  @Column({ type: 'varchar', length: 11, nullable: true })
  @IsOptional()
  @IsPhoneNumber('EG')
  Phone_Number: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsString()
  Address: string;

  @Column({ type: 'boolean', default: false })
  Active: boolean;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  Verification_Code: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
