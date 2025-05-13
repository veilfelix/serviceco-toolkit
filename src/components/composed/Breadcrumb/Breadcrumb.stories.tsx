import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbEllipsis } from './Breadcrumb'
import { ChevronRight, House } from 'lucide-react'
import Spacer from '@/components/ui/Spacer/Spacer'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Composed/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
      defaultValue: '/',
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator=">">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const IconSeparator: Story = {
  render: () => {
    const IconSeparator = () => (
      <ChevronRight width={16} height={16}/>
    )

    return (
      <Breadcrumb separator={<IconSeparator />}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
      </Breadcrumb>
    )
  },
}

export const WithTruncation: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbEllipsis />
      <BreadcrumbItem href="/products/category">Category</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const WithCustomIcon: Story = {
  render: () => {
    const HomeIcon = () => (
      <House width={16} height={16}/>
    )

    return (
      <Breadcrumb>
        <BreadcrumbItem href="/">
          <span className="flex items-center">
            <HomeIcon/>
            <Spacer orientation='horizontal' size='xs'/>
            Home
          </span>
        </BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
      </Breadcrumb>
    )
  },
}