import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinationSummaries, getPostsForDestination } from '@/lib/destinations';

export function generateStaticParams() {
  return getDestinationSummaries().map((destination) => ({ slug: destination.slug }));
}

export const dynamic = 'force-dynamic';

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const posts = getPostsForDestination(destination.slug);

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Destination</p>
        <h1>{destination.location}</h1>
        <p>{destination.entryCount} photos logged by {destination.travelers.join(', ')}.</p>
        <div className="panel-actions">
          <Link href="/destinations" className="link-button secondary">
            Back to destinations
          </Link>
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="empty-state">No photos yet. Add one from the home page form.</p>
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
