import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @OneToMany(() => SubCategory, (sub) => sub.category)
  subCategories: SubCategory[];

  @CreateDateColumn()
  createdAt: Date;
}
