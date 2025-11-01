# Fix for Jekyll Build Error

## The Problem
GitHub Pages is trying to build your site using **Jekyll** from a `/docs` folder, but:
- Your site is a **Vite/React** app (not Jekyll)
- You're deploying to the `gh-pages` branch (not `/docs` folder)
- Jekyll is processing files it shouldn't

## The Error
```
No such file or directory @ dir_chdir0 - /github/workspace/docs
```

This means GitHub Pages is looking for a `/docs` folder that doesn't exist.

## Solution

### Option 1: Change GitHub Pages Settings (Recommended)

1. Go to your repository: `https://github.com/dualsparkstudio/109-Show_Booking`
2. Click **Settings** → **Pages**
3. Under **Source**, change:
   - **From**: `Deploy from a branch` → `/docs` folder
   - **To**: `Deploy from a branch` → **Branch**: `gh-pages` → **Folder**: `/ (root)`
4. Click **Save**

### Option 2: Use GitHub Actions (Alternative)

I've created a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:
- Build your site automatically when you push to `main`
- Deploy to GitHub Pages correctly
- Skip Jekyll processing

To use it:
1. The workflow file is already created
2. In GitHub Pages settings, change source to: **GitHub Actions**
3. Push your code to `main` branch
4. It will automatically build and deploy

### Option 3: Disable Jekyll Completely

If you want to keep using `/docs` folder (not recommended):
1. Create a `/docs` folder
2. Copy your built files there
3. Add `.nojekyll` file to `/docs`
4. Change GitHub Pages to serve from `/docs`

But **Option 1 is best** for your setup.

## After Changing Settings

1. **Redeploy** (to ensure `.nojekyll` is in gh-pages branch):
   ```bash
   npm run deploy
   ```

2. **Verify** the `gh-pages` branch has:
   - ✅ `index.html`
   - ✅ `assets/` folder
   - ✅ `.nojekyll` file (important!)
   - ✅ `vite.svg`

3. **Wait 2-3 minutes** for GitHub Pages to update

4. **Visit**: `https://dualsparkstudio.github.io/109-Show_Booking/`

## Why This Happens

GitHub Pages defaults to Jekyll mode. When you:
- Deploy to `/docs` folder → Jekyll tries to build
- Deploy to `gh-pages` branch → Jekyll also tries to build (unless `.nojekyll` exists)

The `.nojekyll` file tells GitHub Pages: "Don't use Jekyll, serve static files as-is."

## Quick Fix Summary

**Change GitHub Pages source from `/docs` to `gh-pages` branch!**

Settings → Pages → Source → Branch: `gh-pages` → Folder: `/ (root)`

That's it! 🚀

