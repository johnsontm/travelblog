import { randomUUID } from 'crypto';
import type { Post, StorePostPayload } from '@/types/post';

const seedPosts: Post[] = [
  {
    id: randomUUID(),
    traveler: 'Aaliya Rahman',
    title: 'Kozhikode Beach Glow',
    location: 'Kozhikode',
    description: 'Low tide at Kozhikode beach turned the shoreline into a mirror. Fishermen were wrapping up for the day while the sky went full sherbet.',
    photoUrl: '/albums/kozhikode/beypore-sunset.jpg',
    travelDate: '2025-02-11',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 24).toISOString(),
    tags: ['sunset', 'beach', 'india'],
    mood: 'relaxed',
    weather: 'Humid 28°C, salty breeze'
  },
  {
    id: randomUUID(),
    traveler: 'Dev Patel',
    title: 'Kallayi River Lookout',
    location: 'Kozhikode',
    description: 'Climbed the laterite cliffs near Kallayi for a dawn vantage point. The coconut groves below were waking up with temple bells.',
    photoUrl: '/albums/kozhikode/cliff-lookout.jpg',
    travelDate: '2025-01-28',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    tags: ['river', 'cliffs', 'kerala'],
    mood: 'nature',
    weather: 'Golden 23°C, light mist'
  }
];

const posts: Post[] = [...seedPosts];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function addPost(payload: StorePostPayload): Post {
  const newPost: Post = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload
  };

  posts.unshift(newPost);
  return newPost;
}
