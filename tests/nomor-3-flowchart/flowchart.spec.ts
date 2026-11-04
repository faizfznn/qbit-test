import { test, expect } from '@playwright/test';

test.describe('Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nomor3');
    await expect(page.getByTestId('pos-page-title')).toBeVisible();
  });

  // BAGIAN 3A: SKENARIO SPLIT PAYMENT 40:60 DENGAN TUNAI DAN QRIS (TC-SP-001 s/d TC-SP-008)

  test('TC-SP-001 (Positive): Split Payment 40:60 Tunai dan QRIS dengan uang tunai pas dan cetak struk fisik (Print Receipt)', async ({ page }) => {
    // Pilih 2x Paket Drip Bag Coffee (2 x Rp50.000 = Rp100.000)
    await page.getByTestId('btn-add-prod-drip').click();
    await page.getByTestId('btn-inc-prod-drip').click();

    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp100.000');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp100.000');

    // Verifikasi proporsi Split Payment 40:60 otomatis terhitung (Tunai 40% = Rp40.000, QRIS 60% = Rp60.000)
    await expect(page.getByTestId('split-cash-portion')).toHaveText('Rp40.000');
    await expect(page.getByTestId('split-qris-portion')).toHaveText('Rp60.000');

    // Masukkan nominal uang tunai pas Rp40.000 & konfirmasi QRIS Rp60.000 lunas
    await page.getByTestId('input-cash-tendered').fill('40000');
    await expect(page.getByTestId('cash-change-amount')).toHaveText('Rp0');
    await page.getByTestId('btn-qris-confirm').click();
    await expect(page.getByTestId('qris-status-badge')).toHaveText('PAID');

    // Process Payment -> Payment Approved -> Complete Sale
    await page.getByTestId('btn-process-payment').click();
    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();
    await expect(page.getByTestId('receipt-split-cash')).toContainText('Tunai (40%): Rp40.000');
    await expect(page.getByTestId('receipt-split-qris')).toContainText('QRIS (60%): Rp60.000');

    // Pilih Print Receipt sesuai Flow Chart
    await page.getByTestId('btn-print-receipt').click();
    await expect(page.getByTestId('receipt-output-message')).toContainText(
      'Struk fisik berhasil dicetak (Print Receipt Completed).'
    );
  });

  test('TC-SP-002 (Positive): Split Payment 40:60 dengan uang tunai lebih (perhitungan kembalian) dan kirim struk digital (Send Digital Receipt)', async ({ page }) => {
    // Pilih 2x Paket Drip Bag Coffee (Rp100.000)
    await page.getByTestId('btn-add-prod-drip').click();
    await page.getByTestId('btn-inc-prod-drip').click();

    // Porsi Tunai 40% = Rp40.000, pelanggan membayar uang tunai Rp50.000 -> Kembalian Rp10.000
    await page.getByTestId('input-cash-tendered').fill('50000');
    await expect(page.getByTestId('cash-change-amount')).toHaveText('Rp10.000');

    // Konfirmasi QRIS 60% (Rp60.000)
    await page.getByTestId('btn-qris-confirm').click();
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();
    await expect(page.getByTestId('receipt-split-cash')).toContainText(
      'Tunai (40%): Rp40.000 (Dibayar: Rp50.000, Kembalian: Rp10.000)'
    );

    // Pilih Send Digital Receipt sesuai Flow Chart
    await page.getByTestId('input-digital-contact').fill('faiz@qbit.co.id');
    await page.getByTestId('btn-send-digital-receipt').click();
    await expect(page.getByTestId('receipt-output-message')).toContainText(
      'Struk digital berhasil dikirim ke faiz@qbit.co.id (Send Digital Receipt Completed).'
    );
  });

  test('TC-SP-003 (Positive): Split Payment 40:60 setelah potongan Diskon Belanja Minimal Rp100.000', async ({ page }) => {
    // Pilih Kopi Arabika (Rp45.000) + Matcha (Rp35.000) + Tumbler (Rp80.000) = Rp160.000
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-add-prod-tumbler').click();

    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp160.000');

    // Gunakan Diskon 10% -> Potongan Rp16.000, Grand Total = Rp144.000
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp16.000');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp144.000');

    // Verifikasi Split 40:60 dihitung dari Total Setelah Diskon (Rp144.000):
    // Porsi Tunai 40% = Rp57.600, Porsi QRIS 60% = Rp86.400
    await expect(page.getByTestId('split-cash-portion')).toHaveText('Rp57.600');
    await expect(page.getByTestId('split-qris-portion')).toHaveText('Rp86.400');

    await page.getByTestId('btn-fill-exact-cash').click();
    await page.getByTestId('btn-qris-confirm').click();
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();
  });

  test('TC-SP-004 (Negative): Gagal memproses Split Payment 40:60 apabila nominal uang tunai kurang dari porsi 40%', async ({ page }) => {
    // Total Rp100.000 -> Porsi Tunai 40% = Rp40.000
    await page.getByTestId('btn-add-prod-drip').click();
    await page.getByTestId('btn-inc-prod-drip').click();

    // Input uang tunai hanya Rp25.000 (kurang dari Rp40.000)
    await page.getByTestId('input-cash-tendered').fill('25000');
    await page.getByTestId('btn-qris-confirm').click();
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('payment-error')).toContainText(
      'Nominal tunai kurang dari porsi 40% (Rp40.000).'
    );
    await expect(page.getByTestId('sale-complete-banner')).toBeHidden();
  });

  test('TC-SP-005 (Negative): Gagal menyelesaikan Split Payment 40:60 apabila pembayaran QRIS (60%) gagal atau belum terverifikasi', async ({ page }) => {
    // Total Rp100.000 -> Tunai Rp40.000 sudah diisi pas, namun QRIS simulasi FAILED
    await page.getByTestId('btn-add-prod-drip').click();
    await page.getByTestId('btn-inc-prod-drip').click();

    await page.getByTestId('input-cash-tendered').fill('40000');
    await page.getByTestId('btn-qris-fail').click();
    await expect(page.getByTestId('qris-status-badge')).toHaveText('FAILED');

    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('payment-error')).toContainText(
      'Pembayaran QRIS (60%) gagal atau kedaluwarsa. Transaksi tidak dapat diselesaikan.'
    );
    await expect(page.getByTestId('sale-complete-banner')).toBeHidden();
  });

  test('TC-SP-006 (Negative): Gagal memproses Split Payment apabila total rasio pembagian tidak sama dengan 100%', async ({ page }) => {
    await page.getByTestId('btn-add-prod-drip').click();
    await page.getByTestId('btn-inc-prod-drip').click();

    // Ubah rasio menjadi 30% : 50% (Total 80% != 100%)
    await page.getByTestId('input-split-cash-ratio').fill('30');
    await page.getByTestId('input-split-qris-ratio').fill('50');
    await page.getByTestId('btn-fill-exact-cash').click();
    await page.getByTestId('btn-qris-confirm').click();

    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('payment-error')).toContainText(
      'Total proporsi Split Payment harus mencapai 100% (40% Tunai : 60% QRIS).'
    );
    await expect(page.getByTestId('sale-complete-banner')).toBeHidden();
  });

  test('TC-SP-007 (Negative): Gagal memproses pembayaran ketika keranjang belanja masih kosong (Rp0)', async ({ page }) => {
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('payment-error')).toHaveText(
      'Keranjang belanja masih kosong. Silakan pilih barang terlebih dahulu.'
    );
    await expect(page.getByTestId('sale-complete-banner')).toBeHidden();
  });

  test('TC-SP-008 (Positive): Verifikasi tombol Isi Uang Pas mengisi tepat 40% tagihan pada skenario nominal ganjil/ribuan', async ({ page }) => {
    // Pilih Kopi Arabika (Rp45.000) + Croissant (Rp25.000) = Rp70.000
    // 40% Tunai = Rp28.000, 60% QRIS = Rp42.000
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-croissant').click();

    await expect(page.getByTestId('split-cash-portion')).toHaveText('Rp28.000');
    await expect(page.getByTestId('split-qris-portion')).toHaveText('Rp42.000');

    await page.getByTestId('btn-fill-exact-cash').click();
    await expect(page.getByTestId('input-cash-tendered')).toHaveValue('28000');
    await page.getByTestId('btn-qris-confirm').click();
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();
  });

  // BAGIAN 3B: SKENARIO PEMBELIAN BEBERAPA BARANG DENGAN DISKON MINIMAL Rp100.000 (TC-DSC-001 s/d TC-DSC-008)

  test('TC-DSC-001 (Boundary - Positive): Pembelian beberapa barang dengan total belanja tepat Rp100.000 berhasil mendapat diskon 10%', async ({ page }) => {
    // Pilih Kopi Arabika (Rp45.000) + Matcha (Rp35.000) -> Rp80.000, ganti dengan 2x Croissant (2 x Rp25.000 = Rp50.000) + 1x Drip Coffee (Rp50.000) = Rp100.000
    await page.getByTestId('btn-add-prod-croissant').click();
    await page.getByTestId('btn-inc-prod-croissant').click();
    await page.getByTestId('btn-add-prod-drip').click();

    await expect(page.getByTestId('cart-item-count')).toHaveText('3 barang');
    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp100.000');

    // Klik Apply Discount -> Discount Applied? = YES -> Calculate Discounted Total = Rp90.000
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: YES');
    await expect(page.getByTestId('discount-feedback')).toContainText(
      'Discount Applied: Diskon 10% (Belanja Minimal Rp100.000) berhasil diterapkan.'
    );
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp10.000');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp90.000');
  });

  test('TC-DSC-002 (Positive): Pembelian beberapa barang dengan total belanja di atas Rp100.000 (Rp155.000) berhasil mendapat diskon', async ({ page }) => {
    // Kopi Arabika (Rp45.000) + Matcha (Rp35.000) + Croissant (Rp25.000) + Drip Bag (Rp50.000) = Rp155.000
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-add-prod-croissant').click();
    await page.getByTestId('btn-add-prod-drip').click();

    await expect(page.getByTestId('cart-item-count')).toHaveText('4 barang');
    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp155.000');

    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: YES');
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp15.500');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp139.500');
  });

  test('TC-DSC-003 (Negative): Pembelian beberapa barang di bawah Rp100.000 (Rp80.000) ditolak saat menerapkan diskon (Discount Applied: NO)', async ({ page }) => {
    // Kopi Arabika (Rp45.000) + Matcha (Rp35.000) = Rp80.000 (< Rp100.000)
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();

    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp80.000');

    // Klik Apply Discount -> Discount Applied? = NO -> diarahkan ke Add Items to Cart
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: NO');
    await expect(page.getByTestId('discount-feedback')).toContainText(
      'Discount Not Applied: Total belanja (Rp80.000) belum mencapai minimal Rp100.000. Silakan tambah barang ke keranjang (Add Items to Cart).'
    );
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp0');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp80.000');
  });

  test('TC-DSC-004 (Boundary - Negative): Pembelian beberapa barang sebesar Rp99.000 (kurang Rp1.000 dari batas minimal) tidak mendapat diskon', async ({ page }) => {
    // Kopi Arabika (Rp45.000) + Croissant (Rp25.000) + Almond Biscotti (Rp29.000) = Rp99.000
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-croissant').click();
    await page.getByTestId('btn-add-prod-biscotti').click();

    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp99.000');

    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: NO');
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp0');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp99.000');
  });

  test('TC-DSC-005 (Positive - Flow Chart Loop): Alur Discount Applied = NO -> Add Items to Cart -> Discount Applied = YES -> Calculate Discounted Total', async ({ page }) => {
    // Awalnya belanja Rp80.000 (< Rp100.000)
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: NO');

    // Mengikuti alur Flow Chart "No -> Add Items to Cart": tambah Croissant (Rp25.000) sehingga Subtotal = Rp105.000
    await page.getByTestId('btn-add-prod-croissant').click();
    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp105.000');

    // Diskon otomatis aktif (Discount Applied: YES) & Calculate Discounted Total = Rp94.500
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: YES');
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp10.500');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp94.500');
  });

  test('TC-DSC-006 (Negative - Dynamic Cart Update): Diskon otomatis dibatalkan apabila pelanggan mengurangi barang hingga subtotal turun di bawah Rp100.000', async ({ page }) => {
    // Pilih Tumbler (Rp80.000) + Matcha (Rp35.000) = Rp115.000 & aktifkan diskon
    await page.getByTestId('btn-add-prod-tumbler').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: YES');

    // Hapus Tumbler dari keranjang sehingga tersisa Matcha (Rp35.000 < Rp100.000)
    await page.getByTestId('btn-remove-item-prod-tumbler').click();
    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp35.000');
    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: NO');
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp0');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp35.000');
  });

  test('TC-DSC-007 (Positive - Flow Chart Jalur Kiri): Pembelian beberapa barang tanpa menggunakan diskon (Selects items -> Add to Cart -> Process Payment)', async ({ page }) => {
    // Pilih Kopi Arabika (Rp45.000) + Matcha (Rp35.000) + Croissant (Rp25.000) = Rp105.000 tanpa klik Apply Discount
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-add-prod-croissant').click();

    await expect(page.getByTestId('badge-discount-status')).toHaveText('Discount Applied: NO');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp105.000');

    // Bayar dengan Split 40:60 (Tunai Rp42.000, QRIS Rp63.000)
    await page.getByTestId('btn-fill-exact-cash').click();
    await page.getByTestId('btn-qris-confirm').click();
    await page.getByTestId('btn-process-payment').click();

    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();
  });

  test('TC-DSC-008 (Positive - End-to-End Flow Chart): Alur penuh dari pilih beberapa barang >= Rp100.000, diskon 10%, Split Payment 40:60, hingga Print & Digital Receipt', async ({ page }) => {
    // 1. Selects items to purchase -> Add Items to Cart (2x Kopi Arabika Rp90.000 + 2x Matcha Rp70.000 + 1x Drip Bag Rp50.000 = Rp210.000)
    await page.getByTestId('btn-add-prod-arabica').click();
    await page.getByTestId('btn-inc-prod-arabica').click();
    await page.getByTestId('btn-add-prod-matcha').click();
    await page.getByTestId('btn-inc-prod-matcha').click();
    await page.getByTestId('btn-add-prod-drip').click();

    await expect(page.getByTestId('summary-subtotal')).toHaveText('Rp210.000');

    // 2. Chooses to apply discount -> Apply Discount -> Discount Applied? = YES -> Calculate Discounted Total
    // Diskon 10% = Rp21.000, Grand Total = Rp189.000
    await page.getByTestId('btn-apply-discount').click();
    await expect(page.getByTestId('summary-discount')).toHaveText('-Rp21.000');
    await expect(page.getByTestId('summary-grand-total')).toHaveText('Rp189.000');

    // 3. Enters payment information (Split 40:60 -> Tunai 40% = Rp75.600, QRIS 60% = Rp113.400)
    await expect(page.getByTestId('split-cash-portion')).toHaveText('Rp75.600');
    await expect(page.getByTestId('split-qris-portion')).toHaveText('Rp113.400');

    await page.getByTestId('input-cash-tendered').fill('80000');
    await expect(page.getByTestId('cash-change-amount')).toHaveText('Rp4.400');
    await page.getByTestId('btn-qris-confirm').click();

    // 4. Process Payment -> Payment Approved -> Complete Sale
    await page.getByTestId('btn-process-payment').click();
    await expect(page.getByTestId('sale-complete-banner')).toBeVisible();

    // 5. Print Receipt & Send Digital Receipt
    await page.getByTestId('btn-print-receipt').click();
    await expect(page.getByTestId('receipt-output-message')).toContainText('Print Receipt Completed');

    await page.getByTestId('btn-send-digital-receipt').click();
    await expect(page.getByTestId('receipt-output-message')).toContainText('Send Digital Receipt Completed');
  });
});
