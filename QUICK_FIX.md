# Quick Fix for GitHub Pages 404 Errors

## The Issue
GitHub Pages is trying to load `/src/main.tsx` (source file) instead of built files.

## Most Likely Cause
**GitHub Pages is configured to serve from the wrong branch/folder.**

## Quick Fix (3 Steps)

### 1. Check GitHub Pages Settings

Go to: `https://github.com/dualsparkstudio/109-Show_Booking/settings/pages`

**Change these settings:**
- **Source Branch**: Must be `gh-pages` (NOT `main` or `master`)
- **Source Folder**: Must be `/ (root)` (NOT `/docs`)

Click **Save**.

### 2. Clean Deploy

Run this command:
```bash
npm run clean-deploy
```

Or manually:
```bash
# Remove old build
rmdir /s /q dist

# Build and deploy
npm run build
npm run deploy
```

### 3. Wait and Check

- Wait 2-3 minutes for GitHub Pages to rebuild
- Hard refresh browser (Ctrl+Shift+R)
- Visit: `https://dualsparkstudio.github.io/109-Show_Booking/`

## Verify It Worked

1. Go to your GitHub repo
2. Switch to the `gh-pages` branch
3. Check it has:
   - ✅ `index.html`
   - ✅ `assets/` folder  
   - ✅ `vite.svg`
   - ✅ `.nojekyll` file
   - ❌ NO `src/` folder

## Still Not Working?

The `gh-pages` branch might have wrong files. Delete and recreate it:

```bash
# From your main branch, delete gh-pages
git push origin --delete gh-pages

# Rebuild and redeploy
npm run clean-deploy
```

This should fix it! 🚀

