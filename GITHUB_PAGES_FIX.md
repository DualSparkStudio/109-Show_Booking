# GitHub Pages Deployment Fix

## The Problem
GitHub Pages is serving source files instead of built files, causing 404 errors for:
- `/src/main.tsx` (source file - shouldn't be deployed)
- `/vite.svg` (favicon)

## Root Cause
GitHub Pages might be configured to serve from:
- Wrong branch (main/master instead of gh-pages)
- Wrong folder (root instead of /docs or gh-pages branch)
- Old deployment that wasn't properly cleaned

## Solution Steps

### Step 1: Check GitHub Pages Settings

1. Go to your repository: `https://github.com/dualsparkstudio/109-Show_Booking`
2. Click **Settings** → **Pages**
3. Under **Source**, make sure it's set to:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. If it's set to `main` branch or `/docs`, change it to `gh-pages` branch
5. Click **Save**

### Step 2: Clean and Rebuild

```bash
# Remove old build
rmdir /s /q dist 2>nul || rm -rf dist

# Build fresh
npm run build

# Verify the build
npm run verify-build
```

Check `dist/index.html` - it should:
- ✅ Reference files in `/109-Show_Booking/assets/`
- ❌ NOT reference `/src/main.tsx`

### Step 3: Deploy

```bash
npm run deploy
```

This will:
1. Build the project
2. Verify the build
3. Deploy to `gh-pages` branch

### Step 4: Wait for GitHub Pages to Update

- Wait 1-2 minutes after deployment
- GitHub Pages can take a few minutes to rebuild
- Hard refresh your browser (Ctrl+Shift+R)

### Step 5: Verify Deployment

1. Go to your repository on GitHub
2. Switch to the `gh-pages` branch
3. Verify it contains:
   - ✅ `index.html`
   - ✅ `assets/` folder
   - ✅ `vite.svg`
   - ❌ NO `src/` folder
   - ❌ NO `node_modules/`

## Manual Deployment (if npm run deploy doesn't work)

```bash
# Build
npm run build

# Install gh-pages globally if needed
npm install -g gh-pages

# Deploy manually
gh-pages -d dist -b gh-pages

# Or push manually
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/dualsparkstudio/109-Show_Booking.git
git push -f origin gh-pages
```

## Troubleshooting

### Still seeing 404 errors?

1. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
2. **Check the gh-pages branch**: Make sure it has the correct files
3. **Check GitHub Pages settings**: Must be set to `gh-pages` branch
4. **Wait longer**: GitHub Pages can take 5-10 minutes to update
5. **Check the URL**: Make sure you're accessing:
   `https://dualsparkstudio.github.io/109-Show_Booking/`

### Build failing?

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Still not working?

Check the actual files in the gh-pages branch on GitHub. If they're wrong, delete the gh-pages branch and redeploy:

```bash
# Delete gh-pages branch (from main branch)
git push origin --delete gh-pages

# Rebuild and redeploy
npm run deploy
```

## Expected File Structure in gh-pages branch

```
gh-pages branch (root)
├── index.html          ← Should reference assets, not src
├── vite.svg
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── ...
```

**NOT:**
- ❌ `src/` folder
- ❌ `node_modules/`
- ❌ `package.json`
- ❌ Any TypeScript files

