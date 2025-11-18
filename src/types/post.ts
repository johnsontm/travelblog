export type Post = {
  id: string;
  traveler: string;
  title: string;
  location: string;
  description: string;
  photoUrl: string;
  travelDate: string;
  createdAt: string;
  tags: string[];
  mood: 'relaxed' | 'thrill' | 'culture' | 'foodie' | 'nature';
  weather: string;
};

export type PostFormFields = Pick<
  Post,
  'traveler' | 'title' | 'location' | 'description' | 'travelDate' | 'tags' | 'mood' | 'weather'
>;

export type StorePostPayload = Omit<Post, 'id' | 'createdAt'>;
