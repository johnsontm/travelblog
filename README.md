# Travel Field Notes

A lightweight travel photo posting web app built with Next.js 14 (App Router). Share a snapshot from your latest trip, describe the mood, and browse other travelers' highlights.

## Features

- 📸 Hero feed of travel photo cards with mood-color accents
- 🗺️ Auto-built album section grouped by destination with visual covers
- 🧭 Landing page navigation with Blog, Destinations, Categories, Gallery, About, Contact anchors
- 📝 Client-side form to submit new photo memories with image uploads
- ⚡ SWR-powered data fetching for instant refreshes
- 🗂️ In-memory API route (`/api/posts`) with seeded sample data
- 🎨 Custom styling with CSS gradients and responsive grid layout
- 🧭 Dedicated `/blog`, `/gallery`, and `/destinations` pages (plus per-location subpages)
- 🛠️ `/admin` control panel for uploading new gallery moments and publishing blogs

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 to start sharing travel highlights.

Image uploads are stored under `public/albums/{place-slug}`. Each location you enter automatically creates its own folder so you can keep every destination neatly organized inside the project.

> The API keeps everything in memory, so data resets when the dev server restarts.

## Project structure

- `src/app/page.tsx` – hero, submission form, and previews linking out to other sections
- `src/app/blog/page.tsx` – standalone blog archive
- `src/app/gallery/page.tsx` – photo-only gallery grid
- `src/app/destinations` – destinations index and dynamic `[slug]` routes
- `src/app/admin/page.tsx` – dashboard for adding posts and blog entries
- `src/components` – UI building blocks (`PostForm`, `PostCard`, `BlogGrid`, `AlbumGrid`)
- `src/app/api/posts/route.ts` – GET/POST handlers
- `src/lib/postsStore.ts` – seeded data + simple store
- `src/lib/destinations.ts` – helpers for grouping posts by location
- `src/types/post.ts` – shared TypeScript contracts
- `src/types/blog.ts` – blog metadata contracts

## Next steps

- Wire uploads to cloud storage (Supabase, UploadThing, etc.)
- Add authentication and traveler profiles
- Persist data via a database (PlanetScale, Neon, Turso)
- Enhance accessibility tests and add integration coverage
