# Deployment Instructions for GitHub Pages

## Important: Fix for 404 Errors

If you're seeing errors like:
- `GET https://dualsparkstudio.github.io/src/main.tsx 404`
- `GET https://dualsparkstudio.github.io/109-Show_Booking/vite.svg 404`

This means the **source files** are being deployed instead of the **built files**.

## Correct Deployment Steps:

1. **Build the project first:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with optimized production files.

2. **Verify the build:**
   Check that `dist/index.html` exists and contains references to built JS files (not `/src/main.tsx`).

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   OR manually:
   ```bash
   gh-pages -d dist
   ```

## Important Notes:

- The `npm run deploy` command runs `npm run build` first, which should fix the issue
- Make sure you're deploying the `dist/` folder, NOT the `src/` folder
- The `gh-pages` branch should contain the contents of `dist/`, not the source code

## If errors persist:

1. Delete the `dist/` folder if it exists
2. Run `npm run build` to create a fresh build
3. Check `dist/index.html` - it should NOT reference `/src/main.tsx`
4. Run `npm run deploy` to deploy the fresh build

## Verify Deployment:

After deployment, check:
- The `gh-pages` branch in your GitHub repo
- It should contain: `index.html`, `assets/` folder, `vite.svg` (not `src/` folder)

