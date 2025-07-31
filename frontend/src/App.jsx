import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('manual-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('manual-dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <main className={`min-h-screen transition-colors duration-300`}>
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">📊 ADmyBRAND Insights</h1>

          <button
            onClick={() => setDark(prev => !prev)}
            className="ml-2 px-4 py-2 rounded-md text-sm font-medium shadow 
              bg-gray-800 text-white hover:scale-105 transition-transform"
          >
            {dark ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <Dashboard />
      </div>
    </main>
  );
}

export default App;
