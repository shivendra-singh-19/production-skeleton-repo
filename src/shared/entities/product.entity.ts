import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
@Index('idx_products_banner_tag', ['bannerTag'])
@Index('idx_products_base_cost', ['baseCost'])
@Index('idx_products_country_of_origin', ['countryOfOrigin'])
@Index('idx_products_created_date', ['createdDate'])
@Index('idx_products_is_active', ['isActive'])
@Index('idx_products_mrp', ['mrp'])
@Index('idx_products_origin', ['origin'])
@Index('idx_products_pack_size', ['packSize'])
@Index('idx_products_pack_size_created', ['packSize', 'createdDate'])
@Index('idx_products_sale_price', ['salePrice'])
@Index('idx_products_secondary_subcategories_mv', ['secondarySubcategories'])
@Index('idx_products_shelf_life_pick', ['shelfLifeOnPicking'])
@Index('idx_products_shelf_life_recv', ['shelfLifeOnReceiving'])
@Index('idx_products_subcategory_mv', ['subcategoryCode'])
@Index('idx_products_total_shelf_life', ['totalShelfLife'])
@Index('idx_products_vendor_code', ['vendorCode'])
@Index('idx_products_vendor_name', ['vendorName'])
@Index('idx_products_vinculum_missing_since', ['vinculumMissingSince'])
@Index('idx_products_weight', ['weight'])
@Index('idx_products_weight_uom', ['weightUom'])
@Index('idx_products_weight_uom_created', ['weightUom', 'createdDate'])
@Index('sku_code', ['skuCode'], { unique: true })
export class Product {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 100 })
  skuCode!: string;

  @Column({ name: 'sku_name', type: 'varchar', length: 255 })
  skuName!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  classification!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  brand!: string | null;

  @Column({ name: 'sg_brand', type: 'varchar', length: 100, nullable: true })
  sgBrand!: string | null;

  @Column({
    name: 'country_of_origin',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  countryOfOrigin!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  weight!: string | null;

  @Column({ name: 'pack_size', type: 'varchar', length: 50, nullable: true })
  packSize!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  mrp!: string | null;

  @Column({
    name: 'sale_price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salePrice!: string | null;

  @Column({
    name: 'base_cost',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  baseCost!: string | null;

  @Column({ name: 'vendor_name', type: 'varchar', length: 255, nullable: true })
  vendorName!: string | null;

  @Column({ name: 'vendor_code', type: 'varchar', length: 50, nullable: true })
  vendorCode!: string | null;

  @Column({ name: 'is_active', type: 'boolean', nullable: true, default: true })
  isActive!: boolean | null;

  @Column({
    name: 'is_stocked',
    type: 'boolean',
    nullable: true,
    default: true,
  })
  isStocked!: boolean | null;

  @Column({
    name: 'is_saleable',
    type: 'boolean',
    nullable: true,
    default: true,
  })
  isSaleable!: boolean | null;

  @Column({ name: 'pdp_url', type: 'jsonb', nullable: true })
  pdpUrl!: Record<string, unknown> | null;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    nullable: true,
    default: () => 'now()',
  })
  createdDate!: Date | null;

  @Column({ name: 'created_by', type: 'varchar', length: 100, nullable: true })
  createdBy!: string | null;

  @Column({
    name: 'tax_category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  taxCategory!: string | null;

  @Column({ name: 'tax_percent', type: 'varchar', length: 20, nullable: true })
  taxPercent!: string | null;

  @Column({ type: 'boolean', default: false })
  giftable!: boolean;

  @Column({ name: 'category_code', type: 'jsonb', nullable: true })
  categoryCode!: Record<string, unknown> | null;

  @Column({ name: 'subcategory_code', type: 'jsonb', nullable: true })
  subcategoryCode!: Record<string, unknown> | null;

  @Column({ name: 'product_code', type: 'jsonb', nullable: true })
  productCode!: Record<string, unknown> | null;

  @Column({
    name: 'is_stackable',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isStackable!: boolean | null;

  @Column({ name: 'threshold_qty', type: 'int', nullable: true, default: 0 })
  thresholdQty!: number | null;

  @Column({
    name: 'is_purchasable',
    type: 'boolean',
    nullable: true,
    default: true,
  })
  isPurchasable!: boolean | null;

  @Column({
    name: 'handling_charges',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    default: () => '0.00',
  })
  handlingCharges!: string | null;

  @Column({
    name: 'std_margin',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    default: () => '0.00',
  })
  stdMargin!: string | null;

  @Column({
    name: 'threshold_alert_req',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  thresholdAlertReq!: boolean | null;

  @Column({
    name: 'is_ars_applicable',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isArsApplicable!: boolean | null;

  @Column({ name: 'stock_cover_days', type: 'int', nullable: true, default: 0 })
  stockCoverDays!: number | null;

  @Column({
    name: 'is_cost_based_on_margin',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isCostBasedOnMargin!: boolean | null;

  @Column({ name: 'sku_img', type: 'jsonb', nullable: true })
  skuImg!: Record<string, unknown> | null;

  @Column({ name: 'product_tag', type: 'varchar', length: 255, nullable: true })
  productTag!: string | null;

  @Column({ name: 'banner_tag', type: 'varchar', length: 64, nullable: true })
  bannerTag!: string | null;

  @Column({
    name: 'stock_qty',
    type: 'numeric',
    precision: 12,
    scale: 3,
    default: () => '0.000',
  })
  stockQty!: string;

  @Column({ name: 'stock_synced_at', type: 'timestamp', nullable: true })
  stockSyncedAt!: Date | null;

  @Column({ name: 'weight_uom', type: 'varchar', length: 10, nullable: true })
  weightUom!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ean!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  origin!: string | null;

  @Column({ name: 'total_shelf_life', type: 'int', nullable: true })
  totalShelfLife!: number | null;

  @Column({ name: 'shelf_life_on_receiving', type: 'int', nullable: true })
  shelfLifeOnReceiving!: number | null;

  @Column({ name: 'shelf_life_on_picking', type: 'int', nullable: true })
  shelfLifeOnPicking!: number | null;

  @Column({ name: 'secondary_subcategories', type: 'jsonb', nullable: true })
  secondarySubcategories!: Record<string, unknown> | null;

  @Column({ name: 'search_terms', type: 'jsonb', nullable: true })
  searchTerms!: Record<string, unknown> | null;

  @Column({ name: 'vinculum_missing_since', type: 'timestamp', nullable: true })
  vinculumMissingSince!: Date | null;

  @Column({ name: 'vinculum_miss_count', type: 'int', default: 0 })
  vinculumMissCount!: number;

  @Column({
    name: 'search_synonyms',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  searchSynonyms!: string | null;
}
