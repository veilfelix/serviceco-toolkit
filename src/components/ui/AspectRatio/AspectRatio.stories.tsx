/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react'
import AspectRatio from './AspectRatio'
import Image from '@/components/ui/Image/Image'
import { Play, Info } from 'lucide-react'
import Spacer from '../Spacer/Spacer'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      description: 'The aspect ratio to maintain (width / height)',
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      defaultValue: 1,
    },
    as: {
      description: 'Render as a different HTML element',
      control: 'select',
      options: ['div', 'section', 'figure', 'article'],
      defaultValue: 'div',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof AspectRatio>

// Helper component for visualizing aspect ratios
const PlaceholderBox = ({ ratio, children }: { ratio: number; children?: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center bg-muted text-center font-medium">
    {children || `${ratio}:1`}
  </div>
)

export const Playground: Story = {
  args: {
    ratio: 16/9,
    children: <PlaceholderBox ratio={16/9} />
  },
  render: (args) => (
    <div className="w-64">
      <AspectRatio {...args} />
    </div>
  ),
}

export const CommonRatios: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="grid grid-cols-3 gap-md">
        <div>
          <h3 className="mb-sm text-lg font-medium">Square (1:1)</h3>
          <div className="w-48">
            <AspectRatio ratio={1}>
              <PlaceholderBox ratio={1} />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Standard (4:3)</h3>
          <div className="w-48">
            <AspectRatio ratio={4/3}>
              <PlaceholderBox ratio={4/3} />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Widescreen (16:9)</h3>
          <div className="w-48">
            <AspectRatio ratio={16/9}>
              <PlaceholderBox ratio={16/9} />
            </AspectRatio>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-md">
        <div>
          <h3 className="mb-sm text-lg font-medium">Ultrawide (21:9)</h3>
          <div className="w-48">
            <AspectRatio ratio={21/9}>
              <PlaceholderBox ratio={21/9} />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Portrait (2:3)</h3>
          <div className="w-48">
            <AspectRatio ratio={2/3}>
              <PlaceholderBox ratio={2/3} />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Landscape (3:2)</h3>
          <div className="w-48">
            <AspectRatio ratio={3/2}>
              <PlaceholderBox ratio={3/2} />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const WithImages: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="grid grid-cols-3 gap-md">
        <div>
          <h3 className="mb-sm text-lg font-medium">Square</h3>
          <div className="w-48">
            <AspectRatio ratio={1}>
              <img 
                src="https://picsum.photos/seed/square/600/600" 
                alt="Square aspect ratio" 
                className="h-full w-full object-cover" 
              />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Standard (4:3)</h3>
          <div className="w-48">
            <AspectRatio ratio={4/3}>
              <img 
                src="https://picsum.photos/seed/standard/800/600" 
                alt="4:3 aspect ratio" 
                className="h-full w-full object-cover" 
              />
            </AspectRatio>
          </div>
        </div>
        
        <div>
          <h3 className="mb-sm text-lg font-medium">Widescreen (16:9)</h3>
          <div className="w-48">
            <AspectRatio ratio={16/9}>
              <img 
                src="https://picsum.photos/seed/widescreen/800/450" 
                alt="16:9 aspect ratio" 
                className="h-full w-full object-cover" 
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const VideoEmbeds: Story = {
  render: () => (
    <div className="flex flex-col gap-lg max-w-xl">
      <div>
        <h3 className="mb-sm text-lg font-medium">YouTube Embed (16:9)</h3>
        <AspectRatio ratio={16/9} className="overflow-hidden rounded-md min-w-96">
          {/* Note: In a real implementation, use proper iframe embeds with title attribute */}
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="text-center">
              <Play className="mx-auto h-12 w-12 text-primary opacity-80" />
              <p className="mt-sm text-white">YouTube video embed (16:9)</p>
              <p className="text-sm text-muted-foreground">Actual iframe omitted for Storybook security</p>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      <div>
        <h3 className="mb-sm text-lg font-medium">Vimeo Embed (16:9)</h3>
        <AspectRatio ratio={16/9} className="overflow-hidden rounded-md min-w-96">
          <div className="flex h-full w-full items-center justify-center bg-[#1ab7ea]">
            <div className="text-center">
              <Play className="mx-auto h-12 w-12 text-white opacity-80" />
              <p className="mt-sm text-white">Vimeo video embed (16:9)</p>
              <p className="text-sm text-white/80">Actual iframe omitted for Storybook security</p>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
}

export const CardLayouts: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-md max-w-3xl">
      {[1, 2, 3].map((id) => (
        <div key={id} className="overflow-hidden rounded-md border border-border">
          <AspectRatio ratio={3/2}>
            <img 
              src={`https://picsum.photos/seed/card${id}/600/400`}
              alt={`Card image ${id}`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </AspectRatio>
          <div className="p-md">
            <h3 className="text-lg font-medium">Card Title {id}</h3>
            <p className="text-sm text-muted-foreground">This card has a 3:2 image aspect ratio</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const WithOverlayContent: Story = {
  render: () => (
    <div className="max-w-sm">
      <AspectRatio ratio={16/9} className="overflow-hidden rounded-md min-w-96">
        <img 
          src="https://picsum.photos/seed/overlay/800/450"
          alt="Image with overlay content"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/80 p-md text-white">
          <h3 className="text-2xl font-bold">Featured</h3>
          <p className="text-center">This example shows content overlaid on top of the background image</p>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Responsive: Story = {
  render: () => (
    <div className="max-w-3xl">
      <p className="mb-sm text-sm text-muted-foreground">
        The aspect ratio container maintains its ratio regardless of width:
      </p>
      <AspectRatio ratio={16/9} className="overflow-hidden rounded-md">
        <img 
          src="https://picsum.photos/seed/responsive/1200/675"
          alt="Responsive image with 16:9 aspect ratio"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-foreground/40 p-sm text-white">
          <p className="font-medium">The aspect ratio is maintained at all viewport sizes</p>
          <p className="text-sm">Try resizing your browser window</p>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const WithFallbackContent: Story = {
  render: () => (
    <div className="max-w-sm">
      <AspectRatio ratio={4/3} className="overflow-hidden rounded-md min-w-96">
        <div className="flex h-full w-full flex-col items-center justify-center gap-md bg-muted p-md text-center">
          <Info className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No image available</p>
            <p className="text-sm text-muted-foreground">This shows how to display fallback content</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const CustomContainer: Story = {
  render: () => (
    <div className="max-w-sm">
      <AspectRatio 
        ratio={1} 
        as="figure" 
        className="overflow-hidden rounded-md border-2 border-primary"
      >
        <img 
          src="https://picsum.photos/seed/figure/600/600"
          alt="Image in a figure container"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <figcaption className="mt-xs text-center text-sm text-muted-foreground">
        This uses the <code>as=&quot;figure&quot;</code> prop to render as a semantic figure element
      </figcaption>
    </div>
  ),
}

export const ImageComponentProps: Story = {
  render: () => (
    <div>
      <div className="max-w-sm">
        <h3 className="mb-sm text-lg font-medium">Standard (4:3)</h3>
        <Image
          src="https://picsum.photos/seed/ourimage/800/450"
          alt="Using Image component inside AspectRatio"
          fill
          objectFit="cover"
          ratio='4:3'
        />
        <p className="mt-xs text-sm text-muted-foreground">
          This example shows using our Image component with built-in use of AspectRatio through props.
        </p>
      </div>
      <Spacer size='lg'/>
      <div className="max-w-sm">
        <h3 className="mb-sm text-lg font-medium">Ultrawide (21:9)</h3>
        <Image
          src="https://picsum.photos/seed/ourimage/800/450"
          alt="Using Image component inside AspectRatio"
          fill
          objectFit="cover"
          ratio='21:9'
        />
        <p className="mt-xs text-sm text-muted-foreground">
          This example shows using our Image component with built-in use of AspectRatio through props.
        </p>
      </div>
    </div>
  ),
}