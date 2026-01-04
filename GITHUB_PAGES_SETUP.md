# GitHub Pages Setup - Step by Step

## ⚠️ Important: Enable GitHub Pages BEFORE Running the Workflow

The error you encountered happens because GitHub Pages needs to be enabled in your repository settings **before** the GitHub Actions workflow can deploy to it.

## Step-by-Step Setup

### Step 1: Enable GitHub Pages in Repository Settings

1. **Go to your GitHub repository** (e.g., `https://github.com/your-username/portfolio`)

2. **Click on "Settings"** (top menu bar of your repository)

3. **In the left sidebar, click "Pages"**

4. **Under "Build and deployment":**
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Leave other settings as default

5. **Click "Save"** (the button should be at the bottom)

### Step 2: Verify Your Vite Config

Make sure your `vite.config.ts` has the correct base path:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',  // Must match your repository name
})
```

**Important**: The base path must exactly match your GitHub repository name:
- If your repo is `portfolio`, use `base: '/portfolio/'`
- If your repo is `my-portfolio`, use `base: '/my-portfolio/'`
- For user.github.io repos, use `base: '/'`

### Step 3: Push Your Code and Trigger the Workflow

1. **Commit and push your code** (if you haven't already):
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```
   (or `master` if that's your default branch)

2. **Go to the "Actions" tab** in your GitHub repository

3. **You should see the workflow running** - it will automatically deploy to GitHub Pages

4. **Wait for the workflow to complete** (green checkmark)

### Step 4: Access Your Site

Once the workflow completes successfully, your site will be available at:

```
https://your-username.github.io/portfolio/
```

(Replace `your-username` with your GitHub username and `portfolio` with your actual repository name)

## Troubleshooting

### If the workflow still fails:

1. **Double-check that Pages is enabled:**
   - Settings → Pages → Source should be "GitHub Actions"

2. **Check repository permissions:**
   - Settings → Actions → General
   - Make sure "Workflow permissions" allows "Read and write permissions"

3. **Verify the base path matches your repo name:**
   - Your repo name (as shown in the URL) must match the base path in `vite.config.ts`

4. **Check the Actions logs:**
   - Go to Actions tab → Click on the failed workflow → Check the error messages

### Alternative: Manual Deployment (If GitHub Actions continues to fail)

If you prefer not to use GitHub Actions, you can deploy manually using the `gh-pages` package:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. In Settings → Pages, set Source to "Deploy from a branch" → Branch: `gh-pages` → `/ (root)`

## Still Having Issues?

- Check that your repository is public (or you have GitHub Pro/Team for private repos with Pages)
- Verify your GitHub username and repository name are correct
- Make sure you're using the correct branch name (`main` or `master`)

