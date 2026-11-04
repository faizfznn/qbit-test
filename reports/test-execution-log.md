# Playwright Test Execution Logs

Dokumen ini memuat catatan lengkap log eksekusi pengujian otomatis (*Automation Testing*) yang dijalankan menggunakan **Playwright Test Runner (`@playwright/test`)** pada proyek **QA Technical Test Qbit**.

---

## Ringkasan Eksekusi Pengujian

| No | Modul / Soal Pengujian | File Test Spec | Jumlah Test Case | Status | Durasi Rata-rata |
|:--:|:-----------------------|:---------------|:----------------:|:------:|:----------------:|
| 1 | **Nomor 1 — User Interface Testing** ("Input your profile") | `tests/nomor-1-profile/profile.spec.ts` | 15 | **PASS** (15/15) | ~11.5s |
| 2 | **Nomor 2 — Live Testing** (Borobudur Marathon) | `tests/nomor-2-borobudur/borobudur.spec.ts` | 16 | **PASS** (16/16) | ~57.1s |
| 3 | **Nomor 3 — Flow Chart POS** (Split Payment 40:60 & Diskon) | `tests/nomor-3-flowchart/flowchart.spec.ts` | 16 | **PASS** (16/16) | ~16.1s |
| **TOTAL** | **Seluruh Rangkaian Pengujian End-to-End** | `tests/**` | **47** | **ALL PASSED (47/47)** | **~1.3m** |

---

## 1. Log Eksekusi Keseluruhan (`npm test`)

Perintah untuk mengeksekusi seluruh pengujian sekaligus:
```bash
npm test
```

