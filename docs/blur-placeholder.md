# Blur Placeholder Support

This project supports blurred placeholders for images (`blurDataURL`) in a safe and framework-friendly way. Here's how it works and how to use it.

---

## What Are Blur Placeholders?

In Next.js, you can show a low-quality image preview (LQIP) while the full image loads by using the `blur` placeholder:

```tsx
<Image
  src="/my-image.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
````

The `blurDataURL` is a base64-encoded preview image. But it must be generated in advance since Next.js does not create it automatically.

---

## Our Approach

To ensure performance, security, and maintainability, this project uses the following strategy:

### 🔹 1. **Development-time CLI Tool**

We provide a script to generate `blurDataURL`s:

```bash
node scripts/generate-blur-placeholder.js <image-url>
```

This script:

* Downloads the image
* Converts it to a base64 blur placeholder
* Prints a snippet to paste into your code

> **🛑 This script should NEVER be run at runtime.**
> It's a dev-only tool to generate and copy values.

---

### 🔹 2. **Runtime Utilities**

In `src/utils/imageUtils.ts`, you’ll find safe helpers like:

* `mockBlurData`: For Storybook and testing
* `demoPlaceholders`: Blur presets for known sources like `picsum.photos`
* `getBlurDataUrl()`: Resolves a safe blur placeholder without any dynamic processing (e.g. for mock or fallback cases)

---

## Storybook & Testing

When rendering the `Image` component in Storybook or Jest, no real processing is performed. Instead, mocked blur placeholders are used from `mockBlurData`.

This ensures that your stories and tests run:

* Without external dependencies
* Without runtime base64 computation
* Without breaking if an image URL is unreachable

---

## CMS & Dynamic Images

This project's Design-System is **CMS-agnostic by design**. That means:

* It doesn’t assume Contentful, or any other backend is used
* It doesn’t try to fetch or process dynamic images at runtime

If you use a CMS, it’s your responsibility to:

* Either configure the CMS to return a blur version (e.g. via CDN)
* Or pre-generate `blurDataURL` values and inject them into your frontend

We don’t include CMS-specific logic in this starter to keep it portable.

---

## Summary

| Task                 | Solution                                    |
| -------------------- | ------------------------------------------- |
| Hardcoded image      | Run CLI tool and paste `blurDataURL`        |
| Storybook/test image | Use `mockBlurData` (automatic)              |
| CMS-provided image   | Blur must be provided or handled externally |

---

## File Structure Overview

```
src/
├── components/
│   └── ui/
│       └── Image/             ← Image component
├── utils/
│   └── imageUtils.ts         ← Blur data logic (mock/fallback)
scripts/
└── generate-blur-placeholder.js ← CLI to generate blurDataURL
```