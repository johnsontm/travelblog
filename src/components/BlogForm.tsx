'use client';

import { useState, useTransition, FormEvent, ChangeEvent } from 'react';

export function BlogForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [form, setForm] = useState({ title: '', excerpt: '', tag: '' });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!image) {
      setError('Please select a cover image.');
      return;
    }

    const payload = new FormData();
    payload.append('title', form.title);
    payload.append('excerpt', form.excerpt);
    payload.append('tag', form.tag);
    payload.append('image', image);

    startTransition(async () => {
      try {
        await onSubmit(payload);
        setForm({ title: '', excerpt: '', tag: '' });
        setImage(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file ?? null);
  };

  return (
    <form className="blog-admin-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
      </label>
      <label>
        Excerpt
        <textarea value={form.excerpt} onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))} required />
      </label>
      <label>
        Tag
        <input value={form.tag} onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))} required />
      </label>
      <label>
        Cover image
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish blog entry'}
      </button>
    </form>
  );
}
