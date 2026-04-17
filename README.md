
# PopcornBuddy

PopcornBuddy is a Next.js movie discovery app built for a personal portfolio refresh. It uses the TMDB API for public movie data and MongoDB for authenticated user features such as favorites, watchlists, ratings, and reviews.

## Features

- Browse trending, top-rated, popular, and upcoming movies
- View movie details including release date, runtime, genres, countries, and overview
- Search movies from the navigation bar
- Create an account and sign in with secure cookie-based sessions
- Save favorites and a watchlist
- Add personal ratings and reviews
- Submit messages through the contact form

## Stack

- Next.js 14
- React 18
- MongoDB with Mongoose
- Tailwind CSS and CSS modules
- TMDB API
- SendGrid for contact form email delivery

## Live Site

- Production: https://popcornbuddy.vercel.app/

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A MongoDB database
- A TMDB API key
- A SendGrid API key for the contact form

### Installation

```bash
git clone https://github.com/mikeylim/PopcornBuddy.git
cd PopcornBuddy
npm install
```

### Environment Variables

Create `.env.local` in the project root and add:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Run the App

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Project Notes

- Next.js loads environment variables natively; no custom server is required.
- Auth uses `httpOnly` cookies with refresh-token based session recovery.
- User-specific API routes resolve the active user from the verified auth cookie instead of trusting a client-provided user id.

## Roadmap

- Normalize naming and API conventions across the codebase
- Centralize TMDB client logic to reduce duplicated requests
- Improve validation, loading states, and accessibility
- Continue polishing the UI and documentation for portfolio presentation

## Credits

- Mike Dohyun Lim
- Claudia Suarez
- Gaganjot Singh

Movie metadata is provided by [TMDB](https://www.themoviedb.org/documentation/api).
