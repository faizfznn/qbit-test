import { useState, useEffect } from 'react';
import { Nomor1ProfilePage } from './pages/Nomor1ProfilePage';
import { Nomor3PosPage } from './pages/Nomor3PosPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'nomor1' | 'nomor3'>(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === '/pos' || params.get('page') === 'pos') {
      return 'nomor3';
    }
    return 'nomor1';
  });

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

  const switchTab = (tab: 'nomor1' | 'nomor3') => {
    const nextUrl = tab === 'nomor3' ? '/pos' : '/';
    window.history.pushState({}, '', nextUrl);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
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

      {activeTab === 'nomor1' ? <Nomor1ProfilePage /> : <Nomor3PosPage />}
    </div>
  );
}
