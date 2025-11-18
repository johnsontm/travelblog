import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/postsStore';

export const metadata = {
  title: 'Gallery | Offbeat Odyssey',
  description: 'Scroll every travel photo memory shared inside Offbeat Odyssey.'
};

export default function GalleryPage() {
  const posts = getAllPosts();

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Gallery</p>
        <h1>Every snapshot in one place</h1>
        <p>Browse the full collection of travel memories. New uploads appear instantly thanks to the in-memory store.</p>
        <div className="panel-actions">
          <Link href="/" className="link-button secondary">
            Back to home
          </Link>
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="empty-state">No posts yet. Head back home to add your first memory.</p>
      ) : (
        <div className="gallery-grid">
          {posts.map((post) => (
            <div key={post.id} className="gallery-card">
              <Image src={post.photoUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 320px" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
