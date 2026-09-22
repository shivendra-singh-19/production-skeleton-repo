import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CartGiftItemsItemType } from './enums';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_gift_items' })
@Index('uq_cart_gift_sku', ['cartId', 'skuCode'], { unique: true })
@Check('cart_gift_items_chk_1', '((qty > 0))')
export class CartGiftItem {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'cart_id', type: 'int' })
  cartId!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 50 })
  skuCode!: string;

  @Column({ name: 'item_type', type: 'enum', enum: CartGiftItemsItemType })
  itemType!: CartGiftItemsItemType;

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
    foreignKeyConstraintName: 'fk_cart_gift_items_cart',
  })
  cart!: Cart;
}
