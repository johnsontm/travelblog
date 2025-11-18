'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PostForm } from '@/components/PostForm';
import { BlogForm } from '@/components/BlogForm';

export default function AdminPage() {
  const [postMessage, setPostMessage] = useState<string | null>(null);
  const [blogMessage, setBlogMessage] = useState<string | null>(null);

  const handlePostSubmit = async (formData: FormData) => {
    setPostMessage(null);
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error ?? 'Unable to save moment');
    }

    setPostMessage('Travel moment saved. It now appears in the gallery and destination views.');
  };

  const handleBlogSubmit = async (formData: FormData) => {
    setBlogMessage(null);
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error ?? 'Unable to publish blog');
    }

    setBlogMessage('Blog post published. View it on the blog page.');
  };

  return (
    <main className="page admin-page">
      <section className="page-hero">
        <p className="eyebrow">Admin</p>
        <h1>Offbeat Odyssey Studio</h1>
        <p>Manage gallery moments and stories from one dashboard.</p>
        <div className="panel-actions">
          <Link href="/" className="link-button secondary">
            Back to site
          </Link>
        </div>
      </section>

      <section className="landing-panel">
        <header>
          <p className="eyebrow">Travel moments</p>
          <h2>Add a new destination photo</h2>
          <p>Uploads save to the gallery, automatically creating destination albums based on the location you enter.</p>
        </header>
        <PostForm onSubmit={handlePostSubmit} />
        {postMessage && <p className="success-message">{postMessage}</p>}
      </section>

      <section className="landing-panel">
        <header>
          <p className="eyebrow">Blog</p>
          <h2>Publish a story</h2>
          <p>Share field notes, itineraries, or creative prompts. Images appear at the top of the blog card.</p>
        </header>
        <BlogForm onSubmit={handleBlogSubmit} />
        {blogMessage && <p className="success-message">{blogMessage}</p>}
      </section>
    </main>
  );
}
