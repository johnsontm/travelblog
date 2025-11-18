import Image from 'next/image';
import type { BlogEntry } from '@/types/blog';

export function BlogGrid({ entries }: { entries: BlogEntry[] }) {
  return (
    <div className="blog-grid">
      {entries.map((entry) => (
        <article key={entry.id} className="blog-card">
          <div className="blog-image">
            <Image src={entry.imageUrl} alt={entry.title} fill sizes="(max-width: 768px) 100vw, 320px" />
          </div>
          <div className="blog-content">
            <span className="blog-tag">{entry.tag}</span>
            <h3>{entry.title}</h3>
            <p>{entry.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
