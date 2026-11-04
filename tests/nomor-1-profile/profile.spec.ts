import { test, expect } from '@playwright/test';

/**
 * Suite Pengujian Nomor 1 — User Interface Testing: "Input your profile"
 * Menguji tampilan elemen visual, navigasi, skenario positif, skenario negatif,
 * dan boundary value validation pada form input profil mobile.
 *
 * Catatan aturan field:
 * - Wajib (Mandatory): First Name, Nickname, Gender, Birth Date
 * - Opsional (Optional): Middle Name, Last Name
 */
test.describe('Nomor 1 - User Interface Testing: Input your profile', () => {
  test.beforeEach(async ({ page }) => {
    // Kunjungi halaman utama form profil sebelum setiap test case dijalankan
    await page.goto('/');
  });

  test('TC-UI-001: Verifikasi tampilan elemen UI, label, placeholder, dan default state', async ({ page }) => {
    // 1. Verifikasi header dan tombol kembali (Back button)
    await expect(page.getByTestId('btn-back')).toBeVisible();
    await expect(page.getByTestId('page-title')).toHaveText('Input your profile');

    // 2. Verifikasi placeholder setiap field sesuai spesifikasi desain
    await expect(page.getByTestId('input-first-name')).toHaveAttribute('placeholder', 'e.g Joel');
    await expect(page.getByTestId('input-middle-name')).toHaveAttribute('placeholder', 'e.g K');
    await expect(page.getByTestId('input-last-name')).toHaveAttribute('placeholder', 'e.g Osteen');
    await expect(page.getByTestId('input-nickname')).toHaveAttribute('placeholder', 'Nickname');
    await expect(page.getByTestId('input-birth-date')).toHaveAttribute('placeholder', 'DD MMM YYYY');

    // 3. Verifikasi penanda Opsional pada Middle Name & Last Name
    await expect(page.locator('label[for="middleName"]')).toContainText('(Optional)');
    await expect(page.locator('label[for="lastName"]')).toContainText('(Optional)');

    // 4. Default state: Gender "Male" terpilih secara otomatis, "Female" tidak terpilih
    await expect(page.getByTestId('radio-gender-male')).toBeChecked();
    await expect(page.getByTestId('radio-gender-female')).not.toBeChecked();

    // 5. Tombol Save harus tampil dan dalam kondisi aktif (enabled)
    const saveButton = page.getByTestId('btn-save');
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
    await expect(saveButton).toHaveText('Save');
  });

  test('TC-UI-002: Verifikasi fungsi tombol navigasi Back (<-)', async ({ page }) => {
    // Klik tombol navigasi Back dan pastikan feedback navigasi muncul
    await page.getByTestId('btn-back').click();
    await expect(page.getByTestId('nav-message')).toBeVisible();
    await expect(page.getByTestId('nav-message')).toHaveText('Kembali ke halaman sebelumnya');
  });

  test('TC-UI-003 (Positive): Simpan profil dengan mengisi seluruh field (Wajib & Opsional)', async ({ page }) => {
    // Mengisi data lengkap (baik field wajib maupun field opsional)
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-middle-name').fill('K');
    await page.getByTestId('input-last-name').fill('Osteen');
    await page.getByTestId('input-nickname').fill('JoelO');
    await page.getByTestId('radio-gender-male').check();
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    // Verifikasi notifikasi berhasil dan ringkasan data tersimpan
    await expect(page.getByTestId('save-success')).toBeVisible();
    await expect(page.getByTestId('saved-summary')).toContainText('Joel K Osteen (JoelO) — Male, 15 Aug 1998');
  });

  test('TC-UI-004 (Positive): Simpan profil hanya dengan field Wajib (Middle & Last Name dikosongkan)', async ({ page }) => {
    // Mengosongkan field opsional (Middle Name dan Last Name)
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('01 Jan 2000');

    await page.getByTestId('btn-save').click();

    // Sistem harus tetap berhasil menyimpan profil
    await expect(page.getByTestId('save-success')).toBeVisible();
    await expect(page.getByTestId('saved-summary')).toContainText('Joel (Joel) — Male, 01 Jan 2000');
  });

  test('TC-UI-005 (Positive): Mengubah pilihan Gender dari Male ke Female dan menyimpan profil', async ({ page }) => {
    const maleRadio = page.getByTestId('radio-gender-male');
    const femaleRadio = page.getByTestId('radio-gender-female');

    // Ubah radio selection dari default (Male) ke Female
    await expect(maleRadio).toBeChecked();
    await femaleRadio.check();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();

    await page.getByTestId('input-first-name').fill('Victoria');
    await page.getByTestId('input-last-name').fill('Osteen');
    await page.getByTestId('input-nickname').fill('Vicky');
    await page.getByTestId('input-birth-date').fill('20 May 1999');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('save-success')).toBeVisible();
    await expect(page.getByTestId('saved-summary')).toContainText('Victoria Osteen (Vicky) — Female, 20 May 1999');
  });

  test('TC-UI-006 (Negative): Gagal simpan ketika seluruh field dikosongkan', async ({ page }) => {
    // Langsung klik Save tanpa mengisi field apapun
    await page.getByTestId('btn-save').click();

    // Pesan error validasi harus muncul pada seluruh field wajib
    await expect(page.getByTestId('error-first-name')).toHaveText('First Name wajib diisi');
    await expect(page.getByTestId('error-nickname')).toHaveText('Nickname wajib diisi');
    await expect(page.getByTestId('error-birth-date')).toHaveText('Birth Date wajib diisi');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-007 (Negative): Gagal simpan ketika First Name dikosongkan', async ({ page }) => {
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-first-name')).toHaveText('First Name wajib diisi');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-008 (Negative): Gagal simpan ketika Nickname dikosongkan', async ({ page }) => {
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-nickname')).toHaveText('Nickname wajib diisi');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-009 (Negative): Gagal simpan ketika Birth Date dikosongkan', async ({ page }) => {
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-nickname').fill('Joel');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-birth-date')).toHaveText('Birth Date wajib diisi');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-010 (Negative): Gagal simpan ketika First Name berisi angka atau karakter spesial', async ({ page }) => {
    // Input First Name dengan angka dan karakter khusus
    await page.getByTestId('input-first-name').fill('Joel123!@#');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-first-name')).toHaveText('First Name hanya boleh berisi huruf');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-011 (Negative): Gagal simpan ketika Middle Name atau Last Name berisi angka/simbol', async ({ page }) => {
    // Walaupun opsional, jika field diisi dengan karakter selain huruf maka harus ditolak
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-middle-name').fill('K99');
    await page.getByTestId('input-last-name').fill('Osteen$%');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-middle-name')).toHaveText('Middle Name hanya boleh berisi huruf');
    await expect(page.getByTestId('error-last-name')).toHaveText('Last Name hanya boleh berisi huruf');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-012 (Negative): Gagal simpan ketika format Birth Date tidak sesuai DD MMM YYYY', async ({ page }) => {
    // Menggunakan format numerik (YYYY-MM-DD) bukan format teks DD MMM YYYY
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('1998-08-15');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-birth-date')).toContainText('Format tanggal harus DD MMM YYYY');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-013 (Negative): Gagal simpan ketika Birth Date berisi tanggal kalender tidak valid (31 Feb 2000)', async ({ page }) => {
    // Tanggal kalender tidak ada (Februari tidak memiliki tanggal 31)
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('31 Feb 2000');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-birth-date')).toHaveText('Tanggal lahir tidak valid');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-014 (Negative): Gagal simpan ketika Birth Date berada di masa depan', async ({ page }) => {
    // Tanggal lahir melampaui hari ini (di masa depan)
    await page.getByTestId('input-first-name').fill('Joel');
    await page.getByTestId('input-nickname').fill('Joel');
    await page.getByTestId('input-birth-date').fill('15 Aug 2099');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-birth-date')).toHaveText('Tanggal lahir tidak boleh di masa depan');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });

  test('TC-UI-015 (Boundary): Gagal simpan ketika field wajib hanya diisi spasi (whitespace)', async ({ page }) => {
    // Uji boundary whitespace: spasi saja tidak boleh lolos validasi wajib
    await page.getByTestId('input-first-name').fill('   ');
    await page.getByTestId('input-nickname').fill('   ');
    await page.getByTestId('input-birth-date').fill('15 Aug 1998');

    await page.getByTestId('btn-save').click();

    await expect(page.getByTestId('error-first-name')).toHaveText('First Name wajib diisi');
    await expect(page.getByTestId('error-nickname')).toHaveText('Nickname wajib diisi');
    await expect(page.getByTestId('save-success')).toBeHidden();
  });
});
