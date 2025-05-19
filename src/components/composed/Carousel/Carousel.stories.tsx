import type { Meta, StoryObj } from '@storybook/react'
import Image from '@/components/ui/Image/Image'
import Card from '@/components/ui/Card/Card'
import Badge from '@/components/ui/Badge/Badge'
import Button from '@/components/ui/Button/Button'
import Text from '@/components/ui/Text/Text'
import Carousel from './Carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Composed/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The visual variant of the carousel',
      control: 'select',
      options: ['default', 'banner'],
      defaultValue: 'default',
    },
    showArrows: {
      description: 'Show navigation arrows',
      control: 'boolean',
      defaultValue: true,
    },
    showIndicators: {
      description: 'Show pagination indicators',
      control: 'boolean',
      defaultValue: true,
    },
    autoplay: {
      description: 'Enable autoplay',
      control: 'boolean',
      defaultValue: false,
    },
    autoplayInterval: {
      description: 'Autoplay interval in milliseconds',
      control: 'number',
      defaultValue: 5000,
    },
    pauseOnHover: {
      description: 'Pause autoplay on hover',
      control: 'boolean',
      defaultValue: true,
    },
    pauseOnInvisible: {
      description: 'Pause autoplay when not in viewport',
      control: 'boolean',
      defaultValue: true,
    },
    loop: {
      description: 'Enable infinite looping',
      control: 'boolean',
      defaultValue: true,
    },
    enableSwipe: {
      description: 'Enable touch/mouse swipe',
      control: 'boolean',
      defaultValue: true,
    },
    enableKeyboardNavigation: {
      description: 'Enable keyboard navigation',
      control: 'boolean',
      defaultValue: true,
    },
    children: {
      description: 'Carousel items (usually Carousel.Item components)',
      control: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

// Base story with controls
export const Playground: Story = {
  args: {
    variant: 'default',
    showArrows: true,
    showIndicators: true,
    autoplay: false,
    loop: true,
    enableSwipe: true,
    children: Array(5)
      .fill(0)
      .map((_, i) => (
        <Carousel.Item key={i}>
          <div className="flex h-60 items-center justify-center bg-muted">
            <Text className="text-xl font-bold">Slide {i + 1}</Text>
          </div>
        </Carousel.Item>
      )),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with all props available for adjustment.',
      },
    },
  },
}

// Example carousel with images
export const ImageCarousel: Story = {
  render: () => (
    <Carousel className="max-w-3xl">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Carousel.Item key={i}>
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={`https://picsum.photos/seed/${i + 1}/800/450`}
                alt={`Sample image ${i + 1}`}
                fill
                ratio='16:9'
                className="object-cover"
              />
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel with images, showing how to use it with the Image component.',
      },
    },
  },
}

// Example with autoplay
export const AutoplayCarousel: Story = {
  render: () => (
    <Carousel autoplay autoplayInterval={3000} className="max-w-3xl">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Carousel.Item key={i}>
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={`https://picsum.photos/seed/${i + 10}/800/450`}
                alt={`Sample image ${i + 1}`}
                fill
                ratio='16:9'
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4">
                <Text className="font-semibold">Image {i + 1} - Autoplaying</Text>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with autoplay enabled. The carousel will automatically advance to the next slide every 3 seconds.',
      },
    },
  },
}

// Example with cards
export const CardCarousel: Story = {
  render: () => (
    <Carousel className="max-w-3xl px-4 py-8">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Carousel.Item key={i} className="px-2">
            <Card className="h-full">
              <Card.Header>
                <Card.Title>Card {i + 1}</Card.Title>
                <Card.Description>Description for card {i + 1}</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-40 bg-muted/50 p-4">
                  <Text>Card content goes here</Text>
                </div>
              </Card.Content>
              <Card.Footer className="flex justify-between">
                <Badge variant="outline">Tag</Badge>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </Carousel.Item>
        ))}
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel with Card components, showing how it can be used to create a card carousel.',
      },
    },
  },
}

// Example with full-width banner
export const BannerCarousel: Story = {
  render: () => (
    <Carousel variant="banner" showIndicators={false} className="w-full">
      {[
        {
          bg: 'bg-primary',
          text: 'primary-foreground',
          title: 'First Banner',
          content: 'This is the first banner content with a primary background.',
        },
        {
          bg: 'bg-secondary',
          text: 'secondary-foreground',
          title: 'Second Banner',
          content: 'This is the second banner content with a secondary background.',
        },
        {
          bg: 'bg-muted',
          text: 'foreground',
          title: 'Third Banner',
          content: 'This is the third banner content with a muted background.',
        },
      ].map((banner, i) => (
        <Carousel.Item key={i}>
          <div
            className={`flex h-64 w-full flex-col items-center justify-center ${banner.bg} text-${banner.text} p-md`}
          >
            <Text className="mb-2 text-3xl font-bold">{banner.title}</Text>
            <Text className="text-center text-lg">{banner.content}</Text>
            <Button className="mt-4">Call to Action</Button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Banner carousel with full-width slides, commonly used for hero sections and announcements.',
      },
    },
  },
}

// Example with multiple items visible at once
export const MultiItemCarousel: Story = {
  render: () => {
    const cards = Array.from({ length: 13 }).map((_, i) => (
      <Card key={i} className="h-full">
        <Card.Header>
          <Card.Title>Item {i + 1}</Card.Title>
          <Card.Description>Subtitle {i + 1}</Card.Description>
        </Card.Header>
        <Card.Content className="p-4">
          <Text className="text-sm text-muted-foreground">Content for item {i + 1}</Text>
        </Card.Content>
        <Card.Footer>
          <Button size="sm" variant="secondary">
            Learn More
          </Button>
        </Card.Footer>
      </Card>
    ))

    const slides = []
    const itemsPerSlide = 4
    for (let i = 0; i < cards.length; i += itemsPerSlide) {
      slides.push(cards.slice(i, i + itemsPerSlide))
    }

    return (
      <Carousel className="max-w-6xl" showIndicators={false} showArrows>
        {slides.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {group}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with multiple items per slide. Each slide contains a grid of 4 cards.',
      },
    },
  },
}


// Example with custom render function
export const CustomRenderCarousel: Story = {
  render: () => (
    <Carousel
      className="max-w-3xl"
      renderSlide={(slide, index, isActive) => (
        <div
          key={index}
          className={`min-w-full flex-shrink-0 flex-grow-0 transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-50'
          }`}
          aria-hidden={!isActive}
        >
          <div className="m-2 h-48 rounded-lg bg-muted p-4">
            <Text className="text-xl font-bold">Custom Slide {index + 1}</Text>
            <div className="mt-2">{slide}</div>
          </div>
        </div>
      )}
    >
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Carousel.Item key={i}>
            <Text>This is custom slide content for slide {i + 1}</Text>
          </Carousel.Item>
        ))}
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with custom render function, allowing complete control over how slides are displayed.',
      },
    },
  },
}

// Example with no arrows or indicators (pure swipe)
export const SwipeOnlyCarousel: Story = {
  render: () => (
    <div className="max-w-3xl">
      <Text className="mb-2 text-sm text-muted-foreground">Swipe or use arrow keys to navigate</Text>
      <Carousel showArrows={false} showIndicators={false}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Carousel.Item key={i}>
              <div className="flex h-40 items-center justify-center bg-muted">
                <Text className="text-xl font-bold">Swipe to see slide {i + 2}</Text>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with no visible controls, relying purely on swipe gestures or keyboard navigation.',
      },
    },
  },
}