import { useEffect, useMemo, useRef } from 'react';

export default function NoteEditor({ note, onChange }) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Autofocus title when switching to a new empty note
    if (note.title === 'Untitled' && (note.content || '').length === 0) {
      titleRef.current?.focus();
      titleRef.current?.select();
    }
  }, [note.id]);

  const stats = useMemo(() => {
    const text = note.content || '';
    const words = (text.trim().match(/\S+/g) || []).length;
    const chars = text.length;
    return { words, chars };
  }, [note.content]);

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 sm:px-8 pt-6 pb-3">
        <input
          ref={titleRef}
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Title"
          className="w-full bg-transparent text-2xl sm:text-3xl font-semibold outline-none placeholder:text-neutral-400"
        />
      </div>

      <div className="px-5 sm:px-8 pb-4 text-sm text-neutral-500 dark:text-neutral-400">
        <span>{new Date(note.updatedAt).toLocaleString()}</span>
        <span className="mx-2">•</span>
        <span>{stats.words} words</span>
        <span className="mx-2">•</span>
        <span>{stats.chars} chars</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 sm:px-8 pb-8">
        <textarea
          ref={contentRef}
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Start writing..."
          className="w-full h-full min-h-[40vh] bg-transparent outline-none resize-none leading-7 text-[15px]"
        />
      </div>
    </div>
  );
}
