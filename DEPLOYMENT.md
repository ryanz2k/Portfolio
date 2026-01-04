# Deployment Guide

## Quick Start for GitHub Pages

### Step 1: Update Repository Name

Before deploying, update the `base` path in `vite.config.ts` to match your GitHub repository name:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // Change this to your actual repository name
})
```

**Important**: 
- If your repo is `My-Portfolio`, use `base: '/My-Portfolio/'`
- If your repo is `portfolio`, use `base: '/portfolio/'`
- For user.github.io repos (custom domain), use `base: '/'`

### Step 2: Enable GitHub Pages (IMPORTANT - Do This First!)

**⚠️ You MUST enable GitHub Pages in repository settings BEFORE the workflow can deploy:**

1. **Go to your GitHub repository**
2. **Click "Settings"** (top menu)
3. **Click "Pages"** (left sidebar)
4. **Under "Build and deployment" → Source:**
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **"Save"**

### Step 3: Deploy

The project includes GitHub Actions for automatic deployment:

1. **Push your code to GitHub** (make sure you're on `main` or `master` branch)
2. **Go to the "Actions" tab** - the workflow should run automatically
3. **Wait for the workflow to complete** (green checkmark)

Your site will be available at: `https://your-username.github.io/your-repo-name/`

**Note**: If you see an error about "Pages site failed" or "Not Found", it means GitHub Pages isn't enabled yet. Go back to Step 2 and make sure you've selected "GitHub Actions" as the source.

## Alternative Deployment Options

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and configure everything
3. Your site will be live in seconds

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Custom Domain
If you're using a custom domain:
1. Set `base: '/'` in `vite.config.ts`
2. Follow your hosting provider's instructions for custom domains

