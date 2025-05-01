# ServiceCo Toolkit

A production-ready starter kit to build service company websites using Next.js 13 with the Pages Router, TypeScript, Contentful as CMS, Storybook for component documentation, and Jest for unit testing.

## Features

- **Next.js 13** (Pages Router) - The React framework with hybrid static & server rendering
- **TypeScript** - Static type checking for better code quality
- **ESLint + Prettier** - Code linting and formatting
- **Jest + Testing Library** - Unit testing framework
- **Storybook** - Component documentation and development
- **Husky** - Git hooks for code quality

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code needs formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run storybook` - Start Storybook server
- `npm run build-storybook` - Build Storybook for deployment

## Project Structure

```
/
├── .husky/             # Git hooks
├── .storybook/         # Storybook configuration
├── components/         # React components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   └── _app.tsx        # App component
├── public/             # Static assets
└── ... configuration files
```

## Storybook

Run the Storybook server to view and develop components in isolation:

```bash
npm run storybook
```

This will start the Storybook server at [http://localhost:6006](http://localhost:6006).

## Testing

Run unit tests with Jest:

```bash
npm run test
```

## License

This project is licensed under the MIT License.
