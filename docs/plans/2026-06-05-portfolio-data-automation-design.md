# Portfolio Data & Deployment Automation Design

## Goal
Extract hardcoded placeholder data from the portfolio's React components into a clean, easily updatable configuration file, and automate the build and deployment process to GitHub Pages.

## Approach
1. **Data Architecture (TypeScript Config)**
   - Create `src/config/portfolio.ts` containing strongly typed data structures.
   - Define exported constants for `bio`, `skills`, `projects`, and `socials`.
   - Use `lucide-react` icons directly within the configuration to maintain type safety and the existing aesthetic.

2. **Component Refactoring**
   - Modify `src/App.tsx` to import the configuration objects.
   - Replace static JSX blocks with dynamic `.map()` iterations over the config data (for skills, projects, and contact links).
   - Ensure the cyberpunk theme and existing functional components (like `ProjectCard` and `SkillPill`) remain intact.

3. **Deployment Automation (GitHub Actions)**
   - Create a GitHub Actions workflow `.github/workflows/deploy.yml`.
   - Trigger the workflow on pushes to the `main` branch.
   - The workflow will:
     - Check out the repository.
     - Install dependencies using `npm ci`.
     - Build the Vite project using `npm run build`.
     - Upload the `dist` artifact and deploy it to GitHub Pages.