### Output Terminal:
```text
> qbit-qa-test@1.0.0 test
> node ./node_modules/@playwright/test/cli.js test

Running 47 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:18:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-001: Verifikasi tampilan elemen UI, label, placeholder, dan default state (699ms)
  ok  2 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:45:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-002: Verifikasi fungsi tombol navigasi Back (<-) (482ms)
  ok  3 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:52:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-003 (Positive): Simpan profil dengan mengisi seluruh field (Wajib & Opsional) (504ms)
  ok  4 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:68:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-004 (Positive): Simpan profil hanya dengan field Wajib (Middle & Last Name dikosongkan) (473ms)
  ok  5 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:81:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-005 (Positive): Mengubah pilihan Gender dari Male ke Female dan menyimpan profil (548ms)
  ok  6 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:102:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-006 (Negative): Gagal simpan ketika seluruh field dikosongkan (494ms)
  ok  7 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:113:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-007 (Negative): Gagal simpan ketika First Name dikosongkan (515ms)
  ok  8 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:123:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-008 (Negative): Gagal simpan ketika Nickname dikosongkan (514ms)
  ok  9 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:133:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-009 (Negative): Gagal simpan ketika Birth Date dikosongkan (527ms)
  ok 10 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:143:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-010 (Negative): Gagal simpan ketika First Name berisi angka atau karakter spesial (530ms)
  ok 11 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:155:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-011 (Negative): Gagal simpan ketika Middle Name atau Last Name berisi angka/simbol (621ms)
  ok 12 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:170:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-012 (Negative): Gagal simpan ketika format Birth Date tidak sesuai DD MMM YYYY (497ms)
  ok 13 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:182:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-013 (Negative): Gagal simpan ketika Birth Date berisi tanggal kalender tidak valid (31 Feb 2000) (493ms)
  ok 14 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:194:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-014 (Negative): Gagal simpan ketika Birth Date berada di masa depan (563ms)
  ok 15 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:206:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-015 (Boundary): Gagal simpan ketika field wajib hanya diisi spasi (whitespace) (509ms)
  ok 16 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:16:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-001: Verifikasi akses halaman utama (Homepage /) dan elemen navigasi utama (1.8s)
  ok 17 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:30:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-002: Verifikasi fitur pergantian bahasa (Language Switcher EN <-> ID) (2.7s)
  ok 18 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:47:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-003: Verifikasi halaman Race Category (/bank-jateng-borobudur-marathon-2026/) (1.7s)
  ok 19 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:56:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-004: Verifikasi halaman Rules & Regulations (/rules-regulations/) beserta sub-slug ketentuan (2.6s)
  ok 20 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:81:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-005: Verifikasi halaman Prizes (/prizes-2026/ dan /id/hadiah-2026/) (2.2s)
  ok 21 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:93:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-006: Verifikasi halaman FAQ (/faq/) dan interaksi Accordion pada sub-slug (/faq-borobudur-marathon/) (7.4s)
  ok 22 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:113:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-007: Verifikasi halaman Race Results (/race-results/) dan tautan hasil lomba tahun 2017-2025 (1.4s)
  ok 23 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:129:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-008: Verifikasi halaman Program Friendship Run & Young Talent beserta sub-slug seleksi (5.7s)
  ok 24 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:148:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-009: Verifikasi halaman Media: Gallery (/gallery/) lintas tahun (2022-2026) dan Race Guide (/race-guide/) (1.8s)
  ok 25 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:161:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-010: Verifikasi halaman Contact (/contact/), Sponsors (/sponsors/), Apps (/apps/), dan Merchandise (/official-merchandise/) (7.4s)
  ok 26 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:173:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-011 (Verifikasi BUG-BM-001): Menu navbar Bank Jateng Young Talent pada EN mengarah ke slug ID (1.7s)
  ok 27 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:184:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-012 (Verifikasi BUG-BM-002): Tautan email info@borobudurmarathon.com di Footer menggunakan href="/contact" (1.5s)
  ok 28 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:195:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-013 (Verifikasi BUG-BM-003): Layout ikon bendera bahasa turun ke baris baru pada halaman Bahasa Indonesia (/id/) (4.1s)
  ok 29 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:215:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-014 (Verifikasi BUG-BM-004): Tombol "Gallery Borobudur Marathon 2025" pada /gallery/ salah mengarah ke /gallery-2026/ (3.0s)
  ok 30 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:225:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-015 (Verifikasi BUG-BM-005): Deteksi response API 404 pada galeri foto Boyolali untuk filter Start - Finish dan Jl. Raya Boyolali – Semarang (2.1s)
  ok 31 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:238:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-016 (Verifikasi BUG-BM-006): Halaman galeri Semarang menampilkan error direktori tidak ditemukan (1.6s)
  ok 32 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:11:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-001 (Positive): Split Payment 40:60 Tunai dan QRIS dengan uang tunai pas dan cetak struk fisik (Print Receipt) (786ms)
  ok 33 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:42:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-002 (Positive): Split Payment 40:60 dengan uang tunai lebih (perhitungan kembalian) dan kirim struk digital (Send Digital Receipt) (746ms)
  ok 34 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:68:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-003 (Positive): Split Payment 40:60 setelah potongan Diskon Belanja Minimal Rp100.000 (890ms)
  ok 35 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:93:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-004 (Negative): Gagal memproses Split Payment 40:60 apabila nominal uang tunai kurang dari porsi 40% (776ms)
  ok 36 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:109:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-005 (Negative): Gagal menyelesaikan Split Payment 40:60 apabila pembayaran QRIS (60%) gagal atau belum terverifikasi (868ms)
  ok 37 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:126:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-006 (Negative): Gagal memproses Split Payment apabila total rasio pembagian tidak sama dengan 100% (837ms)
  ok 38 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:144:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-007 (Negative): Gagal memproses pembayaran ketika keranjang belanja masih kosong (Rp0) (597ms)
  ok 39 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:153:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-008 (Positive): Verifikasi tombol Isi Uang Pas mengisi tepat 40% tagihan pada skenario nominal ganjil/ribuan (737ms)
  ok 40 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:172:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-001 (Boundary - Positive): Pembelian beberapa barang dengan total belanja tepat Rp100.000 berhasil mendapat diskon 10% (703ms)
  ok 41 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:191:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-002 (Positive): Pembelian beberapa barang dengan total belanja di atas Rp100.000 (Rp155.000) berhasil mendapat diskon (742ms)
  ok 42 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:207:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-003 (Negative): Pembelian beberapa barang di bawah Rp100.000 (Rp80.000) ditolak saat menerapkan diskon (Discount Applied: NO) (653ms)
  ok 43 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:224:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-004 (Boundary - Negative): Pembelian beberapa barang sebesar Rp99.000 (kurang Rp1.000 dari batas minimal) tidak mendapat diskon (709ms)
  ok 44 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:238:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-005 (Positive - Flow Chart Loop): Alur Discount Applied = NO -> Add Items to Cart -> Discount Applied = YES -> Calculate Discounted Total (713ms)
  ok 45 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:255:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-006 (Negative - Dynamic Cart Update): Diskon otomatis dibatalkan apabila pelanggan mengurangi barang hingga subtotal turun di bawah Rp100.000 (657ms)
  ok 46 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:270:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-007 (Positive - Flow Chart Jalur Kiri): Pembelian beberapa barang tanpa menggunakan diskon (Selects items -> Add to Cart -> Process Payment) (745ms)
  ok 47 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:287:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-008 (Positive - End-to-End Flow Chart): Alur penuh dari pilih beberapa barang >= Rp100.000, diskon 10%, Split Payment 40:60, hingga Print & Digital Receipt (1.0s)

  47 passed (1.3m)
```

---

## 2. Log Eksekusi Nomor 1 (`npm run test:no1`)

Perintah untuk mengeksekusi pengujian Nomor 1 saja:
```bash
npm run test:no1
```

