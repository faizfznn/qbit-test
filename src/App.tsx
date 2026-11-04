import { useState, useEffect } from 'react';
import { Nomor1ProfilePage } from './pages/Nomor1ProfilePage';
import { Nomor3PosPage } from './pages/Nomor3PosPage';

/**
 * Komponen Utama App
 * Menyediakan navigasi tab di bagian atas untuk memudahkan penguji/evaluator
 * berpindah secara langsung antara:
 * - Nomor 1: Implementasi Form Profil Mobile ("Input your profile")
 * - Nomor 3: Simulasi Transaksi POS (Split Payment 40:60 & Diskon Minimal Rp100.000)
 */
export default function App() {
  // Inisialisasi tab aktif berdasarkan path URL browser (/ atau /pos)
  const [activeTab, setActiveTab] = useState<'nomor1' | 'nomor3'>(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === '/pos' || params.get('page') === 'pos') {
      return 'nomor3';
    }
    return 'nomor1';
  });

  // Sinkronisasi navigasi browser (tombol back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      if (path === '/pos' || params.get('page') === 'pos') {
        setActiveTab('nomor3');
      } else {
        setActiveTab('nomor1');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fungsi ganti tab dan sinkronisasi URL tanpa reload halaman
  const switchTab = (tab: 'nomor1' | 'nomor3') => {
    const nextUrl = tab === 'nomor3' ? '/pos' : '/';
    window.history.pushState({}, '', nextUrl);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Bar navigasi modul QA Test */}
      <nav
        aria-label="Navigasi Modul QA Test"
        className="bg-white border-b border-zinc-200 px-4 py-2.5 flex items-center justify-center gap-2 text-xs"
      >
        <button
          type="button"
          data-testid="nav-tab-nomor1"
          onClick={() => switchTab('nomor1')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'nomor1'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          Nomor 1: Input Profile UI
        </button>
        <button
          type="button"
          data-testid="nav-tab-nomor3"
          onClick={() => switchTab('nomor3')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            activeTab === 'nomor3'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          Nomor 3: Flow Chart POS (Split 40:60 & Diskon)
        </button>
      </nav>

      {/* Render tampilan halaman sesuai tab aktif */}
      {activeTab === 'nomor1' ? <Nomor1ProfilePage /> : <Nomor3PosPage />}
    </div>
  );
}
