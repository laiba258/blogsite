# Vercel Deployment Guide with Turso Database

## Prerequisites

1. Turso CLI installed: `brew install tursodatabase/tap/turso` (Mac) or `curl -sSfL https://get.tur.so/install.sh | bash` (Linux/WSL)
2. Vercel account
3. GitHub repository connected to Vercel

## Step 1: Create Turso Database

```bash
# Login to Turso
turso auth login

# Create a new database
turso db create blogsite

# Get database URL
turso db show blogsite --url

# Create auth token
turso db tokens create blogsite
```

Save the URL and token - you'll need them for Vercel.

## Step 2: Push Database Schema to Turso

Update your local `.env` file with Turso credentials:

```env
DATABASE_URL=libsql://blogsite-your-username.turso.io
DATABASE_AUTH_TOKEN=your-token-here
NUXT_SESSION_PASSWORD=your-session-password
```

Then push the schema:

```bash
npm run db:push
```

This will create all tables in your Turso database.

## Step 3: Seed the Database (Optional)

You can seed your Turso database by visiting:

```
https://your-vercel-url.vercel.app/api/seed
```

Or run locally with Turso credentials:

```bash
# Make sure .env has Turso credentials
curl http://localhost:3000/api/seed
```

## Step 4: Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add the following:

```
DATABASE_URL=libsql://blogsite-your-username.turso.io
DATABASE_AUTH_TOKEN=your-turso-token
NUXT_SESSION_PASSWORD=your-session-password
```

## Step 5: Deploy

```bash
# Commit and push your changes
git add .
git commit -m "Configure Turso database for production"
git push origin main
```

Vercel will automatically deploy your changes.

## Step 6: Verify Deployment

1. Visit your Vercel URL
2. Check if the homepage loads
3. Visit `/api/seed` to seed the database (only once)
4. Refresh homepage to see blog posts

## Troubleshooting

### Database tables not showing in Turso

Run this command to verify tables were created:

```bash
turso db shell blogsite
```

Then in the shell:

```sql
.tables
SELECT * FROM posts;
```

### Server crashes on Vercel

Check Vercel logs:
1. Go to your project on Vercel
2. Click on the failed deployment
3. Check "Functions" tab for error logs

Common issues:
- Missing environment variables
- Database connection timeout
- Invalid Turso credentials

### Re-push schema to Turso

If you need to recreate tables:

```bash
# Update .env with Turso credentials
npm run db:push
```

## Local Development

For local development, you can use local SQLite by leaving DATABASE_URL empty in `.env`:

```env
# Leave empty or comment out for local SQLite
# DATABASE_URL=
# DATABASE_AUTH_TOKEN=

NUXT_SESSION_PASSWORD=your-session-password
```

The app will automatically use `file:.data/db/sqlite.db` for local development.
