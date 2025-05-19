#!/usr/bin/env node
/**
 * CLI tool to generate blur placeholders for image optimization.
 *
 * This script is intended for use during development only.
 * It downloads an image, generates a small base64-encoded placeholder using @plaiceholder/base64,
 * and prints the result to stdout so you can manually paste it into your code.
 *
 * Usage:
 *   ts-node scripts/generate-blur-placeholder.ts https://example.com/image.jpg
 *
 * Why not run it automatically at runtime?
 * - To avoid adding heavy dependencies (like Sharp) to your production bundle.
 * - To maintain CMS-agnostic behavior and reduce runtime costs.
 *
 * If you're using dynamic or CMS-driven images, you may need to handle blur generation
 * at build-time (via scripts like this) or delegate it to the CMS/media pipeline.
 *
 * Learn more in `/docs/blur-placeholders.md`
 */

import { getBase64 } from '@plaiceholder/base64';
import fetch from 'node-fetch';

async function generateBlurPlaceholder(imageUrl: string): Promise<void> {
  try {
    console.log(`Generating blur placeholder for: ${imageUrl}`);

    // Fetch the image
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    // Get the image as buffer
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    
    // Generate the base64 placeholder
    const base64 = await getBase64(buffer);
    
    // Output the result
    console.log('\nGenerated blur placeholder:');
    console.log(base64);
    console.log('\nHow to use:');
    console.log(`<Image src="${imageUrl}" alt="Description" blurDataURL="${base64}" />`);
    
  } catch (error) {
    console.error('Error generating blur placeholder:', error);
    process.exit(1);
  }
}

// Get the URL from command line arguments
const imageUrl = process.argv[2];

if (!imageUrl) {
  console.error('Please provide an image URL');
  console.error('Usage: ts-node scripts/generate-blur-placeholder.ts https://example.com/image.jpg');
  process.exit(1);
}

// Run the script
generateBlurPlaceholder(imageUrl);