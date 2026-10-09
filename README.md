# A Little Date Invitation

A small, mobile-first romantic invitation built with React and Vite. The experience runs entirely in the browser: no backend, tracking, analytics, or external API is used.

## Run locally

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Vite prints the local address in the terminal (usually `http://localhost:5173`).

## Build and preview

Create the production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

The generated site is placed in `dist/`.

## Deploy to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Leave the framework preset as **Vite**. Vercel will use `npm run build` and `dist` as the output directory.
4. Select **Deploy**. No environment variables or additional configuration are needed.

You can also deploy with the Vercel CLI by running `vercel` in the project directory and following its prompts.

## Personalize the invitation

- **Photo:** Replace `src/assets/couple-photo.jpg` with your photo. Keep the same filename and format, or update the import at the top of `src/App.jsx` to match the new filename. The image is bundled locally with the site.
- **Name and invitation text:** Edit the visible copy in `src/App.jsx`. The name currently appears in the intro and date question.
- **Colors, spacing, and typography:** Edit `src/index.css`.

## Project structure

```text
src/
  assets/
    couple-photo.jpg
  App.jsx
  index.css
  main.jsx
index.html
package.json
```

The date form prevents past dates, requires a time and activity before confirmation, and keeps the selected information in React state in the browser.
