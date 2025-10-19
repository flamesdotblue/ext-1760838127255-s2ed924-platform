import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NoteItem({ note, selected, onClick }) {
  const updated = useMemo(() => new Date(note.updatedAt).toLocaleString(), [note.updatedAt]);
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 transition border-b border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 ${selected ? 'bg-neutral-50/80 dark:bg-neutral-800/60' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-medium">{note.title || 'Untitled'}</div>
          <div className="truncate text-sm text-neutral-500 dark:text-neutral-400">{note.content || 'Empty note'}</div>
        </div>
        <div className="shrink-0 text-xs text-neutral-400">{updated}</div>
      </div>
    </button>
  );
}

export default function NotesSidebar({ notes, selectedId, onSelect }) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-neutral-200/70 dark:border-neutral-800">
        <h3 className="text-sm font-semibold tracking-wide text-neutral-600 dark:text-neutral-300 uppercase">Notes</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {notes.length === 0 ? (
            <div className="p-6 text-neutral-500 dark:text-neutral-400 text-sm">No notes match your search.</div>
          ) : (
            notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <NoteItem
                  note={note}
                  selected={note.id === selectedId}
                  onClick={() => onSelect(note.id)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
