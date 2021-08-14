import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { createHmac } from 'crypto';

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
  firstName: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'bool'})
  isActive: boolean;

  @BeforeInsert()
  hashPassword() {
    this.password = createHmac('sha256', this.password).digest('hex');
  }
}