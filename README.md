# Qbit QA/Tester Technical Test — Muhammad Faiz Fauzan

Repository ini berisi implementasi UI (**React + TypeScript + Tailwind CSS**) dan **Automation Testing (`@playwright/test`)** untuk seluruh soal pada **QA Test Qbit** (Nomor 1, Nomor 2, dan Nomor 3).

## Struktur Proyek

```text
├── src/
│   ├── components/ui/             # Reusable UI Components (InputField, RadioGroup, Button)
│   ├── pages/
│   │   ├── Nomor1ProfilePage.tsx  # Implementasi UI Soal Nomor 1 ("Input your profile")
│   │   └── Nomor3PosPage.tsx      # Implementasi UI Soal Nomor 3 (Flow Chart POS: Split 40:60 & Diskon)
│   ├── utils/
│   │   ├── profileValidation.ts   # Validasi form profil Soal Nomor 1
│   │   └── posTransaction.ts      # Kalkulasi & validasi transaksi POS Soal Nomor 3
│   └── App.tsx                    # Entry halaman aplikasi (/ dan /pos)
├── tests/
│   ├── nomor-1-profile/
│   │   └── profile.spec.ts        # Automation Test Soal Nomor 1 (15 Test Cases: TC-UI-001 s/d TC-UI-015)
│   ├── nomor-2-borobudur/
│   │   └── borobudur.spec.ts      # Automation Test Soal Nomor 2 (15 Test Cases: TC-BM-001 s/d TC-BM-015)
│   └── nomor-3-flowchart/
│       └── flowchart.spec.ts      # Automation Test Soal Nomor 3 (16 Test Cases: TC-SP-001..008 & TC-DSC-001..008)
├── playwright.config.ts           # Konfigurasi Playwright Test Runner
└── package.json
```

## Cara Menjalankan Proyek

### 1. Instalasi Dependencies
```bash
npm install
```

### 2. Menjalankan Aplikasi UI (Local Development Server)
```bash
npm run dev
```
- Halaman **Nomor 1 (Input Profile UI)**: `http://127.0.0.1:3000/`
- Halaman **Nomor 3 (Flow Chart POS: Split Payment 40:60 & Diskon)**: `http://127.0.0.1:3000/pos`

### 3. Menjalankan Automation Testing (Playwright)
- **Menjalankan seluruh test (Nomor 1, 2, dan 3 — Total 46 Test Cases):**
  ```bash
  npm test
  ```
- **Menjalankan test Nomor 1 (`Input your profile` — 15 Test Cases):**
  ```bash
  npm run test:no1
  ```
- **Menjalankan test Nomor 2 (`Live Testing Borobudur Marathon` — 15 Test Cases):**
  ```bash
  npm run test:no2
  ```
- **Menjalankan test Nomor 3 (`Flow Chart POS: Split Payment 40:60 & Diskon` — 16 Test Cases):**
  ```bash
  npm run test:no3
  ```
- **Membuka Playwright UI Mode (Visual/Interactive Test Runner):**
  ```bash
  npm run test:ui
  ```
- **Membuka Laporan Hasil Pengujian (HTML Report):**
  ```bash
  npm run test:report
  ```
