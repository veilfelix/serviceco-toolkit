import type { Meta, StoryObj } from '@storybook/react'
import Image from './Image'
import { ImageOff } from 'lucide-react'
import { mockBlurData } from '@/utils/imageUtils'

const meta: Meta<typeof Image> = {
  title: 'Components/UI/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Image source URL',
      control: 'text',
    },
    alt: {
      description: 'Accessible alt text (required)',
      control: 'text',
    },
    width: {
      description: 'Width in pixels',
      control: { type: 'number', min: 1 },
    },
    height: {
      description: 'Height in pixels',
      control: { type: 'number', min: 1 },
    },
    ratio: {
      description: 'Aspect ratio (overrides width/height)',
      options: [undefined, '1:1', '4:3', '16:9', '21:9', '2:3', '3:2'],
      control: 'select',
    },
    objectFit: {
      description: 'How the image fills its container',
      options: ['fill', 'contain', 'cover', 'none'],
      control: 'select',
      defaultValue: 'cover',
    },
    variant: {
      description: 'Visual variant',
      options: ['default', 'rounded', 'bordered'],
      control: 'select',
      defaultValue: 'default',
    },
    priority: {
      description: 'Priority loading for LCP',
      control: 'boolean',
      defaultValue: false,
    },
    blurDataURL: {
      description: 'Blur data URL for placeholder (enables blur placeholder when provided)',
      control: 'text',
    },
    fallback: {
      description: 'Custom fallback when image fails to load',
      control: false,
    },
    className: {
      description: 'Additional CSS classes for the image',
      control: 'text',
    },
    wrapperClassName: {
      description: 'Additional CSS classes for the wrapper',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Playground: Story = {
  args: {
    src: 'https://picsum.photos/seed/picsum/800/600',
    alt: 'A random placeholder image',
    width: 400,
    height: 300,
    variant: 'default',
    objectFit: 'cover',
  },
}

export const WithRatio: Story = {
  args: {
    src: 'https://picsum.photos/seed/aspectratio/800/600',
    alt: 'A random placeholder image with 16:9 aspect ratio',
    ratio: '16:9',
    objectFit: 'cover',
    className: 'w-full max-w-lg',
    blurDataURL: mockBlurData.landscape,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-lg font-medium">Default</h3>
        <Image
          src="https://picsum.photos/seed/default/800/600"
          alt="Default variant image"
          width={300}
          height={200}
          variant="default"
        />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-medium">Rounded</h3>
        <Image
          src="https://picsum.photos/seed/rounded/800/600"
          alt="Rounded variant image"
          width={300}
          height={200}
          variant="rounded"
        />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-medium">Bordered</h3>
        <Image
          src="https://picsum.photos/seed/bordered/800/600"
          alt="Bordered variant image"
          width={300}
          height={200}
          variant="bordered"
        />
      </div>
    </div>
  ),
}

export const AspectRatios: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">1:1</h3>
          <Image
            src="https://picsum.photos/seed/square/800/800"
            alt="1:1 aspect ratio image"
            ratio="1:1"
            variant="rounded"
            blurDataURL={mockBlurData.square}
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">4:3</h3>
          <Image
            src="https://picsum.photos/seed/standard/800/600"
            alt="4:3 aspect ratio image"
            ratio="4:3"
            variant="rounded"
            blurDataURL={mockBlurData.landscape}
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">16:9</h3>
          <Image
            src="https://picsum.photos/seed/widescreen/800/450"
            alt="16:9 aspect ratio image"
            ratio="16:9"
            variant="rounded"
            blurDataURL={mockBlurData.widescreen}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">21:9</h3>
          <Image
            src="https://picsum.photos/seed/ultrawide/800/343"
            alt="21:9 aspect ratio image"
            ratio="21:9"
            variant="rounded"
            blurDataURL={mockBlurData.widescreen}
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">2:3</h3>
          <Image
            src="https://picsum.photos/seed/portrait/600/900"
            alt="2:3 aspect ratio image"
            ratio="2:3"
            variant="rounded"
            blurDataURL={mockBlurData.portrait}
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">3:2</h3>
          <Image
            src="https://picsum.photos/seed/landscape/900/600"
            alt="3:2 aspect ratio image"
            ratio="3:2"
            variant="rounded"
            blurDataURL={mockBlurData.landscape}
          />
        </div>
      </div>
    </div>
  ),
}

