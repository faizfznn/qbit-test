# Jawaban QA Test Qbit — Nomor 2: Live Testing (`https://borobudurmarathon.com/`)

---

## 2a. Pemetaan Lengkap Seluruh *Slug / Slash* pada Website `https://borobudurmarathon.com/`

Berdasarkan hasil eksplorasi dan *crawling* menyeluruh pada struktur navigasi, *dropdown menu*, halaman konten, dan *footer* situs `https://borobudurmarathon.com/`, berikut adalah daftar lengkap seluruh **35+ *slug/slash*** (Bahasa Inggris & Bahasa Indonesia) beserta *endpoint* terkait:

| Kategori / Menu | Slug Bahasa Inggris (Default EN) | Slug Bahasa Indonesia (ID) | Nama Halaman / Fungsi Utama | Status HTTP |
| :--- | :--- | :--- | :--- | :---: |
| **Beranda (Home)** | `/` | `/id/` | Halaman Utama (*Bank Jateng Borobudur Marathon 2026: "Stride To Glory"*) | `200 OK` |
| **The Race** | `/bank-jateng-borobudur-marathon-2026/` | `/id/bank-jateng-borobudur-marathon/` | **Race Category** — Informasi kategori lomba (Marathon, Half Marathon, 10K) | `200 OK` |
| **The Race** | `/rules-regulations/` | `/id/peraturan-ketentuan/` | **Rules & Regulations** — Halaman induk peraturan & ketentuan lomba | `200 OK` |
| ↳ *Sub-slug Rules* | `/rules-regulations-borobudur-marathon/` | *(Tautan ke dokumen aturan)* | Peraturan & Ketentuan Umum Borobudur Marathon 2026 | `200 OK` |
| ↳ *Sub-slug Rules* | `/terms-and-conditions-bank-jateng-friendship-run-2026/` | - | Syarat & Ketentuan Bank Jateng Friendship Run 2026 | `200 OK` |
| ↳ *Sub-slug Rules* | `/terms-conditions-saveduit-bank-jateng/` | - | Syarat & Ketentuan Program Saveduit Bank Jateng | `200 OK` |
| ↳ *Sub-slug Rules* | `/terms-conditions-bib-transfer/` | - | Syarat & Ketentuan *Bib Transfer* | `200 OK` |
| ↳ *Sub-slug Rules* | `/terms-of-service-myborobudur/` | - | Ketentuan Layanan Portal *My Borobudur Marathon* | `200 OK` |
| **The Race** | `/prizes-2026/` | `/id/hadiah-2026/` | **Prizes** — Informasi total hadiah pemenang tiap kategori | `200 OK` |
| **The Race** | `/faq/` | `/id/tanya-jawab/` | **FAQ** — Halaman induk Tanya Jawab (*Frequently Asked Questions*) | `200 OK` |
| ↳ *Sub-slug FAQ* | `/faq-borobudur-marathon/` | - | Detail FAQ Borobudur Marathon 2026 (Panel *Accordion*) | `200 OK` |
| ↳ *Sub-slug FAQ* | `/faq-shuttle-bus/` | - | Detail FAQ *Shuttle Bus* Peserta | `200 OK` |
| ↳ *Sub-slug FAQ* | `/faq-bank-jateng-friendship-run-2026/` | - | Detail FAQ *Bank Jateng Friendship Run 2026* | `200 OK` |
| ↳ *Sub-slug FAQ* | `/faq-saveduit-bank-jateng/` | - | Detail FAQ Program *Saveduit Bank Jateng* | `200 OK` |
| ↳ *Sub-slug FAQ* | `/frequently-asked-questions-apps/` | - | Detail FAQ Aplikasi Mobile | `200 OK` |
| **The Race** | `/race-results/` | `/id/hasil-lomba/` | **Race Results** — Direktori hasil lomba tahun 2017 s/d 2025 | `200 OK` |
| **Program** | `/friendship-run-program/` | `/id/program-friendship-run/` | **Bank Jateng Friendship Run** — Informasi kegiatan lari di berbagai kota | `200 OK` |
| **Program** | `/youngtalent/` *(Menu EN salah mengarah ke `/id/young-talent-2026/`)* | `/id/young-talent-2026/` | **Bank Jateng Young Talent** — Program pembinaan atlet muda | `200 OK` |
| ↳ *Sub-slug Program* | - | `/id/syarat-ketentuan-young-talent/` | Syarat & Ketentuan *Bank Jateng Young Talent* | `200 OK` |
| ↳ *Sub-slug Program* | - | `/id/detail-program-bank-jateng-young-talent/` | Detail Program *Bank Jateng Young Talent* | `200 OK` |
| ↳ *Sub-slug Program* | - | `/id/seleksi-tahap-1-bank-jateng-young-talent/` | Pengumuman Seleksi Tahap 1 *Young Talent* | `200 OK` |
| ↳ *Sub-slug Program* | - | `/id/program-seleksi-bank-jateng-young-talent/` | Halaman Form Program Seleksi *Young Talent* | `200 OK` |
| **Media** | `/gallery/` | `/id/galeri/` | **Gallery** — Halaman induk dokumentasi foto lintas tahun | `200 OK` |
| ↳ *Sub-slug Gallery* | `/gallery-2026/`, `/gallery-2024/`, `/gallery-2023/`, `/gallery-2022/` | - | Galeri Foto per Tahun Penyelenggaraan (2022–2026) | `200 OK` |
| **Media** | `/race-guide/` | `/id/panduan-lomba/` | **Race Guide** — Unduhan dokumen PDF *E-Race Guide* | `200 OK` |
| **Contact** | `/sponsors/` | `/id/dukungan/` | **Sponsors** — Daftar sponsor & kontak kemitraan (`partnership@borobudurmarathon.com`) | `200 OK` |
| **Contact** | `/contact/` | `/id/kontak/` | **Contact Us** — Informasi kontak resmi & media sosial | `200 OK` |
| ↳ *Redirect Slug* | `/ig` | `/ig` | Shortlink redirect menuju Instagram resmi `@borobudur.marathon` | `301 -> 200` |
| **Apps** | `/apps/` | `/id/aplikasi/` | **Apps** — Tautan unduhan aplikasi mobile (Google Play & App Store) | `200 OK` |
| **Merchandise** | `/official-merchandise/` | `/id/partner-resmi-merchandise/` | **Merchandise** — Informasi *Official Merchandise* | `200 OK` |
| **Portal Peserta** | `https://my.borobudurmarathon.com/signin` | - | **My Borobudur Registrant Portal** — Halaman login/registrasi peserta lomba | `200 OK` |

---

## 2b. Detail Test Case — Fitur Utama Website `https://borobudurmarathon.com/`

Lihat tabel lengkap pada artefak atau Google Docs (`TC-BM-001` s/d `TC-BM-014`).

## 2c. Automation Testing (`tests/nomor-2-borobudur/borobudur.spec.ts`)

Lihat kode lengkap di [`tests/nomor-2-borobudur/borobudur.spec.ts`](./tests/nomor-2-borobudur/borobudur.spec.ts).

## 2d. Laporan Bug (*Bug Report*)

Mencakup 4 laporan bug terstruktur (`BUG-BM-001` s/d `BUG-BM-004`).
