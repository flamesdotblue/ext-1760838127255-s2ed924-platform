import { useEffect, useMemo, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroCover from './components/HeroCover';
import NotesSidebar from './components/NotesSidebar';
import NoteToolbar from './components/NoteToolbar';
import NoteEditor from './components/NoteEditor';

const NOTES_KEY = 'notepad.notes.v1';
const THEME_KEY = 'notepad.theme';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) return JSON.parse(saved);
    const id = generateId();
    return [
      {
        id,
        title: 'Welcome to Notepad',
        content:
          'This is your minimalist notepad.\n\n– Use the sidebar to create and switch notes.\n– Your notes are saved automatically in your browser.\n– Search notes by title or content.\n– Toggle theme with the sun/moon icon.\n\nHave fun writing!',
        updatedAt: Date.now(),
      },
    ];
  });
  const [selectedId, setSelectedId] = useState(() => notes[0]?.id || null);
  const [query, setQuery] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const filteredNotes = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(n => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q));
  }, [notes, query]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const createNote = useCallback(() => {
    const id = generateId();
    const newNote = { id, title: 'Untitled', content: '', updatedAt: Date.now() };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(id);
    setShowHero(false);
  }, []);

  const deleteNote = useCallback(id => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (id === selectedId) {
      setSelectedId(prev => {
        const remaining = notes.filter(n => n.id !== id);
        return remaining[0]?.id || null;
      });
    }
  }, [notes, selectedId]);

  const updateNote = useCallback((id, patch) => {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)));
  }, []);

  const duplicateNote = useCallback(id => {
    const original = notes.find(n => n.id === id);
    if (!original) return;
    const newId = generateId();
    const copy = {
      ...original,
      id: newId,
      title: original.title + ' (Copy)',
      updatedAt: Date.now(),
    };
    setNotes(prev => [copy, ...prev]);
    setSelectedId(newId);
  }, [notes]);

  const onSelectNote = useCallback(id => {
    setSelectedId(id);
    setShowHero(false);
  }, []);

  const onStartWriting = useCallback(() => {
    setShowHero(false);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
      <AnimatePresence initial={true}>
        {showHero && (
          <HeroCover onStart={onStartWriting} onCreateNote={createNote} />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl border border-neutral-200/60 bg-white/70 backdrop-blur dark:bg-neutral-900/60 dark:border-neutral-800 shadow-xl overflow-hidden">
          <NoteToolbar
            theme={theme}
            onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            onCreate={createNote}
            query={query}
            setQuery={setQuery}
            onDuplicate={() => selectedId && duplicateNote(selectedId)}
            onDelete={() => selectedId && deleteNote(selectedId)}
            hasSelection={!!selectedNote}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 h-[70vh]">
            <aside className="md:col-span-4 lg:col-span-3 border-t md:border-r border-neutral-200/70 dark:border-neutral-800 overflow-hidden">
              <NotesSidebar
                notes={filteredNotes}
                selectedId={selectedId}
                onSelect={onSelectNote}
              />
            </aside>

            <main className="md:col-span-8 lg:col-span-9 border-t border-neutral-200/70 dark:border-neutral-800 overflow-hidden">
              {selectedNote ? (
                <NoteEditor
                  note={selectedNote}
                  onChange={(patch) => updateNote(selectedNote.id, patch)}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-center">
                  <div className="max-w-md">
                    <h3 className="text-xl font-semibold">No note selected</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Create a new note to get started or pick one from the sidebar.</p>
                    <button onClick={createNote} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 hover:opacity-90 transition">
                      <span>New Note</span>
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