### Output Terminal:
```text
> qbit-qa-test@1.0.0 test:no1
> node ./node_modules/@playwright/test/cli.js test tests/nomor-1-profile

Running 15 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:18:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-001: Verifikasi tampilan elemen UI, label, placeholder, dan default state (673ms)
  ok  2 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:45:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-002: Verifikasi fungsi tombol navigasi Back (<-) (484ms)
  ok  3 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:52:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-003 (Positive): Simpan profil dengan mengisi seluruh field (Wajib & Opsional) (515ms)
  ok  4 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:68:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-004 (Positive): Simpan profil hanya dengan field Wajib (Middle & Last Name dikosongkan) (536ms)
  ok  5 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:81:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-005 (Positive): Mengubah pilihan Gender dari Male ke Female dan menyimpan profil (576ms)
  ok  6 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:102:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-006 (Negative): Gagal simpan ketika seluruh field dikosongkan (455ms)
  ok  7 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:113:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-007 (Negative): Gagal simpan ketika First Name dikosongkan (487ms)
  ok  8 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:123:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-008 (Negative): Gagal simpan ketika Nickname dikosongkan (501ms)
  ok  9 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:133:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-009 (Negative): Gagal simpan ketika Birth Date dikosongkan (488ms)
  ok 10 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:143:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-010 (Negative): Gagal simpan ketika First Name berisi angka atau karakter spesial (508ms)
  ok 11 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:155:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-011 (Negative): Gagal simpan ketika Middle Name atau Last Name berisi angka/simbol (567ms)
  ok 12 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:170:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-012 (Negative): Gagal simpan ketika format Birth Date tidak sesuai DD MMM YYYY (474ms)
  ok 13 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:182:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-013 (Negative): Gagal simpan ketika Birth Date berisi tanggal kalender tidak valid (31 Feb 2000) (537ms)
  ok 14 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:194:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-014 (Negative): Gagal simpan ketika Birth Date berada di masa depan (558ms)
  ok 15 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:206:3 › Nomor 1 - User Interface Testing: Input your profile › TC-UI-015 (Boundary): Gagal simpan ketika field wajib hanya diisi spasi (whitespace) (503ms)

  15 passed (11.5s)
```

---

## 3. Log Eksekusi Nomor 2 (`npm run test:no2`)

Perintah untuk mengeksekusi pengujian Nomor 2 saja:
```bash
npm run test:no2
```

### Output Terminal:
```text
> qbit-qa-test@1.0.0 test:no2
> node ./node_modules/@playwright/test/cli.js test tests/nomor-2-borobudur

Running 16 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:16:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-001: Verifikasi akses halaman utama (Homepage /) dan elemen navigasi utama (3.6s)
  ok  2 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:30:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-002: Verifikasi fitur pergantian bahasa (Language Switcher EN <-> ID) (3.1s)
  ok  3 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:47:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-003: Verifikasi halaman Race Category (/bank-jateng-borobudur-marathon-2026/) (1.6s)
  ok  4 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:56:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-004: Verifikasi halaman Rules & Regulations (/rules-regulations/) beserta sub-slug ketentuan (2.0s)
  ok  5 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:81:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-005: Verifikasi halaman Prizes (/prizes-2026/ dan /id/hadiah-2026/) (2.7s)
  ok  6 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:93:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-006: Verifikasi halaman FAQ (/faq/) dan interaksi Accordion pada sub-slug (/faq-borobudur-marathon/) (2.4s)
  ok  7 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:113:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-007: Verifikasi halaman Race Results (/race-results/) dan tautan hasil lomba tahun 2017-2025 (1.8s)
  ok  8 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:129:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-008: Verifikasi halaman Program Friendship Run & Young Talent beserta sub-slug seleksi (5.6s)
  ok  9 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:148:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-009: Verifikasi halaman Media: Gallery (/gallery/) lintas tahun (2022-2026) dan Race Guide (/race-guide/) (2.6s)
  ok 10 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:161:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-010: Verifikasi halaman Contact (/contact/), Sponsors (/sponsors/), Apps (/apps/), dan Merchandise (/official-merchandise/) (7.4s)
  ok 11 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:173:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-011 (Verifikasi BUG-BM-001): Menu navbar Bank Jateng Young Talent pada EN mengarah ke slug ID (2.8s)
  ok 12 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:184:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-012 (Verifikasi BUG-BM-002): Tautan email info@borobudurmarathon.com di Footer menggunakan href="/contact" (5.9s)
  ok 13 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:195:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-013 (Verifikasi BUG-BM-003): Layout ikon bendera bahasa turun ke baris baru pada halaman Bahasa Indonesia (/id/) (3.1s)
  ok 14 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:215:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-014 (Verifikasi BUG-BM-004): Tombol "Gallery Borobudur Marathon 2025" pada /gallery/ salah mengarah ke /gallery-2026/ (4.6s)
  ok 15 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:225:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-015 (Verifikasi BUG-BM-005): Deteksi response API 404 pada galeri foto Boyolali untuk filter Start - Finish dan Jl. Raya Boyolali – Semarang (2.3s)
  ok 16 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:238:3 › Nomor 2 - Live Testing: Website Borobudur Marathon (https://borobudurmarathon.com/) › TC-BM-016 (Verifikasi BUG-BM-006): Halaman galeri Semarang menampilkan error direktori tidak ditemukan (1.5s)

  16 passed (57.1s)
```

