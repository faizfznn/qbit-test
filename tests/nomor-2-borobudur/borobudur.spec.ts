import { test, expect } from '@playwright/test';

/**
 * Pengujian Nomor 2 — Live Testing: Website Borobudur Marathon
 * Target: https://borobudurmarathon.com/
 * Menyelaraskan seluruh 16 Test Case (TC-BM-001 s/d TC-BM-016)
 * mencakup 10 pengujian fungsional dan 6 verifikasi temuan bug nyata (BUG-BM-001 s/d BUG-BM-006).
 */

const BASE_URL = 'https://borobudurmarathon.com';

test.describe('Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/)', () => {
  test.use({ viewport: { width: 1366, height: 768 } });
  test.setTimeout(60000);

  test('TC-BM-001: Verifikasi akses halaman utama (Homepage /) dan elemen navigasi utama', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Bank Jateng Borobudur Marathon 2026/i);

    // Pastikan konten utama & link navigasi utama terdaftar pada DOM
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('a[href="/bank-jateng-borobudur-marathon-2026/"]').first()).toBeAttached();
    await expect(page.locator('a[href="/rules-regulations/"]').first()).toBeAttached();
    await expect(page.locator('a[href="/prizes-2026/"]').first()).toBeAttached();
    await expect(page.locator('a[href="/faq/"]').first()).toBeAttached();
    await expect(page.locator('a[href="/race-results/"]').first()).toBeAttached();
  });

  test('TC-BM-002: Verifikasi fitur pergantian bahasa (Language Switcher EN <-> ID)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Cek keberadaan link switch ke versi Bahasa Indonesia (/id/)
    const idSwitch = page.locator('a[href*="/id/"]').first();
    await expect(idSwitch).toBeAttached();

    const resId = await page.goto(`${BASE_URL}/id/`, { waitUntil: 'domcontentloaded' });
    expect(resId?.status()).toBe(200);
    await expect(page).toHaveURL(`${BASE_URL}/id/`);

    // Pastikan navigasi versi Bahasa Indonesia memuat menu yang relevan
    await expect(page.locator('a[href*="/id/peraturan-ketentuan/"]').first()).toBeAttached();
    await expect(page.locator('a[href*="/id/hadiah-2026/"]').first()).toBeAttached();
    await expect(page.locator('a[href*="/id/tanya-jawab/"]').first()).toBeAttached();
  });

  test('TC-BM-003: Verifikasi halaman Race Category (/bank-jateng-borobudur-marathon-2026/)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bank-jateng-borobudur-marathon-2026/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Bank Jateng Borobudur Marathon 2026/i);
    await expect(page.locator('h1, h2').first()).toContainText(/Borobudur Marathon/i);
  });

  test('TC-BM-004: Verifikasi halaman Rules & Regulations (/rules-regulations/) beserta sub-slug ketentuan', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/rules-regulations/`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toContainText(/Rules & Regulations/i);

    // Cek ketersediaan sub-slug syarat & ketentuan
    const expectedSubSlugs = [
      '/rules-regulations-borobudur-marathon/',
      '/terms-and-conditions-bank-jateng-friendship-run-2026/',
      '/terms-conditions-saveduit-bank-jateng/',
      '/terms-conditions-bib-transfer/',
      '/terms-of-service-myborobudur/',
    ];

    for (const slug of expectedSubSlugs) {
      await expect(page.locator(`a[href*="${slug}"]`).first()).toBeAttached();
    }

    const subRes = await page.goto(`${BASE_URL}/rules-regulations-borobudur-marathon/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(subRes?.status()).toBe(200);
    await expect(page).toHaveTitle(/Rules & Regulations Borobudur Marathon 2026/i);
  });

  test('TC-BM-005: Verifikasi halaman Prizes (/prizes-2026/ dan /id/hadiah-2026/)', async ({ page }) => {
    // Versi bahasa Inggris
    const resEn = await page.goto(`${BASE_URL}/prizes-2026/`, { waitUntil: 'domcontentloaded' });
    expect(resEn?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toContainText(/Prizes/i);

    // Versi bahasa Indonesia
    const resId = await page.goto(`${BASE_URL}/id/hadiah-2026/`, { waitUntil: 'domcontentloaded' });
    expect(resId?.status()).toBe(200);
    await expect(page).toHaveTitle(/Hadiah 2026/i);
  });

  test('TC-BM-006: Verifikasi halaman FAQ (/faq/) dan interaksi Accordion pada sub-slug (/faq-borobudur-marathon/)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/faq/`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toContainText(/Frequently Asked Questions/i);

    await expect(page.locator('a[href*="faq-borobudur-marathon"]').first()).toBeAttached();
    await expect(page.locator('a[href*="faq-shuttle-bus"]').first()).toBeAttached();

    // Buka sub-slug FAQ detail dan interaksi accordion
    const detailRes = await page.goto(`${BASE_URL}/faq-borobudur-marathon/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(detailRes?.status()).toBe(200);

    const firstQuestion = page.locator('.vc_tta-panel-title').first();
    await expect(firstQuestion).toBeVisible();
    await expect(firstQuestion).toContainText(/When will Bank Jateng Borobudur Marathon 2026 be held/i);
    await firstQuestion.click();
  });

  test('TC-BM-007: Verifikasi halaman Race Results (/race-results/) dan tautan hasil lomba tahun 2017-2025', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/race-results/`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toContainText(/Race Results/i);

    // Verifikasi integrasi tautan pihak ketiga ScoreNow
    await expect(page.locator('a', { hasText: '2025' }).first()).toHaveAttribute(
      'href',
      /results\.scorenow\.co\.id/i
    );
    await expect(page.locator('a', { hasText: '2024' }).first()).toHaveAttribute(
      'href',
      /results\.scorenow\.co\.id/i
    );
  });

  test('TC-BM-008: Verifikasi halaman Program Friendship Run & Young Talent beserta sub-slug seleksi', async ({ page }) => {
    const resFr = await page.goto(`${BASE_URL}/friendship-run-program/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(resFr?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toContainText(/Friendship Run/i);

    const resYtEn = await page.goto(`${BASE_URL}/youngtalent/`, { waitUntil: 'domcontentloaded' });
    expect(resYtEn?.status()).toBe(200);
    await expect(page).toHaveTitle(/Young Talent/i);

    const resYtId = await page.goto(`${BASE_URL}/id/young-talent-2026/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(resYtId?.status()).toBe(200);
    await expect(page.locator('a[href*="/id/syarat-ketentuan-young-talent/"]').first()).toBeAttached();
    await expect(page.locator('a[href*="/id/detail-program-bank-jateng-young-talent/"]').first()).toBeAttached();
  });

  test('TC-BM-009: Verifikasi halaman Media: Gallery (/gallery/) lintas tahun (2022-2026) dan Race Guide (/race-guide/)', async ({ page }) => {
    const resGallery = await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'domcontentloaded' });
    expect(resGallery?.status()).toBe(200);

    for (const yearSlug of ['/gallery-2026/', '/gallery-2024/', '/gallery-2023/', '/gallery-2022/']) {
      await expect(page.locator(`a[href*="${yearSlug}"]`).first()).toBeAttached();
    }

    const resGuide = await page.goto(`${BASE_URL}/race-guide/`, { waitUntil: 'domcontentloaded' });
    expect(resGuide?.status()).toBe(200);
    await expect(page.locator('a[href$=".pdf"]').first()).toBeAttached();
  });

  test('TC-BM-010: Verifikasi halaman Contact (/contact/), Sponsors (/sponsors/), Apps (/apps/), dan Merchandise (/official-merchandise/)', async ({ page }) => {
    // Memastikan seluruh slug menu pendukung dapat dibuka dengan status HTTP 200 OK
    for (const slug of ['/sponsors/', '/contact/', '/apps/', '/official-merchandise/']) {
      const res = await page.goto(`${BASE_URL}${slug}`, { waitUntil: 'domcontentloaded' });
      expect(res?.status()).toBe(200);
    }
  });

  // =========================================================================
  // AUTOMATION VERIFIKASI TEMUAN BUG (BUG-BM-001 s/d BUG-BM-006)
  // =========================================================================

  test('TC-BM-011 (Verifikasi BUG-BM-001): Menu navbar Bank Jateng Young Talent pada EN mengarah ke slug ID', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Temuan bug 1: Pada mode bahasa EN, tautan Young Talent keliru mengarah ke /id/young-talent-2026/
    const youngTalentNavHref = await page
      .locator('a', { hasText: 'Bank Jateng Young Talent' })
      .first()
      .getAttribute('href');
    expect(youngTalentNavHref).toBe('/id/young-talent-2026/');
  });

  test('TC-BM-012 (Verifikasi BUG-BM-002): Tautan email info@borobudurmarathon.com di Footer menggunakan href="/contact"', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Temuan bug 2: Teks email pada footer tidak menggunakan protokol mailto:
    const footerEmailHref = await page
      .locator('footer a', { hasText: 'info@borobudurmarathon.com' })
      .first()
      .getAttribute('href');
    expect(footerEmailHref).toBe('/contact');
  });

  test('TC-BM-013 (Verifikasi BUG-BM-003): Layout ikon bendera bahasa turun ke baris baru pada halaman Bahasa Indonesia (/id/)', async ({ page }) => {
    // 1. Pada halaman Inggris (/), menu MERCHANDISE dan ikon bendera berada di satu baris horizontal yang sejajar
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    const enMerchBox = await page.locator('nav a, header a', { hasText: /^MERCHANDISE$/i }).last().boundingBox();
    const enFlagBox = await page.locator('nav a img, header a img').last().boundingBox();

    if (enMerchBox && enFlagBox) {
      expect(Math.abs(enFlagBox.y - enMerchBox.y)).toBeLessThan(30);
    }

    // 2. Pada halaman Indonesia (/id/), karena teks menu lebih panjang, ikon bendera turun (wrap) ke baris di bawahnya
    await page.goto(`${BASE_URL}/id/`, { waitUntil: 'domcontentloaded' });
    const idMerchBox = await page.locator('nav a, header a', { hasText: /^MERCHANDISE$/i }).last().boundingBox();
    const idFlagBox = await page.locator('nav a img, header a img').last().boundingBox();

    if (idMerchBox && idFlagBox) {
      expect(idFlagBox.y).toBeGreaterThan(idMerchBox.y + 20);
    }
  });

  test('TC-BM-014 (Verifikasi BUG-BM-004): Tombol "Gallery Borobudur Marathon 2025" pada /gallery/ salah mengarah ke /gallery-2026/', async ({ page }) => {
    await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'domcontentloaded' });

    // Temuan bug 4: Tombol arsip tahun 2025 memiliki tautan keliru ke /gallery-2026/
    const btn2025 = page.locator('a', { hasText: /Gallery Borobudur Marathon 2025/i }).first();
    await expect(btn2025).toBeAttached();
    const href = await btn2025.getAttribute('href');
    expect(href).toContain('/gallery-2026/');
  });

  test('TC-BM-015 (Verifikasi BUG-BM-005): Deteksi response API 404 pada galeri foto Boyolali untuk filter Start - Finish dan Jl. Raya Boyolali – Semarang', async ({ page }) => {
    // Temuan bug 5: API SteelyToe resources master_file_tagging merespon 404 pada tag Start - Finish
    const apiRes = await page.request.get(
      'https://api.steelytoe.com/api/v1/resources/master_file_tagging?pageSize=9&page=1&event_id=1&tag_id=Start+-+Finish'
    );
    expect(apiRes.status()).toBe(404);

    const pageRes = await page.goto(`${BASE_URL}/bank-jateng-friendship-run-boyolali-2026-gallery/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(pageRes?.status()).toBe(200);
  });

  test('TC-BM-016 (Verifikasi BUG-BM-006): Halaman galeri Semarang menampilkan error direktori tidak ditemukan', async ({ page }) => {
    // Temuan bug 6: Galeri foto Semarang gagal memuat folder aset gambar
    const response = await page.goto(`${BASE_URL}/friendship-run-gallery/`, {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(200);

    const errorText = page.locator('text=The root directory of the gallery couldn\'t be found');
    await expect(errorText.first()).toBeVisible();
  });
});
