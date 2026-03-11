# 🚀 Quick Vercel Deployment Steps

## What I Fixed

Your project was crashing on Vercel because:
1. ❌ Database was hardcoded to use local SQLite file
2. ❌ Turso database had no tables
3. ❌ No environment variable support

Now it's fixed:
1. ✅ Automatically uses Turso on Vercel, SQLite locally
2. ✅ Easy schema push to Turso
3. ✅ Environment variables properly configured

---

## 🎯 Deploy to Vercel in 5 Minutes

### 1️⃣ Setup Turso Database (2 minutes)

```bash
# Install Turso CLI (if not installed)
# Windows: Use Git Bash or WSL
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create blogsite

# Get credentials (SAVE THESE!)
turso db show blogsite --url
turso db tokens create blogsite
```

### 2️⃣ Update Local .env (30 seconds)

Replace your `.env` file content with:

```env
DATABASE_URL=libsql://blogsite-YOURNAME.turso.io
DATABASE_AUTH_TOKEN=eyJhbGc...YOUR_TOKEN_HERE
NUXT_SESSION_PASSWORD=1636d32a080143b2ac72e7dba5954576
```

### 3️⃣ Push Schema to Turso (30 seconds)

```bash
npm run db:push
```

You should see: `✓ Changes applied`

### 4️⃣ Seed Database (30 seconds)

```bash
# Start dev server
npm run dev

# In another terminal or browser, visit:
curl http://localhost:3000/api/seed
```

### 5️⃣ Configure Vercel (1 minute)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `libsql://blogsite-YOURNAME.turso.io` | Production, Preview, Development |
| `DATABASE_AUTH_TOKEN` | `eyJhbGc...YOUR_TOKEN` | Production, Preview, Development |
| `NUXT_SESSION_PASSWORD` | `1636d32a080143b2ac72e7dba5954576` | Production, Preview, Development |

### 6️⃣ Deploy (1 minute)

```bash
git add .
git commit -m "Configure Turso for Vercel deployment"
git push origin main
```

Vercel will automatically deploy!

### 7️⃣ Verify Deployment

1. Wait for deployment to complete on Vercel
2. Visit your deployed URL
3. You should see your blog with posts!

If no posts appear, visit: `https://your-site.vercel.app/api/seed`

---

## 🔧 Troubleshooting

### "No tables in Turso database"

```bash
# Check tables
turso db shell blogsite
.tables
.quit

# If empty, push again
npm run db:push
```

### "Server Error on Vercel"

1. Check Vercel logs: Project → Deployments → Latest → Functions
2. Verify environment variables are set correctly
3. Make sure DATABASE_URL starts with `libsql://`

### "Want to use local SQLite instead of Turso"

Comment out DATABASE_URL in `.env`:

```env
# DATABASE_URL=libsql://...
# DATABASE_AUTH_TOKEN=...
NUXT_SESSION_PASSWORD=1636d32a080143b2ac72e7dba5954576
```

---

## 📚 Additional Resources

- **Full English Guide**: See `DEPLOYMENT.md`
- **Urdu Guide**: See `DEPLOYMENT-URDU.md`
- **Turso Docs**: https://docs.turso.tech
- **Vercel Docs**: https://vercel.com/docs

---

## ✅ Checklist

Before deploying, make sure:

- [ ] Turso database created
- [ ] Local `.env` has Turso credentials
- [ ] Ran `npm run db:push` successfully
- [ ] Database seeded (visited `/api/seed`)
- [ ] Vercel environment variables added
- [ ] Code pushed to GitHub
- [ ] Deployment successful on Vercel

---

Need help? Check the detailed guides or ask me! 🙂
