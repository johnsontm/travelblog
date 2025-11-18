import Link from 'next/link';
import Image from 'next/image';
import { getDestinationSummaries } from '@/lib/destinations';

export const metadata = {
  title: 'Destinations | Offbeat Odyssey',
  description: 'Explore every place visited inside Offbeat Odyssey and jump into their dedicated photo albums.'
};

export default function DestinationsPage() {
  const destinations = getDestinationSummaries();

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Destinations</p>
        <h1>Visited places</h1>
        <p>From forgotten trails to undiscovered towns, explore every offbeat adventure we’ve uncovered.</p>
        <div className="panel-actions">
          <Link href="/" className="link-button secondary">
            Back to home
          </Link>
        </div>
      </section>

      {destinations.length === 0 ? (
        <p className="empty-state">No destinations yet. Head home to log your first stop.</p>
      ) : (
        <div className="destination-grid">
          {destinations.map((destination) => (
            <Link key={destination.slug} href={`/destinations/${destination.slug}`} className="destination-card">
              <div className="destination-image">
                <Image src={destination.coverUrl} alt={destination.location} fill sizes="(max-width: 768px) 100vw, 320px" />
              </div>
              <div className="destination-body">
                <span>{destination.entryCount} photos</span>
                <h3>{destination.location}</h3>
                <p>{destination.travelers.join(' • ')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
