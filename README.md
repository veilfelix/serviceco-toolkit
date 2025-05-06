# ServiceCo Toolkit

A starter kit to build service company websites using Next.js 13 with the Pages Router, TypeScript, Contentful as CMS, Storybook for component documentation, and Jest for unit testing.

## Features

- **Next.js 13** (Pages Router) - The React framework with hybrid static & server rendering
- **TypeScript** - Static type checking for better code quality
- **ESLint + Prettier** - Code linting and formatting
- **Jest + Testing Library** - Unit testing framework
- **Storybook** - Component documentation and development
- **Husky** - Git hooks for code quality


##  Getting Started

### Clone the repository and install dependencies:

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


## Project Structure

```
/
├── .husky/                                 # Git hooks (e.g., pre-commit hook to run lint/tests)
│   └── pre-commit                          # Executes lint + tests before commit
├── .storybook/                             # Storybook configuration (used for component documentation/dev)
│   ├── main.ts                             # Entry point and plugin config
│   └── preview.ts                          # Global decorators and styling
├── public/                                 # Static files (served as-is)
│   └── favicon.ico                         # Site favicon
├── src/                                    # All source files live here after migration
│   ├── components/                     
│   │   └── a11y/                           # Accessibility component utilities
│   │   ├── composed/                       # Structural or multi-element components (Header, Footer, Layout, Seo)
│   │   │   ├── layout/                     # Page wrapper layout
│   │   │   │   └── header/                 # Site header with navigation
│   │   │   │   └── footer/                 # Site footer
│   │   │   ├── Dialog/                     # Dialog which can include any React element
│   │   │   │   ├── Dialog.tsx              # Dialog component
│   │   │   │   ├── Dialog.stories.tsx      # Dialog stories for Storybook
│   │   │   │   └── Dialog.test.tsx         # Dialog unit tests using Jest and @testing-library
│   │   │   └── ...
│   │   └── ui/                             # Design system primitives (themed + variant-based)
│   │       ├── button/                     # Clickable button with variants
│   │       │   ├── button.tsx              # Button component
│   │       │   ├── button.stories.tsx      # Button stories for Storybook
│   │       │   └── button.test.tsx         # Button unit tests using Jest and @testing-library
│   │       └── ...
│   ├── hooks/                              # Custom React hooks (empty for now)
│   ├── lib/                                # Application logic or API fetchers
│   │   └── api/                            # Placeholder for Contentful or internal API utils
│   ├── pages/                              # Next.js route pages (automatically routed)
│   │   ├── _app.tsx                        # Global layout and providers
│   │   ├── _document.tsx                   # Custom HTML structure, <html lang="..."> etc.
│   │   ├── 404.tsx                         # Custom Not Found page
│   │   ├── 500.tsx                         # Custom Error page
│   │   ├── index.tsx                       # Homepage route (/)
│   │   └── api/hello.ts                    # Example Next.js API route
│   ├── styles/                             
│   │   └── globals.css                     # Tailwind base/reset + theme injection
│   ├── theme/                              # Design system tokens & variables
│   │   ├── index.css                       # CSS variables used by Tailwind theme
│   │   └── tokens.ts                       # JS-accessible tokens (colors, spacing, fonts)
│   └── utils/                              
│       ├── classNames.ts                   # Helper to combine conditional Tailwind classNames
│       └── getButtonClassNames.ts          # Returns Tailwind classes for Button + ButtonLink
├── jest.config.ts                          # Jest configuration
├── jest.setup.ts                           # Jest test setup file (e.g., mocks, extensions)
├── next.config.ts                          # Next.js global configuration
├── postcss.config.js                       # Tailwind + PostCSS plugin configuration
├── tailwind.config.js                      # Tailwind theme extensions (colors, spacing, fonts, tokens)
├── tsconfig.json                           # TypeScript compiler options
├── tsconfig.tsbuildinfo                    # TypeScript incremental build cache
├── package.json                            # Project scripts and dependencies
├── README.md                               # You’re reading it 😉
```