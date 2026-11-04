# QA Technical Test Qbit — Muhammad Faiz Fauzan

Repositori ini memuat seluruh hasil pengerjaan **QA/Tester Technical Test Qbit**, yang mencakup implementasi antarmuka pengguna (**React + TypeScript + Tailwind CSS**) serta pengujian otomatis End-to-End menyeluruh menggunakan **Playwright Test Runner (`@playwright/test`)** dengan total **47 test cases** yang seluruhnya berstatus **PASS (100% Passed)**.

---

## Ringkasan Modul & Cakupan Pengujian

### 1. Nomor 1 — User Interface Testing ("Input your profile")
- **Implementasi UI**: Form profil mobile (`src/pages/Nomor1ProfilePage.tsx` dan `src/components/ui/`) sesuai rancangan visual soal (Back button, First Name, Middle Name, Last Name, Nickname, Gender radio buttons, Birth Date, dan tombol Save).
- **Aturan Validasi**:
  - **Wajib**: *First Name*, *Nickname*, *Gender*, dan *Birth Date*.
  - **Opsional**: *Middle Name* dan *Last Name*.
- **Automation Test (`tests/nomor-1-profile/profile.spec.ts`)**: **15 Test Cases (`TC-UI-001` s/d `TC-UI-015`)**
  - Verifikasi elemen visual, placeholder, label penanda `(Optional)`, dan default value.
  - Skenario pengujian positif (data lengkap wajib & opsional, data hanya field wajib, perubahan gender).
  - Skenario pengujian negatif (field kosong, karakter angka/simbol pada nama, format tanggal tidak sesuai DD MMM YYYY, tanggal kalender tidak valid seperti 31 Feb, tanggal masa depan, serta boundary whitespace).

