# John Ryan Gomez - Portfolio

A professional portfolio website showcasing my experience, projects, skills, and education as an Information Technology student and web developer.

## 🚀 Features

- **Modern Design**: Clean and professional UI built with Tailwind CSS
- **Responsive**: Fully responsive design that works on all devices
- **Fast**: Built with React and Vite for optimal performance
- **Type-Safe**: Written in TypeScript for better code quality
- **Smooth Navigation**: Smooth scrolling and active section highlighting

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### GitHub Pages (Recommended)

The project includes a GitHub Actions workflow for automatic deployment.

1. **Update the base path** in `vite.config.ts` to match your repository name:
   ```ts
   base: '/your-repo-name/',  // Change 'My-Portfolio' to your actual repo name
   ```

2. **Push your code to GitHub** (make sure you're on `main` or `master` branch)

3. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to main/master

**Note**: If your repository name is different, update the `base` path in `vite.config.ts` and the workflow file `.github/workflows/deploy.yml` if needed.

### Alternative: Manual GitHub Pages Deployment

1. Update the `base` path in `vite.config.ts`:
   ```ts
   base: '/your-repo-name/',
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings → Pages → Source: `gh-pages` branch

### Alternative Deployment

You can also deploy to:
- **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repo
- **Cloudflare Pages**: Connect your GitHub repo for automatic deployments

## 📝 Customization

- Update personal information in component files
- Modify colors in `tailwind.config.js`
- Add or remove sections as needed
- Update project details in `src/components/Projects.tsx`

## 📄 License

This project is open source and available under the MIT License.

