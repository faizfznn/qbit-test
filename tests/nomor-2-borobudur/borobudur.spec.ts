import { test, expect } from '@playwright/test';

/**
 * Suite Pengujian Nomor 2 — Live Testing: Website Borobudur Marathon
 * Target: https://borobudurmarathon.com/
 * Menguji fungsionalitas live website, pemetaan slug/slash utama (EN & ID),
 * integrasi portal registrasi eksternal, serta verifikasi temuan bug secara terotomatisasi.
 */

const BASE_URL = 'https://borobudurmarathon.com';

test.describe('Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/)', () => {
  // Gunakan viewport desktop standar untuk menguji layout navbar & konten web
  test.use({ viewport: { width: 1366, height: 768 } });
  // Timeout 60 detik karena mengakses website publik melalui jaringan internet
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

  test('TC-BM-011: Verifikasi akses Portal Akun Peserta (https://my.borobudurmarathon.com/)', async ({ page }) => {
    const res = await page.goto('https://my.borobudurmarathon.com/', {
      waitUntil: 'domcontentloaded',
    });
    expect(res?.status()).toBe(200);
    await expect(page).toHaveURL(/my\.borobudurmarathon\.com\/signin/i);
    await expect(page).toHaveTitle(/Borobudur Marathon \| Registrant Portal/i);
  });

  // =========================================================================
  // AUTOMATION VERIFIKASI TEMUAN BUG (BUG-BM-001 s/d BUG-BM-005)
  // =========================================================================

  test('TC-BM-012 (Verifikasi BUG-BM-001): Menu navbar Bank Jateng Young Talent pada EN mengarah ke slug ID', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Temuan bug: Pada mode bahasa EN, tautan Young Talent keliru mengarah ke /id/young-talent-2026/
    const youngTalentNavHref = await page
      .locator('a', { hasText: 'Bank Jateng Young Talent' })
      .first()
      .getAttribute('href');
    expect(youngTalentNavHref).toBe('/id/young-talent-2026/');
  });

  test('TC-BM-013 (Verifikasi BUG-BM-002): Tautan email info@borobudurmarathon.com di Footer menggunakan href="/contact"', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Temuan bug: Teks email pada footer tidak menggunakan protokol mailto:
    const footerEmailHref = await page
      .locator('footer a', { hasText: 'info@borobudurmarathon.com' })
      .first()
      .getAttribute('href');
    expect(footerEmailHref).toBe('/contact');
  });

  test('TC-BM-014 (Verifikasi BUG-BM-003 & BUG-BM-004): Deteksi 404 wp-emoji-release.min.js dan tautan Facebook lama', async ({ page }) => {
    const failedEmojiRequests: number[] = [];
    page.on('response', (res) => {
      if (res.url().includes('wp-emoji-release.min.js')) {
        failedEmojiRequests.push(res.status());
      }
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Temuan bug 3: Resource internal WP emoji 404 Not Found
    expect(failedEmojiRequests).toContain(404);

    // Temuan bug 4: Tautan Facebook footer mengarah ke event lama tahun 2024
    const fbHref = await page.locator('footer a[href*="facebook.com"]').first().getAttribute('href');
    expect(fbHref).toContain('BorobudurMarathon2024');
  });

  test('TC-BM-015 (Verifikasi BUG-BM-005): Layout ikon bendera bahasa turun ke baris baru pada halaman Bahasa Indonesia (/id/)', async ({ page }) => {
    // 1. Pada halaman Inggris (/), menu MERCHANDISE dan ikon bendera berada di satu baris horizontal yang sejajar
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    const enMerchBox = await page.locator('nav a, header a', { hasText: /^MERCHANDISE$/i }).last().boundingBox();
    const enFlagBox = await page.locator('nav a img, header a img').last().boundingBox();

    if (enMerchBox && enFlagBox) {
      expect(Math.abs(enFlagBox.y - enMerchBox.y)).toBeLessThan(30);
    }

    // 2. Pada halaman Indonesia (/id/), karena teks menu lebih panjang ("BERANDA", "APLIKASI", dll.), ikon bendera turun (wrap) ke baris di bawahnya
    await page.goto(`${BASE_URL}/id/`, { waitUntil: 'domcontentloaded' });
    const idMerchBox = await page.locator('nav a, header a', { hasText: /^MERCHANDISE$/i }).last().boundingBox();
    const idFlagBox = await page.locator('nav a img, header a img').last().boundingBox();

    if (idMerchBox && idFlagBox) {
      expect(idFlagBox.y).toBeGreaterThan(idMerchBox.y + 20);
    }
  });
});
