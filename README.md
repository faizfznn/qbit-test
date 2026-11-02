# Qbit QA/Tester Technical Test — Muhammad Faiz Fauzan

Repository ini berisi implementasi UI (**React + TypeScript + Tailwind CSS**) dan **Automation Testing (`@playwright/test`)** untuk penugasan **QA Test Qbit**.

## Struktur Proyek

```text
├── src/
│   ├── components/ui/             # Reusable UI Components (InputField, RadioGroup, Button)
│   ├── pages/
│   │   └── Nomor1ProfilePage.tsx  # Implementasi UI Soal Nomor 1 ("Input your profile")
│   ├── utils/
│   │   └── profileValidation.ts   # Validasi form profil Soal Nomor 1
│   └── App.tsx                    # Entry halaman aplikasi
├── tests/
│   ├── nomor-1-profile/
│   │   └── profile.spec.ts        # Automation Test Soal Nomor 1 (15 Test Cases)
│   ├── nomor-2-borobudur/         # Automation Test Soal Nomor 2 (Borobudur Marathon)
│   └── nomor-3-flowchart/         # Automation Test Soal Nomor 3 (Flow Chart Kasir/POS)
├── DOKUMEN_JAWABAN_NOMOR_1.md     # Dokumentasi Test Case & Hasil Eksekusi Nomor 1
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
Akses aplikasi di browser pada alamat: `http://127.0.0.1:3000`

### 3. Menjalankan Automation Testing (Playwright)
- **Menjalankan seluruh test:**
  ```bash
  npm test
  ```
- **Menjalankan test Nomor 1 saja (`Input your profile`):**
  ```bash
  npm run test:no1
  ```
- **Membuka Playwright UI Mode (Visual/Interactive Test Runner):**
  ```bash
  npm run test:ui
  ```
- **Membuka Laporan Hasil Pengujian (HTML Report):**
  ```bash
  npm run test:report
  ```
