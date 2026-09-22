// Generated from the production database. Postgres enum types.

/** pg type `cart_gift_items_item_type_enum` */
export enum CartGiftItemsItemType {
  GIFT_SAMPLE = 'gift_sample',
  GIFT_LADDER = 'gift_ladder',
  STEAL_DEAL = 'steal_deal',
  TOP_PICK = 'top_pick',
}

/** pg type `catalog_sync_runs_status_enum` */
export enum CatalogSyncRunsStatus {
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

/** pg type `catalog_sync_state_last_run_status_enum` */
export enum CatalogSyncStateLastRunStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

/** pg type `coupons_discount_type_enum` */
export enum CouponsDiscountType {
  FLAT = 'flat',
  PERCENTAGE = 'percentage',
  SOL_COINS = 'sol_coins',
}

/** pg type `notification_templates_daypart_enum` */
export enum NotificationTemplatesDaypart {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening',
  NIGHT = 'Night',
}

/** pg type `order_attribution_events_platform_enum` */
export enum OrderAttributionEventsPlatform {
  APPSFLYER = 'appsflyer',
  META = 'meta',
  GA4 = 'ga4',
}

/** pg type `order_item_status_history_category_enum` */
export enum OrderItemStatusHistoryCategory {
  FULFILLMENT = 'FULFILLMENT',
  PAYMENT = 'PAYMENT',
}

/** pg type `order_items_item_type_enum` */
export enum OrderItemsItemType {
  REGULAR = 'regular',
  GIFT_SAMPLE = 'gift_sample',
  GIFT_LADDER = 'gift_ladder',
  STEAL_DEAL = 'steal_deal',
  TOP_PICK = 'top_pick',
}

/** pg type `order_status_history_category_enum` */
export enum OrderStatusHistoryCategory {
  ORDER = 'ORDER',
  FULFILLMENT = 'FULFILLMENT',
  PAYMENT = 'PAYMENT',
}

/** pg type `orders_delivery_type_enum` */
export enum OrdersDeliveryType {
  EXPRESS = 'express',
  SLOTTED = 'slotted',
}

/** pg type `orders_fulfillment_status_source_enum` */
export enum OrdersFulfillmentStatusSource {
  VINCULUM = 'VINCULUM',
  MANUAL = 'MANUAL',
}

/** pg type `payments_status_enum` */
export enum PaymentsStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

/** pg type `polygons_zone_type_enum` */
export enum PolygonsZoneType {
  EXPRESS = 'express',
  SLOTTED = 'slotted',
}

/** pg type `rank_preference_preference_enum` */
export enum RankPreferencePreference {
  HIGHER_PRICE = 'higher_price',
  LOWER_PRICE = 'lower_price',
  MOST_ORDERED = 'most_ordered',
}

/** pg type `rank_rule_templates_field_enum` */
export enum RankRuleTemplatesField {
  DESCRIPTION = 'description',
  PRODUCT_TAG = 'product_tag',
  PRODUCT_TITLE = 'product_title',
  SKU_CODE = 'sku_code',
}

/** pg type `referrals_sender_status_enum` */
export enum ReferralsSenderStatus {
  PENDING = 'pending',
  GRANTED = 'granted',
}

/** pg type `refunds_reason_enum` */
export enum RefundsReason {
  STORE_CANCELLATION = 'STORE_CANCELLATION',
  WRONG_OR_BAD_QUALITY = 'WRONG_OR_BAD_QUALITY',
  OTHER = 'OTHER',
}

/** pg type `refunds_status_enum` */
export enum RefundsStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

/** pg type `sol_points_ledger_entry_type_enum` */
export enum SolPointsLedgerEntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  REVERSAL = 'REVERSAL',
}

/** pg type `subcategory_rank_preference_preference_enum` */
export enum SubcategoryRankPreferencePreference {
  HIGHER_PRICE = 'higher_price',
  LOWER_PRICE = 'lower_price',
  MOST_ORDERED = 'most_ordered',
}

/** pg type `user_campaign_entitlements_status_enum` */
export enum UserCampaignEntitlementsStatus {
  PENDING = 'pending',
  GRANTED = 'granted',
}
