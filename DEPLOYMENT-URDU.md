# Vercel Deployment Guide - Turso Database ke saath

## Masla kya tha?

Aapka project local par chal raha tha lekin Vercel par deploy karne ke baad crash ho raha tha kyunki:
1. Database connection local SQLite file use kar raha tha jo Vercel par available nahi hai
2. Turso database mein tables create nahi hue the
3. Environment variables properly set nahi the

## Solution - Step by Step

### Step 1: Turso Database Setup

Pehle Turso CLI install karein (agar already nahi hai):

**Windows (PowerShell ya Git Bash):**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

**Mac:**
```bash
brew install tursodatabase/tap/turso
```

### Step 2: Turso Database Create karein

```bash
# Turso mein login karein
turso auth login

# Naya database banayein
turso db create blogsite

# Database URL nikaalein
turso db show blogsite --url

# Auth token banayein
turso db tokens create blogsite
```

**Important:** URL aur token ko copy kar lein - ye Vercel mein chahiye honge.

### Step 3: Local .env File Update karein

Apni `.env` file mein Turso credentials add karein:

```env
DATABASE_URL=libsql://blogsite-your-username.turso.io
DATABASE_AUTH_TOKEN=eyJhbGc...your-token-here
NUXT_SESSION_PASSWORD=1636d32a080143b2ac72e7dba5954576
```

### Step 4: Database Tables Create karein (Turso mein)

Ab tables Turso database mein push karein:

```bash
npm run db:push
```

Ye command aapke schema ko Turso database mein create kar degi.

### Step 5: Database ko Seed karein

Tables create hone ke baad, data add karein:

```bash
# Local server chalayein (Turso credentials ke saath)
npm run dev

# Dusri terminal mein:
curl http://localhost:3000/api/seed
```

Ya phir browser mein jaakar: `http://localhost:3000/api/seed`

### Step 6: Vercel Environment Variables Set karein

1. Vercel dashboard par jaaein: https://vercel.com
2. Apna project select karein
3. **Settings** → **Environment Variables** par jaaein
4. Ye 3 variables add karein:

```
Name: DATABASE_URL
Value: libsql://blogsite-your-username.turso.io

Name: DATABASE_AUTH_TOKEN  
Value: eyJhbGc...your-token-here

Name: NUXT_SESSION_PASSWORD
Value: 1636d32a080143b2ac72e7dba5954576
```

**Important:** Teeno variables ko **Production**, **Preview**, aur **Development** ke liye enable karein.

### Step 7: Code Push karein aur Deploy karein

```bash
git add .
git commit -m "Fix Turso database configuration for Vercel"
git push origin main
```

Vercel automatically deploy kar dega.

### Step 8: Verify karein

1. Vercel deployment complete hone ka wait karein
2. Apni deployed site ka URL open karein
3. Homepage par blog posts dikhne chahiye

Agar posts nahi dikh rahe, toh deployed URL par `/api/seed` visit karein:
```
https://your-site.vercel.app/api/seed
```

## Troubleshooting

### Problem 1: Turso mein tables nahi dikh rahe

**Solution:**
```bash
# Turso shell open karein
turso db shell blogsite

# Tables check karein
.tables

# Posts check karein
SELECT * FROM posts;
```

Agar tables nahi hain, phir se push karein:
```bash
npm run db:push
```

### Problem 2: Vercel par "Server Error" aa raha hai

**Solution:**
1. Vercel dashboard → Project → Deployments
2. Latest deployment par click karein
3. **Functions** tab mein errors check karein

Common issues:
- Environment variables missing hain
- Database URL ya token galat hai
- Turso database mein tables nahi hain

### Problem 3: Local development mein Turso use nahi karna

Agar aap local par SQLite use karna chahte hain:

`.env` file mein DATABASE_URL ko comment kar dein:
```env
# DATABASE_URL=libsql://...
# DATABASE_AUTH_TOKEN=...

NUXT_SESSION_PASSWORD=1636d32a080143b2ac72e7dba5954576
```

App automatically local SQLite use karega.

## Quick Setup Script (Optional)

Windows users PowerShell mein ye run karein:
```powershell
.\scripts\setup-turso.ps1
```

Mac/Linux users:
```bash
chmod +x scripts/setup-turso.sh
./scripts/setup-turso.sh
```

Ye script automatically:
- Turso database create karega
- URL aur token generate karega
- Aapko credentials de dega

## Summary

Ab aapka project:
✅ Local par SQLite use karta hai (development ke liye)
✅ Vercel par Turso database use karta hai (production ke liye)
✅ Environment variables se automatically switch hota hai
✅ Properly deploy hoga bina crash ke

Koi problem ho toh mujhe batayein!
