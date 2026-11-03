export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export type PaymentMode = 'SPLIT_40_60' | 'FULL_CASH' | 'FULL_QRIS';
export type QrisPaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type ReceiptDeliveryMethod = 'PRINT' | 'DIGITAL';

export interface SplitPaymentSummary {
  subtotal: number;
  discountEligible: boolean;
  discountApplied: boolean;
  discountRate: number;
  discountAmount: number;
  grandTotal: number;
  cashPortion40: number;
  qrisPortion60: number;
  cashTendered: number;
  cashChange: number;
  isCashSufficient: boolean;
  isQrisPaid: boolean;
}

export const MIN_DISCOUNT_SUBTOTAL = 100_000;
export const DEFAULT_DISCOUNT_RATE = 0.1; // 10% diskon untuk belanja minimal Rp100.000

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-arabica',
    name: 'Kopi Arabika Gayo 250g',
    category: 'Coffee Beans',
    price: 45_000,
  },
  {
    id: 'prod-matcha',
    name: 'Matcha Ceremonial Latte',
    category: 'Beverage',
    price: 35_000,
  },
  {
    id: 'prod-croissant',
    name: 'Artisan Butter Croissant',
    category: 'Pastry',
    price: 25_000,
  },
  {
    id: 'prod-drip',
    name: 'Paket Drip Bag Coffee (5 pcs)',
    category: 'Bundle',
    price: 50_000,
  },
  {
    id: 'prod-tumbler',
    name: 'Tumbler Stainless Qbit',
    category: 'Merchandise',
    price: 80_000,
  },
  {
    id: 'prod-biscotti',
    name: 'Almond Biscotti Jar',
    category: 'Pastry',
    price: 29_000,
  },
];

export function formatRupiah(amount: number): string {
  return `Rp${Math.round(amount).toLocaleString('id-ID')}`;
}

export function calculateSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateTransactionSummary(
  cart: CartItem[],
  wantsDiscount: boolean,
  paymentMode: PaymentMode,
  cashTendered: number,
  qrisStatus: QrisPaymentStatus,
  customSplitCashRatio = 40,
  customSplitQrisRatio = 60
): SplitPaymentSummary {
  const subtotal = calculateSubtotal(cart);
  const discountEligible = subtotal >= MIN_DISCOUNT_SUBTOTAL;
  const discountApplied = wantsDiscount && discountEligible;
  const discountRate = discountApplied ? DEFAULT_DISCOUNT_RATE : 0;
  const discountAmount = discountApplied ? Math.round(subtotal * discountRate) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const cashPortion40 =
    paymentMode === 'SPLIT_40_60'
      ? Math.round((grandTotal * customSplitCashRatio) / 100)
      : paymentMode === 'FULL_CASH'
        ? grandTotal
        : 0;

  const qrisPortion60 =
    paymentMode === 'SPLIT_40_60'
      ? Math.round((grandTotal * customSplitQrisRatio) / 100)
      : paymentMode === 'FULL_QRIS'
        ? grandTotal
        : 0;

  const isCashSufficient = cashTendered >= cashPortion40;
  const cashChange = isCashSufficient ? cashTendered - cashPortion40 : 0;
  const isQrisPaid = paymentMode === 'FULL_CASH' ? true : qrisStatus === 'PAID';

  return {
    subtotal,
    discountEligible,
    discountApplied,
    discountRate,
    discountAmount,
    grandTotal,
    cashPortion40,
    qrisPortion60,
    cashTendered,
    cashChange,
    isCashSufficient,
    isQrisPaid,
  };
}

export interface PaymentValidationResult {
  valid: boolean;
  errorMessage?: string;
}

export function validateSalePayment(
  cart: CartItem[],
  summary: SplitPaymentSummary,
  paymentMode: PaymentMode,
  qrisStatus: QrisPaymentStatus,
  splitCashPercent = 40,
  splitQrisPercent = 60
): PaymentValidationResult {
  if (cart.length === 0 || summary.grandTotal <= 0) {
    return {
      valid: false,
      errorMessage: 'Keranjang belanja masih kosong. Silakan pilih barang terlebih dahulu.',
    };
  }

  if (paymentMode === 'SPLIT_40_60') {
    if (splitCashPercent + splitQrisPercent !== 100) {
      return {
        valid: false,
        errorMessage: 'Total proporsi Split Payment harus mencapai 100% (40% Tunai : 60% QRIS).',
      };
    }

    if (!summary.isCashSufficient) {
      return {
        valid: false,
        errorMessage: `Nominal tunai kurang dari porsi 40% (${formatRupiah(summary.cashPortion40)}).`,
      };
    }

    if (qrisStatus === 'FAILED') {
      return {
        valid: false,
        errorMessage: 'Pembayaran QRIS (60%) gagal atau kedaluwarsa. Transaksi tidak dapat diselesaikan.',
      };
    }

    if (qrisStatus !== 'PAID') {
      return {
        valid: false,
        errorMessage: `Pembayaran QRIS sebesar 60% (${formatRupiah(summary.qrisPortion60)}) belum dikonfirmasi.`,
      };
    }
  } else if (paymentMode === 'FULL_CASH') {
    if (summary.cashTendered < summary.grandTotal) {
      return {
        valid: false,
        errorMessage: `Nominal tunai kurang dari total tagihan (${formatRupiah(summary.grandTotal)}).`,
      };
    }
  } else if (paymentMode === 'FULL_QRIS') {
    if (qrisStatus !== 'PAID') {
      return {
        valid: false,
        errorMessage: 'Pembayaran QRIS belum dikonfirmasi atau gagal.',
      };
    }
  }

  return { valid: true };
}
