# QA Technical Test Qbit — Muhammad Faiz Fauzan

Repositori ini memuat seluruh hasil pengerjaan **QA/Tester Technical Test Qbit**, yang mencakup implementasi antarmuka pengguna (**React + TypeScript + Tailwind CSS**) serta pengujian otomatis End-to-End menyeluruh menggunakan **Playwright Test Runner (`@playwright/test`)** dengan total **46 test cases** yang semuanya berstatus **PASS**.

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
  - Skenario pengujian negatif (field kosong, karakter angka/simbol pada nama, format tanggal tidak valid, tanggal kalender tidak valid seperti 31 Feb, tanggal masa depan, serta boundary whitespace).

### 2. Nomor 2 — Live Testing Website Borobudur Marathon
- **Target Pengujian**: [https://borobudurmarathon.com/](https://borobudurmarathon.com/)
- **Pemetaan Slug/Slash**: Menganalisis dan memetakan 35+ *slug* dan *sub-slug* pada versi Bahasa Inggris (`/`), Bahasa Indonesia (`/id/*`), dan portal registrasi peserta (`https://my.borobudurmarathon.com/signin`).
- **Automation Test (`tests/nomor-2-borobudur/borobudur.spec.ts`)**: **15 Test Cases (`TC-BM-001` s/d `TC-BM-015`)**
  - Akses halaman utama, pergantian bahasa (*Language Switcher* EN <-> ID), Race Category, Rules & Regulations, Prizes, FAQ accordion, Race Results pihak ketiga, Program Friendship Run & Young Talent, Media Gallery lintas tahun, Contact, dan Portal Registrasi Akun.
  - Verifikasi otomatis terhadap **5 Bug** yang ditemukan:
    1. `BUG-BM-001`: Menu navigasi "Bank Jateng Young Talent" pada versi EN keliru mengarah ke `/id/young-talent-2026/`.
    2. `BUG-BM-002`: Tautan email footer `info@borobudurmarathon.com` tidak menggunakan `mailto:`.
    3. `BUG-BM-003`: Request script `wp-emoji-release.min.js` menghasilkan respon `404 Not Found`.
    4. `BUG-BM-004`: Tautan ikon Facebook pada footer mengarah ke event lama (`BorobudurMarathon2024`).
    5. `BUG-BM-005`: Layout ikon bendera bahasa (*Language Switcher*) pada *navbar* turun ke baris baru pada halaman Bahasa Indonesia (`/id/`).

### 3. Nomor 3 — Flow Chart POS System (Split Payment 40:60 & Diskon)
- **Implementasi UI**: Sistem POS kasir interaktif (`src/pages/Nomor3PosPage.tsx` dan `src/utils/posTransaction.ts`) mengikuti seluruh percabangan diagram alir:
  - *Selects items to purchase* -> *Add Items to Cart*.
  - *Chooses to apply discount* -> *Apply Discount/Promotion* -> Percabangan *Discount Applied?*:
    - **Ya** (Belanja $\ge$ Rp100.000): *Calculate Discounted Total* (potongan diskon 10%).
    - **Tidak** (Belanja $<$ Rp100.000): Diarahkan kembali ke *Add Items to Cart*.
  - *Enters payment information* -> *Split Payment 40:60* (40% Tunai : 60% QRIS).
  - *Process Payment* -> *Payment approved* -> *Complete Sale*.
  - *Print Receipt* (cetak struk fisik) dan *Send Digital Receipt* (kirim struk via Email/WhatsApp).
- **Automation Test (`tests/nomor-3-flowchart/flowchart.spec.ts`)**: **16 Test Cases**
  - **Bagian 3a (Split Payment 40:60)**: `TC-SP-001` s/d `TC-SP-008` (uang pas, kembalian uang lebih, kombinasi diskon, uang tunai kurang, QRIS gagal, rasio tidak 100%, keranjang kosong, isi uang pas).
  - **Bagian 3b (Diskon Minimal Rp100.000)**: `TC-DSC-001` s/d `TC-DSC-008` (boundary tepat Rp100.000, di atas Rp100.000, tolak di bawah Rp100.000, boundary Rp99.000, transisi flow chart loop penambahan barang, pembatalan otomatis saat barang dikurangi, jalur belanja tanpa diskon, dan skenario end-to-end penuh).

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
│   │   └── borobudur.spec.ts      # Automation test Playwright Nomor 2 (15 test cases)
│   └── nomor-3-flowchart/
│       └── flowchart.spec.ts      # Automation test Playwright Nomor 3 (16 test cases)
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
- **Halaman POS Flow Chart (Nomor 3)**: [http://127.0.0.1:3000/pos](http://127.0.0.1:3000/pos)

### 3. Menjalankan Automation Testing (Playwright)

- **Menjalankan seluruh pengujian (Total 46 Test Cases)**:
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
