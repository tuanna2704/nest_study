import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { createHmac } from 'crypto';
import ProductEntity from './product.entity'
import { Exclude, Expose } from 'class-transformer';
// Auto mapping to table has name like class name
// If you want to change it to mapping with the other table using @Entity('table_name')
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  department;

  @Column({type: 'varchar'})
  @Exclude()
  firstName: string;

  @Column({type: 'varchar'})
  @Exclude()
  lastName: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'bool'})
  isActive: boolean;

  @OneToMany(()=> ProductEntity, product => product.user)
  products: ProductEntity[];

  @BeforeInsert()
  hashPassword() {
    this.password = createHmac('sha256', this.password).digest('hex');
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`
  }
}