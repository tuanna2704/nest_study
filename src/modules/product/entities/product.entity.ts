import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export default class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  content: string;

  @Column()
  outOfStock: boolean;
}
