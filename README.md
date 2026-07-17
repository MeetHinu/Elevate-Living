# Elevate Living

Source for the Elevate Living Design website (Melbourne interior design studio — kitchens, bathrooms, laundries, living spaces).

## Development

    npm install
    npm run dev

## Testing

    npm test

## Production build

    npm run build
    npm run preview   # serve the build locally to sanity-check it

## Deploying

This repo is meant to be connected to Netlify via Git (see `netlify.toml` for build settings), replacing the old manual drag-and-drop deploy:

1. Push this repo to GitHub (or another Git host).
2. In the Netlify dashboard for the existing site: **Site settings → Build & deploy → Link repository**, and point it at this repo.
3. Push to the connected branch — Netlify builds and deploys automatically from then on.

### Turning on consultation-form email notifications

The contact form posts to Netlify Forms (form name `consultation-request`). To receive submissions by email:

1. Netlify dashboard → your site → **Forms**.
2. Confirm submissions are appearing under the `consultation-request` form (test by submitting the live contact page once it's deployed).
3. **Forms → Form notifications → Add notification → Email notification**, set the address to `info@elevateliving.com.au`.

### Re-running the image sharpening pass

Original (pre-sharpening) photos are kept in `images-original/` (a top-level directory, outside `public/`, so it isn't shipped to the deployed site). To re-run or tune the sharpening:

    npm run sharpen-images
