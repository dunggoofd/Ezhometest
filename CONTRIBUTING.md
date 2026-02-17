# Contributing Guide

Thank you for considering contributing to the Compression Sofa project!

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/dunggoofd/Ezhometest.git
cd Ezhometest
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Project Structure

```
/app                    # Next.js app directory
  /layout.tsx          # Root layout with SEO
  /page.tsx            # Homepage
  /globals.css         # Global styles

/components            # React components
  /HeroVideoSection.tsx
  /ProductConfigurator.tsx
  /ProductBundles.tsx
  /VirtualShowroom.tsx
  /ConversionEngine.tsx
  /TrustSignals.tsx

/lib                   # Utilities and types
  /types.ts
  /config.ts

/public               # Static assets
  /images
  /videos
```

## Code Style

We use ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Format code (if configured)
npm run format
```

### Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Keep components focused and reusable
- Add proper TypeScript types
- Write meaningful commit messages

## Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Test your changes:
```bash
npm run build
npm run lint
```

4. Commit your changes:
```bash
git commit -m "feat: add your feature"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/config changes

5. Push and create a pull request

## Adding New Components

When adding a new component:

1. Create a new file in `/components`
2. Use TypeScript and proper typing
3. Make it responsive (mobile-first)
4. Add necessary props interface
5. Export as default
6. Document complex logic with comments

Example:
```tsx
'use client'

interface MyComponentProps {
  title: string
  items: string[]
}

export default function MyComponent({ title, items }: MyComponentProps) {
  return (
    <div className="container mx-auto">
      <h2>{title}</h2>
      {/* Component content */}
    </div>
  )
}
```

## Testing

Before submitting a PR:

1. Test all interactive features
2. Verify responsive design
3. Check browser console for errors
4. Test on mobile devices
5. Verify SEO meta tags
6. Check accessibility

## Performance

Ensure your changes:
- Don't increase bundle size significantly
- Use dynamic imports for heavy components
- Optimize images and media
- Don't block the main thread
- Maintain good Core Web Vitals scores

## Accessibility

- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## License

By contributing, you agree that your contributions will be licensed under the project's license.
