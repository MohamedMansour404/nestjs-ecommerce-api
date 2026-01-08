import { Exclude } from 'class-transformer';
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
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserType, default: 'user' })
  role: UserType;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'varchar', nullable: true })
  verificationCode: string | null;

  @Column({ type: 'timestamp', nullable: true })
  verificationCodeExpires: Date | null;

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