---

## 4. Log Eksekusi Nomor 3 (`npm run test:no3`)

Perintah untuk mengeksekusi pengujian Nomor 3 saja:
```bash
npm run test:no3
```

### Output Terminal:
```text
> qbit-qa-test@1.0.0 test:no3
> node ./node_modules/@playwright/test/cli.js test tests/nomor-3-flowchart

Running 16 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:11:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-001 (Positive): Split Payment 40:60 Tunai dan QRIS dengan uang tunai pas dan cetak struk fisik (Print Receipt) (976ms)
  ok  2 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:42:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-002 (Positive): Split Payment 40:60 dengan uang tunai lebih (perhitungan kembalian) dan kirim struk digital (Send Digital Receipt) (726ms)
  ok  3 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:68:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-003 (Positive): Split Payment 40:60 setelah potongan Diskon Belanja Minimal Rp100.000 (782ms)
  ok  4 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:93:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-004 (Negative): Gagal memproses Split Payment 40:60 apabila nominal uang tunai kurang dari porsi 40% (655ms)
  ok  5 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:109:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-005 (Negative): Gagal menyelesaikan Split Payment 40:60 apabila pembayaran QRIS (60%) gagal atau belum terverifikasi (711ms)
  ok  6 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:126:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-006 (Negative): Gagal memproses Split Payment apabila total rasio pembagian tidak sama dengan 100% (773ms)
  ok  7 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:144:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-007 (Negative): Gagal memproses pembayaran ketika keranjang belanja masih kosong (Rp0) (504ms)
  ok  8 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:153:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-SP-008 (Positive): Verifikasi tombol Isi Uang Pas mengisi tepat 40% tagihan pada skenario nominal ganjil/ribuan (720ms)
  ok  9 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:172:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-001 (Boundary - Positive): Pembelian beberapa barang dengan total belanja tepat Rp100.000 berhasil mendapat diskon 10% (703ms)
  ok 10 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:191:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-002 (Positive): Pembelian beberapa barang dengan total belanja di atas Rp100.000 (Rp155.000) berhasil mendapat diskon (740ms)
  ok 11 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:207:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-003 (Negative): Pembelian beberapa barang di bawah Rp100.000 (Rp80.000) ditolak saat menerapkan diskon (Discount Applied: NO) (623ms)
  ok 12 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:224:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-004 (Boundary - Negative): Pembelian beberapa barang sebesar Rp99.000 (kurang Rp1.000 dari batas minimal) tidak mendapat diskon (773ms)
  ok 13 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:238:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-005 (Positive - Flow Chart Loop): Alur Discount Applied = NO -> Add Items to Cart -> Discount Applied = YES -> Calculate Discounted Total (733ms)
  ok 14 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:255:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-006 (Negative - Dynamic Cart Update): Diskon otomatis dibatalkan apabila pelanggan mengurangi barang hingga subtotal turun di bawah Rp100.000 (709ms)
  ok 15 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:270:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-007 (Positive - Flow Chart Jalur Kiri): Pembelian beberapa barang tanpa menggunakan diskon (Selects items -> Add to Cart -> Process Payment) (925ms)
  ok 16 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:287:3 › Nomor 3 - Flow Chart POS: Split Payment 40:60 & Diskon Minimal Rp100.000 › TC-DSC-008 (Positive - End-to-End Flow Chart): Alur penuh dari pilih beberapa barang >= Rp100.000, diskon 10%, Split Payment 40:60, hingga Print & Digital Receipt (1.2s)

  16 passed (16.1s)
```

---

## 5. Membuka Laporan HTML Interaktif (`npm run test:report`)

Playwright secara otomatis mengompilasi laporan visual HTML interaktif setiap kali pengujian selesai dijalankan. Untuk membuka laporan tersebut di browser lokal:

```bash
npm run test:report
```

Laporan ini memuat:
- Filter status pengujian (*Passed*, *Failed*, *Skipped*).
- Trace langkah pengujian (*action steps* & *locator interaction*).
- Durasi detail eksekusi setiap test case.
- Log error & screenshot otomatis apabila terdapat test yang gagal.