export const ObjectFitDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">Cover</h3>
          <Image
            src="https://picsum.photos/seed/cover/600/600"
            alt="Object-fit: cover"
            width={200}
            height={150}
            objectFit="cover"
            variant="bordered"
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">Contain</h3>
          <Image
            src="https://picsum.photos/seed/contain/600/600"
            alt="Object-fit: contain"
            width={200}
            height={150}
            objectFit="contain"
            variant="bordered"
            className="bg-muted/20"
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">Fill</h3>
          <Image
            src="https://picsum.photos/seed/fill/600/600"
            alt="Object-fit: fill"
            width={200}
            height={150}
            objectFit="fill"
            variant="bordered"
          />
        </div>
        <div className="w-48">
          <h3 className="mb-2 text-lg font-medium">None</h3>
          <Image
            src="https://picsum.photos/seed/none/600/600"
            alt="Object-fit: none"
            width={200}
            height={150}
            objectFit="none"
            variant="bordered"
          />
        </div>
      </div>
    </div>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-lg font-medium">Default Fallback</h3>
        <Image
          // Invalid URL to trigger error
          src="https://invalid-image-url.xyz/nonexistent.jpg"
          alt="Image with default fallback"
          width={300}
          height={200}
          variant="rounded"
        />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-medium">Custom Fallback</h3>
        <Image
          // Invalid URL to trigger error
          src="https://invalid-image-url.xyz/nonexistent.jpg"
          alt="Image with custom fallback"
          width={300}
          height={200}
          variant="rounded"
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-alert-error-bg/20 p-4 text-alert-error-text">
              <ImageOff className="h-8 w-8" />
              <p className="text-sm font-medium">Failed to load image</p>
            </div>
          }
        />
      </div>
    </div>
  ),
}

export const WithBlurPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/seed/blur/800/600',
    alt: 'An image with blur placeholder',
    width: 400,
    height: 300,
    blurDataURL: mockBlurData.landscape,
  },
}

export const WithoutBlurPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/seed/noblur/800/600',
    alt: 'An image without blur placeholder',
    width: 400,
    height: 300,
  },
}

export const ResponsiveUsage: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <div className="mb-6 rounded-md bg-secondary p-4">
        <h2 className="mb-2 text-xl font-bold">Responsive Hero Image</h2>
        <Image
          src="https://picsum.photos/seed/hero/1200/600"
          alt="Hero banner image"
          ratio="21:9"
          variant="rounded"
          priority
          className="w-full"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="overflow-hidden rounded-md border border-border">
            <Image
              src={`https://picsum.photos/seed/card${id}/600/400`}
              alt={`Card image ${id}`}
              ratio="4:3"
              className="w-full transition-transform duration-300 hover:scale-105"
            />
            <div className="p-3">
              <h3 className="text-lg font-medium">Card Title {id}</h3>
              <p className="text-sm text-muted-foreground">Card description text</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Image
          src="https://picsum.photos/seed/sidebar/400/800"
          alt="Sidebar image"
          ratio="2:3"
          variant="rounded"
          className="w-full md:w-1/3"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold">Main Content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Image
              src="https://picsum.photos/seed/thumb1/200/200"
              alt="Thumbnail 1"
              ratio="1:1"
              variant="bordered"
            />
            <Image
              src="https://picsum.photos/seed/thumb2/200/200"
              alt="Thumbnail 2"
              ratio="1:1"
              variant="bordered"
            />
          </div>
          <p>
            Vestibulum commodo. Ut rhoncus gravida arcu. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  ),
}