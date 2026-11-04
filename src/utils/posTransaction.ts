/**
 * Modul Kalkulasi & Validasi Transaksi POS (Nomor 3)
 * Mengimplementasikan diagram alir (Flow Chart):
 * - Start -> Customer makes a purchase -> Sale Transaction
 * - Chooses to apply discount -> Apply Discount -> Discount Applied? (Min. Rp100.000)
 *   -> Yes: Calculate Discounted Total (Diskon 10%)
 *   -> No: Add Items to Cart
 * - Enters payment information (Split Payment 40% Tunai : 60% QRIS)
 * - Process Payment -> Payment approved -> Complete Sale
 * - Print Receipt / Send Digital Receipt
 */

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

// Batas minimal belanja untuk berhak mendapatkan diskon promo
export const MIN_DISCOUNT_SUBTOTAL = 100_000;
// Besaran diskon default (10%)
export const DEFAULT_DISCOUNT_RATE = 0.1;

// Daftar katalog produk contoh untuk pengujian transaksi POS
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

/**
 * Format angka ke mata uang Rupiah (contoh: 100000 -> "Rp100.000")
 */
export function formatRupiah(amount: number): string {
  return `Rp${Math.round(amount).toLocaleString('id-ID')}`;
}

/**
 * Menghitung subtotal dari seluruh barang yang ada di keranjang
 */
export function calculateSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Menghitung rincian transaksi: Subtotal, diskon promo, grand total,
 * serta proporsi pembagian split payment (40% Tunai : 60% QRIS).
 */
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

  // Cek syarat batas minimal belanja diskon (>= Rp100.000)
  const discountEligible = subtotal >= MIN_DISCOUNT_SUBTOTAL;
  const discountApplied = wantsDiscount && discountEligible;
  const discountRate = discountApplied ? DEFAULT_DISCOUNT_RATE : 0;
  const discountAmount = discountApplied ? Math.round(subtotal * discountRate) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // Perhitungan porsi Tunai (40%) dan QRIS (60%) dari Grand Total
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

  // Verifikasi kecukupan uang tunai dan kembalian
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

/**
 * Validasi pembayaran sebelum menyelesaikan transaksi (Process Payment)
 * Memeriksa:
 * 1. Keranjang tidak boleh kosong
 * 2. Total rasio split harus tepat 100% (40:60)
 * 3. Uang tunai harus cukup (>= 40%)
 * 4. QRIS harus berstatus PAID (tidak boleh PENDING atau FAILED)
 */
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
