import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: 'cart_items' })
@Index('uq_cart_items_line', ['cartId', 'productId'], { unique: true })
export class CartItem {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'cart_id', type: 'int' })
  cartId!: number;

  @Column({ name: 'product_id', type: 'int' })
  productId!: number;

  @Column({ name: 'sku_id', type: 'varchar', length: 64, nullable: true })
  skuId!: string | null;

  @Column({ name: 'variant_id', type: 'varchar', length: 64, nullable: true })
  variantId!: string | null;

  @Column({ type: 'int', default: 1 })
  qty!: number;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'cart_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cart_items_cart',
  })
  cart!: Cart;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cart_items_product',
  })
  product!: Product;
}
