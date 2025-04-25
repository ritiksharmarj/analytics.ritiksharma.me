![hero](github.png)

<h3 align="center">Analytics</h3>

<p align="center">
  Lightweight Google Analytics Alternative
  <br />
  <a href="https://analytics.ritiksharma.me">Learn more</a>
  <br />
  <br />
  <a href="#introduction">Introduction</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#self-hosting">Self-hosting</a> ·
  <a href="#contributing">Contributing</a>
</p>


## Introduction

Understand your website traffic with essential insights. No cookies, no personal data collection, just the stats that matter.


## Features

**Privacy Focused**: No cookies or invasive tracking. Respects user privacy by default.<br/>
**Lightweight Script**: Our tiny script (~1.2kB) won't slow down your website's performance.<br/>
**Essential Metrics**: Focus on key data like page views, visitors, referrers, and more.<br/>
**Simple Interface**: Clean and intuitive dashboard to easily understand your data.<br/>
**Own Your Data**: Self-hostable solution giving you full control over your analytics.<br/>
**Easy Integration**: Add a simple script tag to your website and start tracking.<br/>


## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Analytics](https://analytics.ritiksharma.me/) – self-served analytics
- [Neon](https://neon.tech/) – database
- [BetterAuth](https://www.better-auth.com/) – auth
- [Vercel](https://vercel.com/) – deployments


## Self-Hosting

You can self-host for full control over your analytics.

Step 1: Fork and clone the repo
```
git clone https://github.com/<username>/analytics.ritiksharma.me.git
```

Step 2: Copy .env.example to .env
```
cp .env.example .env
```

Step 3: Create a database project in [Neon](https://neon.tech/) and paste the connection string in the .env file for `DATABASE_URL`

Generate a [secret key](https://www.better-auth.com/docs/installation#set-environment-variables) and add it to .env for `BETTER_AUTH_SECRET`

Get your Google credentials (more info [here](https://www.better-auth.com/docs/authentication/google#get-your-google-credentials)) and add the client ID and client secret to .env for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

Step 4: Install dependencies and run the command to push the database tables to Neon DB
```
pnpm i
pnpm db:push
```

Step 5: Deploy to Vercel and add all environment variables to your Vercel project settings. Change `NODE_ENV` to "production" and update `BETTER_AUTH_URL` with your domain URL.


## Contributing

Set up local dev environment:

Follow Steps 1-4 from the [self hosting](#self-hosting) section, then:

Step 4: Optionally create a dev branch in the Neon DB and add its connection string to .env for `DATABASE_URL`

Step 5: Sign in first to create an initial user and seed the data
```
pnpm db:seed
```

Step 6: Run in dev mode
```
pnpm dev
```

Thanks! Happy Coding.