### 2. Nomor 2 — Live Testing Website Borobudur Marathon
- **Target Pengujian**: [https://borobudurmarathon.com/](https://borobudurmarathon.com/)
- **Pemetaan Slug/Slash**: Menganalisis dan memetakan 35+ *slug* dan *sub-slug* pada versi Bahasa Inggris (`/`), Bahasa Indonesia (`/id/*`), dan portal terkait.
- **Automation Test (`tests/nomor-2-borobudur/borobudur.spec.ts`)**: **16 Test Cases (`TC-BM-001` s/d `TC-BM-016`)**
  - 10 Test Case Fungsional: Akses halaman utama, pergantian bahasa (*Language Switcher* EN <-> ID), Race Category, Rules & Regulations (5 sub-slug), Prizes, FAQ accordion, Race Results pihak ketiga (ScoreNow), Program Friendship Run & Young Talent, Media Gallery lintas tahun, dan Contact/Sponsors/Apps/Merchandise.
  - 6 Test Case Verifikasi Temuan Bug Nyata:
    1. `BUG-BM-001` (`TC-BM-011`): Menu navbar "Bank Jateng Young Talent" pada versi EN mengarah ke slug ID (`/id/young-talent-2026/`).
    2. `BUG-BM-002` (`TC-BM-012`): Tautan email footer `info@borobudurmarathon.com` tidak menggunakan protokol `mailto:`.
    3. `BUG-BM-003` (`TC-BM-013`): Layout ikon bendera bahasa (*Language Switcher*) pada *navbar* turun ke baris baru (*wrap*) pada halaman Bahasa Indonesia (`/id/`).
    4. `BUG-BM-004` (`TC-BM-014`): Tombol "Gallery Borobudur Marathon 2025" pada `/gallery/` salah mengarah ke galeri 2026 (`/gallery-2026/`).
    5. `BUG-BM-005` (`TC-BM-015`): Response API `404 Not Found` pada galeri foto Friendship Run Boyolali khusus filter *Start - Finish* dan *Jl. Raya Boyolali – Semarang*.
    6. `BUG-BM-006` (`TC-BM-016`): Halaman galeri foto Friendship Run Semarang (`/friendship-run-gallery/`) rusak dengan pesan error direktori tidak ditemukan.

### 3. Nomor 3 — Flow Chart POS System (Split Payment 40:60 & Diskon)
- **Implementasi UI**: Sistem POS kasir interaktif (`src/pages/Nomor3PosPage.tsx` dan `src/utils/posTransaction.ts`) mengikuti seluruh percabangan diagram alir transaksi penjualan:
  - *Selects items to purchase* -> *Add Items to Cart*.
  - *Chooses to apply discount* -> *Apply Discount/Promotion* -> Percabangan *Discount Applied?*:
    - **Ya** (Belanja $\ge$ Rp100.000): *Calculate Discounted Total* (potongan diskon 10%).
    - **Tidak** (Belanja $<$ Rp100.000): Diarahkan kembali ke *Add Items to Cart*.
  - *Enters payment information* -> *Split Payment 40:60* (40% Tunai : 60% QRIS).
  - *Process Payment* -> *Payment approved* -> *Complete Sale*.
  - *Print Receipt* (cetak struk fisik) dan *Send Digital Receipt* (kirim struk via Email/WhatsApp).
- **Automation Test (`tests/nomor-3-flowchart/flowchart.spec.ts`)**: **16 Test Cases**
  - **Bagian 3a (Split Payment 40:60)**: `TC-SP-001` s/d `TC-SP-008` (uang pas, kembalian uang lebih, kombinasi diskon, uang tunai kurang, QRIS gagal/timeout, rasio tidak 100%, keranjang kosong, dan shortcut tombol "Isi Uang Pas").
  - **Bagian 3b (Diskon Minimal Rp100.000)**: `TC-DSC-001` s/d `TC-DSC-008` (boundary tepat Rp100.000, belanja di atas Rp100.000, tolak di bawah Rp100.000, boundary Rp99.000, alur loop flowchart penambahan barang hingga diskon aktif, pembatalan otomatis saat barang dikurangi, jalur normal tanpa diskon, dan skenario end-to-end penuh).

---

## Struktur Direktori Proyek

```text
├── src/
│   ├── components/ui/
│   │   ├── Button.tsx             # Komponen Button reusable (primary, icon, secondary)
│   │   ├── InputField.tsx         # Komponen InputField reusable (label, placeholder, error, optional badge)
│   │   └── RadioGroup.tsx         # Komponen RadioGroup reusable
│   ├── pages/
│   │   ├── Nomor1ProfilePage.tsx  # Tampilan mobile form profil Soal Nomor 1
│   │   └── Nomor3PosPage.tsx      # Tampilan sistem POS flow chart Soal Nomor 3
│   ├── utils/
│   │   ├── profileValidation.ts   # Fungsi & aturan validasi form profil Soal Nomor 1
│   │   └── posTransaction.ts      # Kalkulasi bisnis, diskon, & validasi split payment POS Soal Nomor 3
│   └── App.tsx                    # Komponen root aplikasi & tab navigasi antar halaman
├── tests/
│   ├── nomor-1-profile/
│   │   └── profile.spec.ts        # Automation test Playwright Nomor 1 (15 test cases)
│   ├── nomor-2-borobudur/
│   │   └── borobudur.spec.ts      # Automation test Playwright Nomor 2 (16 test cases)
│   └── nomor-3-flowchart/
│       └── flowchart.spec.ts      # Automation test Playwright Nomor 3 (16 test cases)
├── reports/
│   └── test-execution-log.md      # Catatan lengkap log eksekusi terminal seluruh suite pengujian
├── playwright.config.ts           # Konfigurasi Playwright (mobile viewport, webServer, reporting)
├── package.json
└── README.md
```

---

## Panduan Menjalankan Aplikasi & Pengujian

### 1. Instalasi Dependencies
```bash
npm install
```

### 2. Menjalankan Tampilan UI di Browser
```bash
npm run dev
```
Buka browser pada alamat:
- **Halaman Form Profil (Nomor 1)**: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
- **Halaman POS Flow Chart (Nomor 3)**: [http://127.0.0.1:3000/nomor3](http://127.0.0.1:3000/nomor3)

### 3. Menjalankan Automation Testing (Playwright)

- **Menjalankan seluruh pengujian (Total 47 Test Cases)**:
  ```bash
  npm test
  ```

- **Menjalankan pengujian per nomor**:
  - **Nomor 1 Saja (`profile.spec.ts`)**:
    ```bash
    npm run test:no1
    ```
  - **Nomor 2 Saja (`borobudur.spec.ts`)**:
    ```bash
    npm run test:no2
    ```
  - **Nomor 3 Saja (`flowchart.spec.ts`)**:
    ```bash
    npm run test:no3
    ```

- **Membuka Playwright UI Mode (Visual & Interaktif)**:
  ```bash
  npm run test:ui
  ```

- **Membuka Laporan Hasil Pengujian (HTML Report)**:
  ```bash
  npm run test:report
  ```

---

## Log Hasil Eksekusi Pengujian (Test Execution Logs)

Seluruh pengujian otomatis telah dijalankan dan diverifikasi dengan hasil **47 passed (100% PASS)**. Laporan mendalam per suite tersedia pada file [`reports/test-execution-log.md`](reports/test-execution-log.md).

### Ringkasan Status Pengujian:

| Suite Pengujian | File Uji | Jumlah Test | Hasil | Waktu Eksekusi |
|:---|:---|:---:|:---:|:---:|
| **Nomor 1 — Profile UI Form** | `tests/nomor-1-profile/profile.spec.ts` | 15 | **15 PASS** | 11.5s |
| **Nomor 2 — Live Website Borobudur** | `tests/nomor-2-borobudur/borobudur.spec.ts` | 16 | **16 PASS** | 57.1s |
| **Nomor 3 — POS System Flow Chart** | `tests/nomor-3-flowchart/flowchart.spec.ts` | 16 | **16 PASS** | 16.1s |
| **Total Keseluruhan** | `tests/**` | **47** | **47 PASSED** | **1.3m** |

<details>
<summary><b>Klik untuk melihat Terminal Output Log: Nomor 1 (15 Passed)</b></summary>

```text
> qbit-qa-test@1.0.0 test:no1
> node ./node_modules/@playwright/test/cli.js test tests/nomor-1-profile

Running 15 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:18:3 › TC-UI-001: Verifikasi tampilan elemen UI, label, placeholder, dan default state (673ms)
  ok  2 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:45:3 › TC-UI-002: Verifikasi fungsi tombol navigasi Back (<-) (484ms)
  ok  3 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:52:3 › TC-UI-003 (Positive): Simpan profil dengan mengisi seluruh field (Wajib & Opsional) (515ms)
  ok  4 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:68:3 › TC-UI-004 (Positive): Simpan profil hanya dengan field Wajib (Middle & Last Name dikosongkan) (536ms)
  ok  5 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:81:3 › TC-UI-005 (Positive): Mengubah pilihan Gender dari Male ke Female dan menyimpan profil (576ms)
  ok  6 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:102:3 › TC-UI-006 (Negative): Gagal simpan ketika seluruh field dikosongkan (455ms)
  ok  7 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:113:3 › TC-UI-007 (Negative): Gagal simpan ketika First Name dikosongkan (487ms)
  ok  8 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:123:3 › TC-UI-008 (Negative): Gagal simpan ketika Nickname dikosongkan (501ms)
  ok  9 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:133:3 › TC-UI-009 (Negative): Gagal simpan ketika Birth Date dikosongkan (488ms)
  ok 10 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:143:3 › TC-UI-010 (Negative): Gagal simpan ketika First Name berisi angka atau karakter spesial (508ms)
  ok 11 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:155:3 › TC-UI-011 (Negative): Gagal simpan ketika Middle Name atau Last Name berisi angka/simbol (567ms)
  ok 12 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:170:3 › TC-UI-012 (Negative): Gagal simpan ketika format Birth Date tidak sesuai DD MMM YYYY (474ms)
  ok 13 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:182:3 › TC-UI-013 (Negative): Gagal simpan ketika Birth Date berisi tanggal kalender tidak valid (31 Feb 2000) (537ms)
  ok 14 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:194:3 › TC-UI-014 (Negative): Gagal simpan ketika Birth Date berada di masa depan (558ms)
  ok 15 [Mobile Chromium] › tests\nomor-1-profile\profile.spec.ts:206:3 › TC-UI-015 (Boundary): Gagal simpan ketika field wajib hanya diisi spasi (whitespace) (503ms)

  15 passed (11.5s)
```
</details>

<details>
<summary><b>Klik untuk melihat Terminal Output Log: Nomor 2 (16 Passed)</b></summary>

```text
> qbit-qa-test@1.0.0 test:no2
> node ./node_modules/@playwright/test/cli.js test tests/nomor-2-borobudur

Running 16 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:16:3 › TC-BM-001: Verifikasi akses halaman utama (Homepage /) dan elemen navigasi utama (3.6s)
  ok  2 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:30:3 › TC-BM-002: Verifikasi fitur pergantian bahasa (Language Switcher EN <-> ID) (3.1s)
  ok  3 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:47:3 › TC-BM-003: Verifikasi halaman Race Category (/bank-jateng-borobudur-marathon-2026/) (1.6s)
  ok  4 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:56:3 › TC-BM-004: Verifikasi halaman Rules & Regulations (/rules-regulations/) beserta sub-slug ketentuan (2.0s)
  ok  5 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:81:3 › TC-BM-005: Verifikasi halaman Prizes (/prizes-2026/ dan /id/hadiah-2026/) (2.7s)
  ok  6 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:93:3 › TC-BM-006: Verifikasi halaman FAQ (/faq/) dan interaksi Accordion pada sub-slug (/faq-borobudur-marathon/) (2.4s)
  ok  7 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:113:3 › TC-BM-007: Verifikasi halaman Race Results (/race-results/) dan tautan hasil lomba tahun 2017-2025 (1.8s)
  ok  8 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:129:3 › TC-BM-008: Verifikasi halaman Program Friendship Run & Young Talent beserta sub-slug seleksi (5.6s)
  ok  9 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:148:3 › TC-BM-009: Verifikasi halaman Media: Gallery (/gallery/) lintas tahun (2022-2026) dan Race Guide (/race-guide/) (2.6s)
  ok 10 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:161:3 › TC-BM-010: Verifikasi halaman Contact (/contact/), Sponsors (/sponsors/), Apps (/apps/), dan Merchandise (/official-merchandise/) (7.4s)
  ok 11 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:173:3 › TC-BM-011 (Verifikasi BUG-BM-001): Menu navbar Bank Jateng Young Talent pada EN mengarah ke slug ID (2.8s)
  ok 12 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:184:3 › TC-BM-012 (Verifikasi BUG-BM-002): Tautan email info@borobudurmarathon.com di Footer menggunakan href="/contact" (5.9s)
  ok 13 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:195:3 › TC-BM-013 (Verifikasi BUG-BM-003): Layout ikon bendera bahasa turun ke baris baru pada halaman Bahasa Indonesia (/id/) (3.1s)
  ok 14 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:215:3 › TC-BM-014 (Verifikasi BUG-BM-004): Tombol "Gallery Borobudur Marathon 2025" pada /gallery/ salah mengarah ke /gallery-2026/ (4.6s)
  ok 15 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:225:3 › TC-BM-015 (Verifikasi BUG-BM-005): Deteksi response API 404 pada galeri foto Boyolali untuk filter Start - Finish dan Jl. Raya Boyolali – Semarang (2.3s)
  ok 16 [Mobile Chromium] › tests\nomor-2-borobudur\borobudur.spec.ts:238:3 › TC-BM-016 (Verifikasi BUG-BM-006): Halaman galeri Semarang menampilkan error direktori tidak ditemukan (1.5s)

  16 passed (57.1s)
```
</details>

<details>
<summary><b>Klik untuk melihat Terminal Output Log: Nomor 3 (16 Passed)</b></summary>

```text
> qbit-qa-test@1.0.0 test:no3
> node ./node_modules/@playwright/test/cli.js test tests/nomor-3-flowchart

Running 16 tests using 1 worker

  ok  1 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:11:3 › TC-SP-001 (Positive): Split Payment 40:60 Tunai dan QRIS dengan uang tunai pas dan cetak struk fisik (Print Receipt) (976ms)
  ok  2 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:42:3 › TC-SP-002 (Positive): Split Payment 40:60 dengan uang tunai lebih (perhitungan kembalian) dan kirim struk digital (Send Digital Receipt) (726ms)
  ok  3 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:68:3 › TC-SP-003 (Positive): Split Payment 40:60 setelah potongan Diskon Belanja Minimal Rp100.000 (782ms)
  ok  4 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:93:3 › TC-SP-004 (Negative): Gagal memproses Split Payment 40:60 apabila nominal uang tunai kurang dari porsi 40% (655ms)
  ok  5 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:109:3 › TC-SP-005 (Negative): Gagal menyelesaikan Split Payment 40:60 apabila pembayaran QRIS (60%) gagal atau belum terverifikasi (711ms)
  ok  6 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:126:3 › TC-SP-006 (Negative): Gagal memproses Split Payment apabila total rasio pembagian tidak sama dengan 100% (773ms)
  ok  7 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:144:3 › TC-SP-007 (Negative): Gagal memproses pembayaran ketika keranjang belanja masih kosong (Rp0) (504ms)
  ok  8 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:153:3 › TC-SP-008 (Positive): Verifikasi tombol Isi Uang Pas mengisi tepat 40% tagihan pada skenario nominal ganjil/ribuan (720ms)
  ok  9 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:172:3 › TC-DSC-001 (Boundary - Positive): Pembelian beberapa barang dengan total belanja tepat Rp100.000 berhasil mendapat diskon 10% (703ms)
  ok 10 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:191:3 › TC-DSC-002 (Positive): Pembelian beberapa barang dengan total belanja di atas Rp100.000 (Rp155.000) berhasil mendapat diskon (740ms)
  ok 11 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:207:3 › TC-DSC-003 (Negative): Pembelian beberapa barang di bawah Rp100.000 (Rp80.000) ditolak saat menerapkan diskon (Discount Applied: NO) (623ms)
  ok 12 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:224:3 › TC-DSC-004 (Boundary - Negative): Pembelian beberapa barang sebesar Rp99.000 (kurang Rp1.000 dari batas minimal) tidak mendapat diskon (773ms)
  ok 13 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:238:3 › TC-DSC-005 (Positive - Flow Chart Loop): Alur Discount Applied = NO -> Add Items to Cart -> Discount Applied = YES -> Calculate Discounted Total (733ms)
  ok 14 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:255:3 › TC-DSC-006 (Negative - Dynamic Cart Update): Diskon otomatis dibatalkan apabila pelanggan mengurangi barang hingga subtotal turun di bawah Rp100.000 (709ms)
  ok 15 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:270:3 › TC-DSC-007 (Positive - Flow Chart Jalur Kiri): Pembelian beberapa barang tanpa menggunakan diskon (Selects items -> Add to Cart -> Process Payment) (925ms)
  ok 16 [Mobile Chromium] › tests\nomor-3-flowchart\flowchart.spec.ts:287:3 › TC-DSC-008 (Positive - End-to-End Flow Chart): Alur penuh dari pilih beberapa barang >= Rp100.000, diskon 10%, Split Payment 40:60, hingga Print & Digital Receipt (1.2s)

  16 passed (16.1s)
```
</details>
