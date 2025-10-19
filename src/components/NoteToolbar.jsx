import { Search, Plus, Trash2, Save, Sun, Moon, Copy } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function NoteToolbar({ onCreate, onDelete, onDuplicate, query, setQuery, hasSelection, theme, onToggleTheme }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-neutral-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-3 py-2 hover:opacity-90 transition"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New</span>
        </button>

        <button
          onClick={onDuplicate}
          disabled={!hasSelection}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Copy size={18} />
          <span className="hidden sm:inline">Duplicate</span>
        </button>

        <button
          onClick={onDelete}
          disabled={!hasSelection}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 text-red-700 dark:text-red-400 dark:border-red-900/60 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      <div className="ml-auto flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes (Ctrl/Cmd + K)"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-100/70 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 text-sm"
          />
        </div>
      </div>

      <div className="ml-2">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 dark:border-neutral-700 w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
