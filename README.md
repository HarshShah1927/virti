# A Little Date Invitation

A romantic, mobile-first invitation built with React and Vite. The application uses a Vercel serverless function to send Virti's selected date, time, and activity to Harsh's email address after she taps the email button.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local development URL (usually `http://localhost:5173`). The Vercel API function runs on Vercel; to test the function locally, use the Vercel CLI with `vercel dev` after configuring the environment variables below.

## Build

```sh
npm run build
npm run preview
```

The production frontend is generated in `dist/`.

## Email setup

Email is sent by the Vercel function in `api/response.js` through the [Resend email API](https://resend.com/docs/send-with-nodejs). The API key is read only on the server and is never included in the frontend bundle.

1. Create a Resend account and an API key with email sending access.
2. Verify a sender domain in Resend and set up the DNS records Resend provides. The sender address must use that verified domain.
3. In Vercel, open the project **Settings → Environment Variables** and add:
   - `RESEND_API_KEY` — your Resend API key.
   - `EMAIL_FROM` — a sender using your verified domain, for example `Date Invitation <hello@yourdomain.com>`.
4. Apply the variables to Production (and Preview if desired), then redeploy.

Do not add the Resend API key to a `VITE_` variable or commit it to source control. The function sends only to `harshmumbai1927@gmail.com`. It validates the date, time, and activity, and includes a simple bot honeypot. Delivery requires the environment variables and a verified sender domain to be configured.

## Deploy to Vercel

Import the repository into Vercel as a Vite project, keep the default `npm run build` build command and `dist` output directory, add the email environment variables above, and deploy. Vercel automatically deploys JavaScript functions placed in the root `api/` directory. See the [Vercel Node.js Functions documentation](https://vercel.com/docs/functions/runtimes/node-js).

## Personalize

- Replace `src/assets/couple-photo.jpg` to change the photo; keep the filename or update its import in `src/App.jsx`.
- Change the name and invitation copy in `src/App.jsx`.
- Adjust styling in `src/index.css`.

The selected date details are sent to the configured email provider only after the recipient taps the button. The site does not store submissions in a database.
