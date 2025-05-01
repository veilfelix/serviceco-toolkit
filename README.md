# ServiceCo Toolkit

A production-ready starter kit to build service company websites using Next.js 13 with the Pages Router, TypeScript, Contentful as CMS, Storybook for component documentation, and Jest for unit testing.

## Features

- **Next.js 13** (Pages Router) - The React framework with hybrid static & server rendering
- **TypeScript** - Static type checking for better code quality
- **ESLint + Prettier** - Code linting and formatting
- **Jest + Testing Library** - Unit testing framework
- **Storybook** - Component documentation and development
- **Husky** - Git hooks for code quality


## Project Structure

```
/
├── .husky/                       # Git hooks (e.g., pre-commit hook to run lint/tests)
│   └── pre-commit                # Executes lint + tests before commit
├── .storybook/                   # Storybook configuration (used for component documentation/dev)
│   ├── main.ts                   # Entry point and plugin config
│   └── preview.ts                # Global decorators and styling
├── components/                   # All reusable UI and layout components
│   ├── a11y/                     # Accessibility utilities
│   │   └── SkipLink.tsx          # Screen reader-only skip to main content link
│   ├── Button/                   # Button component (variants, sizes, stories, tests)
│   ├── Layout/                   # App-wide layout (Header, Footer, Layout wrapper)
│   ├── Seo/                      # Reusable SEO <Head> injection component
│   └── ui/                       # Generic design primitives (Heading, Text, Container)
│       ├── Heading.tsx           # Semantic h1–h6 wrapper with consistent styles
│       ├── Text.tsx              # Paragraph or inline content with prose styles
│       └── Container.tsx         # Centralized max-width content wrapper
├── hooks/                        # Custom React hooks (empty for now)
├── lib/                          # Application logic or API fetchers
│   └── api/                      # Placeholder for Contentful or internal API utils
├── pages/                        # Next.js route pages (automatically routed)
│   ├── _app.tsx                  # Global layout and providers
│   ├── _document.tsx             # Custom HTML structure, <html lang="..."> etc.
│   ├── 404.tsx                   # Custom Not Found page
│   ├── 500.tsx                   # Custom Error page
│   ├── index.tsx                 # Homepage route (/)
│   └── api/hello.ts              # Example Next.js API route
├── public/                       # Static files (served as-is)
│   └── favicon.ico               # Site favicon
├── styles/
│   └── globals.css               # Tailwind + CSS custom properties for base theme
├── utils/                        # Utility functions
│   └── classNames.ts             # Helper to combine conditional Tailwind classNames
├── jest.config.ts                # Jest configuration
├── jest.setup.ts                 # Jest test setup file (e.g., mocks, extensions)
├── next.config.ts                # Next.js global configuration
├── postcss.config.js             # Tailwind + PostCSS plugin configuration
├── tailwind.config.js            # Tailwind theme extensions (colors, spacing, fonts)
├── tsconfig.json                 # TypeScript compiler options
├── tsconfig.tsbuildinfo          # TypeScript incremental build cache
├── package.json                  # Project scripts and dependencies
├── README.md                     # You’re reading it 😉
```


##  Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/veilfelix/serviceco-toolkit.git
cd serviceco-toolkit
npm install
```

### Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000/) to see the application.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Commands

Below is a list of useful commands to run, test, and validate the project during development and deployment.

### Development

|Command|Description|
|---|---|
|`npm run dev`|Launches the Next.js development server.|
|`npm run start`|Starts the production server (after build).|
|`npm run build`|Builds the production version of the app.|

### Storybook

|Command|Description|
|---|---|
|`npm run storybook`|Starts the Storybook UI at `localhost:6006`.|
|`npm run build-storybook`|Builds a static version of the Storybook UI.|

### Code Quality

|Command|Description|
|---|---|
|`npm run lint`|Runs ESLint to check for linting issues.|
|`npm run lint:fix`|Fixes fixable lint issues automatically.|
|`npm run format`|Formats code using Prettier.|
|`npm run format:check`|Checks formatting without writing changes.|
|`npm run check`|Runs TypeScript, ESLint, and tests together.|

### Testing

|Command|Description|
|---|---|
|`npm run test`|Runs all Jest unit tests.|
|`npm run test:watch`|Runs tests in watch mode.|
|`npm run test:coverage`|Generates a code coverage report.|

### Performance

|Command|Description|
|---|---|
|`npm run analyze`|Runs `next build` with bundle analyzer enabled.|

> Tip: On Windows, environment variables like `ANALYZE=true` are handled via `cross-env`.
