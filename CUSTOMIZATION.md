# Customization Guide

## Quick Updates

### 1. Social Media Links

Update your GitHub and LinkedIn URLs in these files:
- `src/components/Hero.tsx` (lines 38, 47)
- `src/components/Contact.tsx` (lines 68, 77)

Replace placeholder URLs with your actual profiles:
```tsx
href="https://github.com/your-username"
href="https://linkedin.com/in/your-profile"
```

### 2. Repository Name for GitHub Pages

Update the base path in `vite.config.ts`:
```typescript
base: '/your-actual-repo-name/',
```

### 3. Personal Information

All content is pulled from your resume. Key files to update:
- **Experience**: `src/components/Experience.tsx`
- **Projects**: `src/components/Projects.tsx`
- **Skills**: `src/components/Skills.tsx`
- **Education**: `src/components/Education.tsx`
- **About**: `src/components/About.tsx`
- **Contact**: `src/components/Contact.tsx`

### 4. Colors

Customize the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Update these hex values to your preferred colors
    600: '#2563eb',  // Main primary color
    700: '#1d4ed8',  // Darker shade
    // ...
  }
}
```

### 5. Meta Tags

Update SEO meta tags in `index.html`:
- Title
- Description
- Add Open Graph tags for better social sharing

