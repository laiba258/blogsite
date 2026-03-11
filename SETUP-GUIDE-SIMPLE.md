# 🎯 Simple Setup Guide - Aapke liye

## Step 1: Turso CLI Install karein

### Windows Users:

**Sabse aasan tareeqa - Git Bash use karein:**

1. Git Bash open karein (Start menu mein search karein "Git Bash")
2. Ye command paste karein:
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```
3. Git Bash close karein aur phir se open karein

**Ya WSL use karein:**
1. PowerShell mein type karein: `wsl`
2. Same command run karein:
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

---

## Step 2: Turso Database Banayein

Git Bash ya WSL mein ye commands run karein:

```bash
# Login karein (browser open hoga)
turso auth login

# Database banayein
turso db create blogsite

# Database URL nikaalein (COPY KAREIN!)
turso db show blogsite --url

# Token banayein (COPY KAREIN!)
turso db tokens create blogsite
```

**Important:** URL aur token ko notepad mein save kar lein!

---

## Step 3: .env File Update karein

Apni project folder mein `.env` file open karein aur update karein:

```env
DATABASE_URL=libsql://blogsite-YOURNAME.turso.io
DATABASE_AUTH_TOKEN=eyJhbGc...YOUR_TOKEN_HERE
NUXT_SESSION_PASSWORD=1636d32a080143b2ac72e7dba5954576
```

**Note:** `YOURNAME` aur `YOUR_TOKEN_HERE` ko apne actual values se replace karein!

---

## Step 4: Database Tables Create karein

PowerShell ya terminal mein (project folder mein):

```bash
npm run db:push
```

Aapko ye dikhna chahiye:
```
✓ Changes applied
```

---

## Step 5: Database Seed karein

```bash
# Agar dev server nahi chal raha, to start karein
npm run dev

# Phir browser mein jaaein:
http://localhost:3000/api/seed
```

Ya terminal mein:
```bash
curl http://localhost:3000/api/seed
```

Success message dikhna chahiye!

---

## Step 6: Vercel Environment Variables

1. https://vercel.com/dashboard par jaaein
2. Apna project select karein
3. **Settings** → **Environment Variables**
4. **Add New** button click karein
5. Ye 3 variables add karein (ek ek karke):

**Variable 1:**
- Name: `DATABASE_URL`
- Value: `libsql://blogsite-YOURNAME.turso.io` (apna actual URL)
- Environments: ✅ Production ✅ Preview ✅ Development

**Variable 2:**
- Name: `DATABASE_AUTH_TOKEN`
- Value: `eyJhbGc...` (apna actual token)
- Environments: ✅ Production ✅ Preview ✅ Development

**Variable 3:**
- Name: `NUXT_SESSION_PASSWORD`
- Value: `1636d32a080143b2ac72e7dba5954576`
- Environments: ✅ Production ✅ Preview ✅ Development

---

## Step 7: Deploy karein

PowerShell ya terminal mein:

```bash
git add .
git commit -m "Fix Turso database for Vercel"
git push origin main
```

Vercel automatically deploy kar dega!

---

## Step 8: Check karein

1. Vercel dashboard mein deployment complete hone ka wait karein
2. Deployed URL open karein
3. Blog posts dikhne chahiye!

Agar posts nahi dikhe:
- `https://your-site.vercel.app/api/seed` visit karein
- Phir homepage refresh karein

---

## ❓ Problems?

### Turso CLI install nahi ho raha

**Solution:** 
- Git Bash download karein: https://git-scm.com/downloads
- Ya WSL install karein: PowerShell mein `wsl --install`

### "npm run db:push" error de raha hai

**Check karein:**
- `.env` file mein DATABASE_URL sahi hai?
- Token sahi copy kiya?
- Internet connection hai?

### Vercel par still crash ho raha hai

**Check karein:**
1. Vercel → Project → Settings → Environment Variables
2. Teeno variables properly add hue hain?
3. Values mein koi space ya extra character to nahi?

---

## 🎉 Done!

Agar sab kuch sahi gaya to aapka blog ab Vercel par live hai!

Questions? Mujhe batayein! 😊
