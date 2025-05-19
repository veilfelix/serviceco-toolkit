# ServiceCo Toolkit

A starter kit to build service company websites using Next.js 13 with the Pages Router, TypeScript, Contentful as CMS, Storybook for component documentation, and Jest for unit testing.

## Features

- **Next.js 13** (Pages Router) - The React framework with hybrid static & server rendering
- **TypeScript** - Static type checking for better code quality
- **ESLint + Prettier** - Code linting and formatting
- **Jest + Testing Library** - Unit testing framework
- **Storybook** - Component documentation and development
- **Modular Design System** - React components styled with Tailwind, Radix UI, and CSS tokens for accessibility and full customization. See our [Design System Guidelines](./docs/design-system.md) for how we structure, style, and override UI components using tokens and Tailwind. For layout patterns, check out our [Grid & Stack System](./docs/grid-stack-system.md) documentation.
- **Husky** - Git hooks for code quality
- **Bundle Analyzer** - Interactive visual reports to inspect the weight and composition of client, server, and edge bundles (`npm run analyze`)


##  Getting Started

### 1. Clone the repository and install dependencies:

```bash
git clone https://github.com/veilfelix/serviceco-toolkit.git
cd serviceco-toolkit
npm install
```

### 2. Set up environment variables

Create a `.env.local` file at the root of the project with the following values:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
```

> You can find these keys in your Contentful dashboard, under **Settings → API keys**


### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000/) to see the application.


## Contentful Setup

There are two ways to connect Contentful to this project:

### Option 1 — Collaborating on this repo

Use the same space and credentials provided by the project owner. No need to configure the content model.

### Option 2 — Using your own Contentful space (after forking)

If you’re starting your own project based on this starter kit, here’s the minimum structure you’ll need in Contentful:

#### Content model: `Page`

|Field ID|Type|Description|
|---|---|---|
|`title`|Text|Page title (shown in the UI)|
|`slug`|Text|Used in the URL (e.g. `/about`)|
|`description`|Rich text|Page content|
|`heroImage`|Media|Optional top banner|
|`metaTitle`|Text|SEO title|
|`metaDescription`|Text|SEO description (max ~155 chars)|
|`metaImage`|Media|Social sharing image|
|`noIndex`|Boolean|Prevents indexing by Google|

> Make sure the **slug field** is unique and does **not** use Contentful's URL pattern validation option. Instead, you should use the "Custom" option with `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

Once your content type is ready and your `.env.local` is filled in, you're good to go.


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
|`npm run analyze`|Runs `next build` with bundle analyzer (@next/bundle-analyzer) enabled.|

### Image Placeholders

|Command|Description|
|---|---|
|`npx ts-node scripts/generate-blur-placeholder.ts <image-url>`|Generates a base64 blurDataURL from an image URL for use with the Image component. See [docs/blur-placeholders.md](./docs/blur-placeholders.md) for full details.|


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
│   │   └── api/                            # Contentful or internal API utils
│   │       └── contentful.ts               # Contentful client instance for fetching data from CMS
│   ├── pages/                              # Next.js route pages (automatically routed)
│   │   ├── _app.tsx                        # Global layout and providers
│   │   ├── _document.tsx                   # Custom HTML structure, <html lang="..."> etc.
│   │   ├── [slug].tsx                      # Dynamic page route for CMS-driven content (e.g., About Us, Services)
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