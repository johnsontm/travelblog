'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PostForm } from '@/components/PostForm';
import { PhotoUploadForm } from '@/components/PhotoUploadForm';
import { BlogForm } from '@/components/BlogForm';

export default function AdminPage() {
  const [momentMessage, setMomentMessage] = useState<string | null>(null);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);
  const [blogMessage, setBlogMessage] = useState<string | null>(null);

  const handleMomentSubmit = async (formData: FormData) => {
    setMomentMessage(null);
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error ?? 'Unable to save moment');
    }

    setMomentMessage('Travel moment saved. It now appears in the gallery and destination views.');
  };

  const handlePhotoSubmit = async (formData: FormData) => {
    setPhotoMessage(null);
    const response = await fetch('/api/photos', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error ?? 'Unable to upload photo');
    }

    const uploadType = formData.get('uploadType');
    const message = uploadType === 'destination'
      ? 'Photo uploaded to destination successfully.'
      : 'Photo uploaded to gallery successfully.';
    setPhotoMessage(message);
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
        <p>Manage gallery moments, photos, and stories from one dashboard.</p>
        <div className="panel-actions">
          <Link href="/" className="link-button secondary">
            Back to site
          </Link>
        </div>
      </section>

      <section className="landing-panel">
        <header>
          <p className="eyebrow">Travel moments</p>
          <h2>Add a travel moment</h2>
          <p>Create a complete travel memory with full details: traveler name, location, description, mood, and photo. This creates a destination album if the location is new.</p>
        </header>
        <PostForm onSubmit={handleMomentSubmit} />
        {momentMessage && <p className="success-message">{momentMessage}</p>}
      </section>

      <section className="landing-panel">
        <header>
          <p className="eyebrow">Photo upload</p>
          <h2>Upload a photo</h2>
          <p>Quickly add a photo to the gallery or to an existing destination. Choose where to upload and select a destination if needed.</p>
        </header>
        <PhotoUploadForm onSubmit={handlePhotoSubmit} />
        {photoMessage && <p className="success-message">{photoMessage}</p>}
      </section>

      <section className="landing-panel">
        <header>
          <p className="eyebrow">Blog</p>
          <h2>Publish a blog story</h2>
          <p>Share field notes, itineraries, or creative prompts. Images appear at the top of the blog card.</p>
        </header>
        <BlogForm onSubmit={handleBlogSubmit} />
        {blogMessage && <p className="success-message">{blogMessage}</p>}
      </section>
    </main>
  );
}
