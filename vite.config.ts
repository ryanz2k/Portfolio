import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: Update base to '/your-repo-name/' if deploying to a project page
// For custom domain or user.github.io: use base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/My-Portfolio/',
})

