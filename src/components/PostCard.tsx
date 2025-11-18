'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Post } from '@/types/post';

const moodAccent: Record<Post['mood'], string> = {
  relaxed: '#8EC5FC',
  thrill: '#FF9A8B',
  culture: '#F6D365',
  foodie: '#FFD3A5',
  nature: '#96E6A1'
};

export function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      className="card"
      layout
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
    >
      <div className="card-image">
        <Image src={post.photoUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
        <span className="card-pill" style={{ background: moodAccent[post.mood] }}>
          {post.mood}
        </span>
      </div>
      <div className="card-body">
        <header>
          <p className="card-location">{post.location}</p>
          <h3>{post.title}</h3>
          <p className="card-desc">{post.description}</p>
        </header>
        <dl className="card-meta">
          <div>
            <dt>Traveler</dt>
            <dd>{post.traveler}</dd>
          </div>
          <div>
            <dt>Travel Date</dt>
            <dd>{new Date(post.travelDate).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt>Weather</dt>
            <dd>{post.weather}</dd>
          </div>
        </dl>
        <ul className="card-tags">
          {post.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
