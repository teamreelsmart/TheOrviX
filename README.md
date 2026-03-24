# CineNest

CineNest is a full-stack movie and series listing platform built with Next.js App Router, MongoDB Atlas, and Tailwind CSS.

## Features

- Dark-themed movie listing frontend
- Movie details with external stream/download redirects
- Search + filter (title, genre, year, language, type)
- User movie request form with ImgBB screenshot upload
- Protected admin panel with JWT cookie auth
- Admin movie CRUD + request management
- Branding included: Telegram Channel `@TheOrviX`, Developer `@TheOrviZ`

## Tech Stack

- Next.js (App Router)
- MongoDB Atlas + Mongoose
- Tailwind CSS
- JWT authentication
- Next.js Route Handlers API

## Environment Variables

Copy `.env.example` to `.env.local` and fill:

```bash
MONGODB_URI=
JWT_SECRET=
IMGBB_API_KEY=
```

## Run Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Recommended Initial Admin Seed

Use a script or MongoDB shell to create an admin user with hashed password (`bcryptjs`).

Example snippet:

```js
import bcrypt from "bcryptjs";
import Admin from "./models/Admin";

const hash = await bcrypt.hash("your-password", 10);
await Admin.create({ username: "admin", password: hash });
```

## Deployment on Vercel

1. Push this repo to GitHub.
2. Import project in Vercel.
3. In Vercel project settings, add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `IMGBB_API_KEY`
4. Set Framework Preset to **Next.js** (auto-detected).
5. Deploy.

### Important Deployment Notes

- Use MongoDB Atlas network access rules to allow Vercel connections.
- Use a strong random `JWT_SECRET`.
- `admin_token` cookie is set `secure` in production.
- Optional: set `NEXT_PUBLIC_BASE_URL` to your deployed domain for server-side fetches.

## Project Structure

```text
app/
  page.tsx
  movie/[slug]/page.tsx
  search/page.tsx
  admin/login/page.tsx
  admin/dashboard/page.tsx
  admin/add-movie/page.tsx
  admin/edit/[id]/page.tsx
  admin/requests/page.tsx
  download/[id]/page.tsx
  api/movies/route.ts
  api/movie/[id]/route.ts
  api/admin/add/route.ts
  api/admin/update/route.ts
  api/admin/delete/route.ts
  api/admin/requests/[id]/route.ts
  api/auth/login/route.ts
  api/request/add/route.ts
  api/request/all/route.ts
  api/upload/route.ts
components/
  Navbar.tsx
  MovieCard.tsx
  AdminForm.tsx
  RequestForm.tsx
lib/
  db.ts
models/
  Movie.js
  Admin.js
  Request.js
```
