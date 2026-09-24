# AGENTS.md 

You are an AI assistant working inside this repository. This document defines the commands, constraints, design system, and operational rules you must follow when inspecting, generating, or modifying code.

## 1. Project Overview

This is a website for the Advancing Equity in Research Assembly (AERA), a research conference for high school students that focuses on underrepresnted groups and topics.

## 2. Architecture/Stack

- **Stack:** React (SPA), Vite, Vanilla CSS Modules/Variables
- **Key Directories:** 
    - `src/pages/` - top-level route views & related CSS files (same .jsx and .module.css names correspond to the same page)
    - `src/components/` - shared UI elements across all pages
    - `src/tokens.css` - global design tokens (colors, spacing, typography)
    - `public/` — static assets (favicons, logos, images)

## 3. Agent Commands & Workflow

When instructed with these specific verbs, prioritize the following behavior:
    - `audit <file>`: Inspect the target component/CSS against design anti-patterns, accessibility rules, layout constraints, ugly AI-style design, and missing ideas. Provide a concise bulleted list of issues before proposing changes.
    - `redesign <component>`: Rework the component layout and structure while preserving the exact text copy, accessibility attributes, and established color palette tokens. Ask clarifying questions before beginning a redesign.
    - `build <feature>`: Generate clean JSX and CSS matching existing token conventions. Do not install new third-party libraries without asking. Do not create files without asking. Ask clarifying questions before beginning a build.
    - `remove <feature>`: Remove a feature while preserving text copy, accessiblity attributes, and established color palette tokens. Ask clarifying questions before removing a feature. If and only if the keyword "all" is included, remove the feature from all pages.

After performing a redesign, build, or remove action, provide a list of changed files and a concise bulleted summary of the changes.

## 4. Strict Development Rules

### React & Architecture

- **Preserve Global Routing:** Do not alter the persistent layout shell in `App.jsx` unless explicitly asked. Universal bars (`TopNav`) and route transitions must remain undisturbed.
- **Client Routing Standard:** Always use `<Link>` or `<NavLink>` from `react-router` for internal navigation. Never use standard `<a>` tags for internal links. Never use `react-router-dom`.
- **Capitalization:** All React components must use PascalCase (e.g., `Home.jsx`, `TopNav.jsx`).
- **Scroll Handling:** Route navigation must reset scroll position to the top using the centralized `ScrollToTop` helper.

### CSS & Styling Discipline

- **Token First:** Always reference CSS variables from `src/tokens.css` (e.g., `var(--color-paper)`, `var(--color-ink)`, `var(--color-accent)`). Never hardcode random hex values, fonts, etc., unless specifically told to declare a new brand palette.
- **Content Max-Width:** Never allow primary reading content to stretch across entire ultra-wide viewports. Lock containers to standard widths (typically `max-width: 1200px`) and center them using `margin: 0 auto`.
- **Motion & Accessibility:** Any CSS transition or keyframe animation must respect reduced-motion user settings:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

# 5. Operational & Terminal Guidelines

- **Package Management:** Use `npm` exclusively.
- **Dev Server:** `npm run dev`
- **Build & Verification:** `npm run build`
    - Always ensure ensure the build passes cleanly without unused imports or syntax errors before finishing a task.

- Only ask permission to run a command when it pertains to searching outside the aera directory and installing packages/dependencies. 
- You will be working on a separate branch from main. You may use `npm run dev` and `npm run build`, but **never** push code.