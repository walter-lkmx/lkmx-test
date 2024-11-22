# LKMX Website 🌐

Next.js-based website with internationalization support and custom styling using Flare design system.

## ✨ Features

- 🚀 Built with Next.js 13
- 🌍 Multilingual support (English/Spanish)
- 🎨 SVG imports with SVGR
- 💅 Flare design system integration
- 📝 Markdown content support with gray-matter and remark

## 🔧 Prerequisites

- Node.js 18
- npm 

## 🚀 Installation

```bash
npm install
```

## 💻 Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 🔍 Pre-commit Checks

Before pushing changes to the repository:
1. Run local build test:
```bash
npm run lint
npm run build
```
2. Fix any build errors or warnings
3. Only commit and push once the build succeeds

## 📜 Scripts

- `dev`: Start development server
- `build`: Build production application
- `export`: Generate static export
- `start`: Start production server
- `lint`: Run ESLint checks

## 🚀 Deployment

### Vercel Setup
- Project hosted on a free Vercel account
- Account ownership: walter.hurtado@lkmx.io
- Limited to single member access

### 🔄 Deployment Flow
1. Push changes to `stg` branch (no automatic deployment)
2. Create Pull Request from `stg` to `PRD` when ready
3. Vercel automatically deploys on commits to `PRD` branch

### ⚡ Manual Deploy
If needed, force a deployment using the webhook:
```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_4zS77YVZmrybFgaEMk5SG4dw2zl2/OWsf6NstVA
```