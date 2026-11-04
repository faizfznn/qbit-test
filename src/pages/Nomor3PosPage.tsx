import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  Banknote,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Printer,
  Send,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  CATALOG_PRODUCTS,
  CartItem,
  ProductItem,
  PaymentMode,
  QrisPaymentStatus,
  ReceiptDeliveryMethod,
  MIN_DISCOUNT_SUBTOTAL,
  calculateTransactionSummary,
  validateSalePayment,
  formatRupiah,
} from '../utils/posTransaction';

/*
 Halaman Nomor 3 — POS Flow Chart Simulation:
 */
export const Nomor3PosPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wantsDiscount, setWantsDiscount] = useState<boolean>(false);
  const [discountNotice, setDiscountNotice] = useState<{
    type: 'success' | 'warning';
    message: string;
  } | null>(null);

  const [paymentMode, setPaymentMode] = useState<PaymentMode>('SPLIT_40_60');
  const [splitCashRatio, setSplitCashRatio] = useState<number>(40);
  const [splitQrisRatio, setSplitQrisRatio] = useState<number>(60);
  const [cashTenderedInput, setCashTenderedInput] = useState<string>('');
  const [qrisStatus, setQrisStatus] = useState<QrisPaymentStatus>('PENDING');

  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [saleCompleted, setSaleCompleted] = useState<boolean>(false);
  const [receiptAction, setReceiptAction] = useState<ReceiptDeliveryMethod | null>(null);
  const [digitalContact, setDigitalContact] = useState<string>('pelanggan@qbit.co.id');

  const cashTendered = Number(cashTenderedInput.replace(/[^0-9]/g, '')) || 0;

  const summary = calculateTransactionSummary(
    cart,
    wantsDiscount,
    paymentMode,
    cashTendered,
    qrisStatus,
    splitCashRatio,
    splitQrisRatio
  );

  const syncDiscountNotice = (nextCart: CartItem[], nextWantsDiscount: boolean) => {
    const nextSubtotal = nextCart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    if (!nextWantsDiscount) {
      setDiscountNotice(null);
      return;
    }

    if (nextSubtotal >= MIN_DISCOUNT_SUBTOTAL) {
      setDiscountNotice({
        type: 'success',
        message: 'Discount Applied: Diskon 10% (Belanja Minimal Rp100.000) berhasil diterapkan.',
      });
    } else {
      setDiscountNotice({
        type: 'warning',
        message: `Discount Not Applied: Total belanja (${formatRupiah(nextSubtotal)}) belum mencapai minimal Rp100.000. Silakan tambah barang ke keranjang (Add Items to Cart).`,
      });
    }
  };

  const handleAddToCart = (product: ProductItem) => {
    setSaleCompleted(false);
    setReceiptAction(null);
    setPaymentError(null);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const nextCart = existing
        ? prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prev, { product, quantity: 1 }];

      syncDiscountNotice(nextCart, wantsDiscount);
      return nextCart;
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSaleCompleted(false);
    setReceiptAction(null);
    setPaymentError(null);

    setCart((prev) => {
      const nextCart = prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);

      syncDiscountNotice(nextCart, wantsDiscount);
      return nextCart;
    });
  };

  const handleApplyDiscountClick = () => {
    setSaleCompleted(false);
    setReceiptAction(null);
    setPaymentError(null);
    setWantsDiscount(true);
    syncDiscountNotice(cart, true);
  };

  const handleRemoveDiscountClick = () => {
    setSaleCompleted(false);
    setReceiptAction(null);
    setPaymentError(null);
    setWantsDiscount(false);
    setDiscountNotice(null);
  };

  const handleProcessPayment = () => {
    setPaymentError(null);
    setReceiptAction(null);

    const validation = validateSalePayment(
      cart,
      summary,
      paymentMode,
      qrisStatus,
      splitCashRatio,
      splitQrisRatio
    );

    if (!validation.valid) {
      setSaleCompleted(false);
      setPaymentError(validation.errorMessage || 'Pembayaran tidak valid.');
      return;
    }

    setSaleCompleted(true);
  };

  const handleResetTransaction = () => {
    setCart([]);
    setWantsDiscount(false);
    setDiscountNotice(null);
    setPaymentMode('SPLIT_40_60');
    setSplitCashRatio(40);
    setSplitQrisRatio(60);
    setCashTenderedInput('');
    setQrisStatus('PENDING');
    setPaymentError(null);
    setSaleCompleted(false);
    setReceiptAction(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8 text-zinc-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Nomor 3 — Flow Chart POS System
            </p>
            <h1
              data-testid="pos-page-title"
              className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5"
            >
              Sale Transaction: Split Payment 40:60 & Promo Diskon Minimal Rp100.000
            </h1>
          </div>
          <Button
            type="button"
            testId="btn-reset-pos"
            aria-label="Reset Transaksi"
            onClick={handleResetTransaction}
            className="self-start sm:self-auto px-3 py-2 border border-zinc-200 text-xs font-medium text-white gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5 inline" />
            Transaksi Baru
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom Kiri */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Selects items to purchase -> Add Items to Cart */}
            <section
              aria-labelledby="catalog-heading"
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="catalog-heading"
                  className="text-sm font-bold tracking-tight text-zinc-900 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D11F66]" />
                  <span>1. Pilih Barang (Selects Items to Purchase)</span>
                </h2>
                <span className="text-xs text-zinc-500">Klik untuk tambah ke keranjang</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CATALOG_PRODUCTS.map((product) => {
                  const inCart = cart.find((c) => c.product.id === product.id);
                  return (
                    <div
                      key={product.id}
                      data-testid={`product-card-${product.id}`}
                      className="border border-zinc-200 rounded-lg p-3.5 flex flex-col justify-between gap-3 bg-white hover:border-zinc-300 transition-colors"
                    >
                      <div>
                        <span className="text-[11px] font-medium text-zinc-500">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
                          {product.name}
                        </h3>
                        <p
                          data-testid={`product-price-${product.id}`}
                          className="text-sm font-bold text-zinc-900 tabular-nums mt-1"
                        >
                          {formatRupiah(product.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                        {inCart ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-testid={`btn-dec-${product.id}`}
                              aria-label={`Kurangi ${product.name}`}
                              onClick={() => handleUpdateQuantity(product.id, -1)}
                              className="w-7 h-7 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-zinc-100"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span
                              data-testid={`qty-${product.id}`}
                              className="text-xs font-bold tabular-nums w-6 text-center"
                            >
                              {inCart.quantity}
                            </span>
                            <button
                              type="button"
                              data-testid={`btn-inc-${product.id}`}
                              aria-label={`Tambah ${product.name}`}
                              onClick={() => handleUpdateQuantity(product.id, 1)}
                              className="w-7 h-7 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-zinc-100"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400">Belum dipilih</span>
                        )}

                        <button
                          type="button"
                          data-testid={`btn-add-${product.id}`}
                          onClick={() => handleAddToCart(product)}
                          className="px-3 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 active:bg-zinc-950 transition-colors cursor-pointer"
                        >
                          + Keranjang
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Chooses to apply discount or promotion -> Discount Applied? */}
            <section
              aria-labelledby="discount-heading"
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2
                  id="discount-heading"
                  className="text-sm font-bold tracking-tight text-zinc-900 flex items-center gap-2"
                >
                  <Tag className="w-4 h-4 text-[#D11F66]" />
                  <span>2. Diskon / Promosi (Min. Belanja Rp100.000 — Diskon 10%)</span>
                </h2>
                <span
                  data-testid="badge-discount-status"
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border tabular-nums ${summary.discountApplied
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}
                >
                  {summary.discountApplied ? 'Discount Applied: YES' : 'Discount Applied: NO'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  data-testid="btn-apply-discount"
                  onClick={handleApplyDiscountClick}
                  className="px-4 py-2 rounded-lg bg-[#D11F66] text-white text-xs font-semibold hover:bg-[#b81958] transition-colors cursor-pointer"
                >
                  Gunakan Diskon 10% (Apply Discount)
                </button>
                {wantsDiscount && (
                  <button
                    type="button"
                    data-testid="btn-remove-discount"
                    onClick={handleRemoveDiscountClick}
                    className="px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    Batalkan Diskon
                  </button>
                )}
              </div>

              {discountNotice && (
                <div
                  role="alert"
                  data-testid="discount-feedback"
                  className={`rounded-lg border p-3 text-xs font-medium flex items-start gap-2 ${discountNotice.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-amber-200 bg-amber-50 text-amber-900'
                    }`}
                >
                  {discountNotice.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{discountNotice.message}</span>
                </div>
              )}
            </section>
          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-5 space-y-6">
            {/* Cart & Calculation Summary */}
            <section
              aria-labelledby="cart-heading"
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 id="cart-heading" className="text-sm font-bold tracking-tight text-zinc-900">
                  3. Keranjang Belanja (Cart & Calculation)
                </h2>
                <span
                  data-testid="cart-item-count"
                  className="text-xs font-medium text-zinc-500 tabular-nums"
                >
                  {cart.reduce((acc, item) => acc + item.quantity, 0)} barang
                </span>
              </div>

              {cart.length === 0 ? (
                <p
                  data-testid="empty-cart-message"
                  className="text-xs text-zinc-500 py-4 text-center border border-dashed border-zinc-200 rounded-lg"
                >
                  Keranjang belanja masih kosong.
                </p>
              ) : (
                <ul data-testid="cart-list" className="divide-y divide-zinc-100 text-xs">
                  {cart.map((item) => (
                    <li
                      key={item.product.id}
                      data-testid={`cart-row-${item.product.id}`}
                      className="py-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-zinc-900 truncate">{item.product.name}</p>
                        <p className="text-zinc-500 tabular-nums">
                          {item.quantity} x {formatRupiah(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-zinc-900 tabular-nums">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          data-testid={`btn-remove-item-${item.product.id}`}
                          aria-label={`Hapus ${item.product.name}`}
                          onClick={() => handleUpdateQuantity(item.product.id, -item.quantity)}
                          className="p-1 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Totals Breakdown */}
              <div className="border-t border-zinc-200 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal Belanja</span>
                  <span data-testid="summary-subtotal" className="font-semibold tabular-nums">
                    {formatRupiah(summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Potongan Diskon (10%)</span>
                  <span
                    data-testid="summary-discount"
                    className="font-semibold text-emerald-700 tabular-nums"
                  >
                    -{formatRupiah(summary.discountAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                  <span>Total Tagihan (Grand Total)</span>
                  <span data-testid="summary-grand-total" className="tabular-nums">
                    {formatRupiah(summary.grandTotal)}
                  </span>
                </div>
              </div>
            </section>

            {/* Step 4: Enters Payment Information -> Split Payment 40:60 */}
            <section
              aria-labelledby="payment-heading"
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-4"
            >
              <h2 id="payment-heading" className="text-sm font-bold tracking-tight text-zinc-900">
                4. Informasi Pembayaran (Enters Payment Information)
              </h2>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  data-testid="mode-split-40-60"
                  onClick={() => {
                    setPaymentMode('SPLIT_40_60');
                    setPaymentError(null);
                  }}
                  className={`px-2.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${paymentMode === 'SPLIT_40_60'
                    ? 'border-[#D11F66] bg-[#D11F66]/5 text-[#D11F66]'
                    : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                    }`}
                >
                  Split 40:60
                </button>
                <button
                  type="button"
                  data-testid="mode-full-cash"
                  onClick={() => {
                    setPaymentMode('FULL_CASH');
                    setPaymentError(null);
                  }}
                  className={`px-2.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${paymentMode === 'FULL_CASH'
                    ? 'border-[#D11F66] bg-[#D11F66]/5 text-[#D11F66]'
                    : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                    }`}
                >
                  Tunai 100%
                </button>
                <button
                  type="button"
                  data-testid="mode-full-qris"
                  onClick={() => {
                    setPaymentMode('FULL_QRIS');
                    setPaymentError(null);
                  }}
                  className={`px-2.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${paymentMode === 'FULL_QRIS'
                    ? 'border-[#D11F66] bg-[#D11F66]/5 text-[#D11F66]'
                    : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                    }`}
                >
                  QRIS 100%
                </button>
              </div>

              {paymentMode === 'SPLIT_40_60' && (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3.5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-700">Rasio Split Payment (%)</span>
                    <div className="flex items-center gap-1.5 tabular-nums">
                      <label htmlFor="split-cash-ratio" className="sr-only">
                        Persentase Tunai
                      </label>
                      <input
                        id="split-cash-ratio"
                        data-testid="input-split-cash-ratio"
                        type="number"
                        min={0}
                        max={100}
                        value={splitCashRatio}
                        onChange={(e) => setSplitCashRatio(Number(e.target.value))}
                        className="w-14 rounded border border-zinc-300 bg-white px-2 py-1 text-center font-bold tabular-nums"
                      />
                      <span>:</span>
                      <label htmlFor="split-qris-ratio" className="sr-only">
                        Persentase QRIS
                      </label>
                      <input
                        id="split-qris-ratio"
                        data-testid="input-split-qris-ratio"
                        type="number"
                        min={0}
                        max={100}
                        value={splitQrisRatio}
                        onChange={(e) => setSplitQrisRatio(Number(e.target.value))}
                        className="w-14 rounded border border-zinc-300 bg-white px-2 py-1 text-center font-bold tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-200 pt-2">
                    <span className="flex items-center gap-1.5 text-zinc-700">
                      <Banknote className="w-4 h-4 text-zinc-600" />
                      Porsi Tunai ({splitCashRatio}%)
                    </span>
                    <span
                      data-testid="split-cash-portion"
                      className="font-bold text-zinc-900 tabular-nums"
                    >
                      {formatRupiah(summary.cashPortion40)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-700">
                      <QrCode className="w-4 h-4 text-zinc-600" />
                      Porsi QRIS ({splitQrisRatio}%)
                    </span>
                    <span
                      data-testid="split-qris-portion"
                      className="font-bold text-zinc-900 tabular-nums"
                    >
                      {formatRupiah(summary.qrisPortion60)}
                    </span>
                  </div>
                </div>
              )}

              {/* Cash Input (shown for SPLIT_40_60 or FULL_CASH) */}
              {paymentMode !== 'FULL_QRIS' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="cash-tendered"
                      className="text-xs font-semibold text-zinc-800"
                    >
                      Nominal Uang Tunai Diterima (Rp)
                    </label>
                    <button
                      type="button"
                      data-testid="btn-fill-exact-cash"
                      onClick={() => setCashTenderedInput(String(summary.cashPortion40))}
                      className="text-[11px] font-semibold text-[#D11F66] hover:underline cursor-pointer"
                    >
                      Isi Uang Pas ({formatRupiah(summary.cashPortion40)})
                    </button>
                  </div>
                  <input
                    id="cash-tendered"
                    data-testid="input-cash-tendered"
                    type="number"
                    placeholder="Contoh: 40000"
                    value={cashTenderedInput}
                    onChange={(e) => {
                      setCashTenderedInput(e.target.value);
                      setPaymentError(null);
                    }}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm tabular-nums text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                  <div className="flex justify-between text-xs text-zinc-600 pt-1">
                    <span>Kembalian Tunai (Change)</span>
                    <span
                      data-testid="cash-change-amount"
                      className="font-bold text-zinc-900 tabular-nums"
                    >
                      {formatRupiah(summary.cashChange)}
                    </span>
                  </div>
                </div>
              )}

              {/* QRIS Status Control (shown for SPLIT_40_60 or FULL_QRIS) */}
              {paymentMode !== 'FULL_CASH' && (
                <div className="space-y-2 border-t border-zinc-100 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-800">
                      Status Pembayaran QRIS ({formatRupiah(summary.qrisPortion60)})
                    </span>
                    <span
                      data-testid="qris-status-badge"
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${qrisStatus === 'PAID'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : qrisStatus === 'FAILED'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                    >
                      {qrisStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      data-testid="btn-qris-confirm"
                      onClick={() => {
                        setQrisStatus('PAID');
                        setPaymentError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Konfirmasi QRIS Lunas
                    </button>
                    <button
                      type="button"
                      data-testid="btn-qris-fail"
                      onClick={() => {
                        setQrisStatus('FAILED');
                        setPaymentError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-800 text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Simulasi QRIS Gagal
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Validation Error */}
              {paymentError && (
                <div
                  role="alert"
                  data-testid="payment-error"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-800 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Process Payment Button */}
              <Button
                type="button"
                fullWidth
                testId="btn-process-payment"
                onClick={handleProcessPayment}
              >
                Process Payment
              </Button>

              {/* Step 5: Payment Approved -> Complete Sale -> Print Receipt / Send Digital Receipt */}
              {saleCompleted && (
                <div
                  role="status"
                  data-testid="sale-complete-banner"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3 text-xs text-emerald-950"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Payment Approved — Complete Sale</span>
                  </div>

                  <div
                    data-testid="receipt-breakdown"
                    className="bg-white border border-emerald-200 rounded-lg p-3 space-y-1 tabular-nums text-zinc-800"
                  >
                    <p className="font-semibold text-zinc-900">Ringkasan Pembayaran:</p>
                    <p>Subtotal: {formatRupiah(summary.subtotal)}</p>
                    <p>Diskon: -{formatRupiah(summary.discountAmount)}</p>
                    <p className="font-bold">Total Akhir: {formatRupiah(summary.grandTotal)}</p>
                    {paymentMode === 'SPLIT_40_60' && (
                      <>
                        <p data-testid="receipt-split-cash">
                          Tunai ({splitCashRatio}%): {formatRupiah(summary.cashPortion40)} (Dibayar:{' '}
                          {formatRupiah(summary.cashTendered)}, Kembalian:{' '}
                          {formatRupiah(summary.cashChange)})
                        </p>
                        <p data-testid="receipt-split-qris">
                          QRIS ({splitQrisRatio}%): {formatRupiah(summary.qrisPortion60)} (Status:{' '}
                          {qrisStatus})
                        </p>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 pt-1">
                    <label
                      htmlFor="digital-contact"
                      className="block text-[11px] font-semibold text-emerald-900"
                    >
                      Email / WhatsApp Struk Digital (Opsional)
                    </label>
                    <input
                      id="digital-contact"
                      data-testid="input-digital-contact"
                      type="text"
                      value={digitalContact}
                      onChange={(e) => setDigitalContact(e.target.value)}
                      className="w-full rounded-md border border-emerald-300 bg-white px-2.5 py-1.5 text-xs text-zinc-900"
                    />
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        data-testid="btn-print-receipt"
                        onClick={() => setReceiptAction('PRINT')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Receipt</span>
                      </button>
                      <button
                        type="button"
                        data-testid="btn-send-digital-receipt"
                        onClick={() => setReceiptAction('DIGITAL')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#D11F66] text-white font-semibold hover:bg-[#b81958] transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Digital Receipt</span>
                      </button>
                    </div>
                  </div>

                  {receiptAction && (
                    <div
                      data-testid="receipt-output-message"
                      className="rounded-lg bg-emerald-100/80 border border-emerald-300 px-3 py-2 font-semibold text-emerald-950"
                    >
                      {receiptAction === 'PRINT'
                        ? 'Struk fisik berhasil dicetak (Print Receipt Completed).'
                        : `Struk digital berhasil dikirim ke ${digitalContact} (Send Digital Receipt Completed).`}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
