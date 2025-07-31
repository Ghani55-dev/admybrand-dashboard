import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded-md border dark:border-gray-500 text-sm dark:text-white text-black bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
