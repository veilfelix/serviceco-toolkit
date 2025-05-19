import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Current value of the progress bar (0 to max)',
      control: { type: 'number', min: 0, max: 100 },
      defaultValue: 50,
    },
    max: {
      description: 'Maximum value',
      control: { type: 'number', min: 1 },
      defaultValue: 100,
    },
    label: {
      description: 'Label to display above the progress bar',
      control: 'text',
    },
    showValueLabel: {
      description: 'Whether to show percentage text beside label',
      control: 'boolean',
      defaultValue: false,
    },
    valueFormatter: {
      description: 'Value label format function',
    },
    indeterminate: {
      description: 'Indeterminate loading state (shows animation instead of progress)',
      control: 'boolean',
      defaultValue: false,
    },
    color: {
      description: 'Color variant of the progress bar',
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      defaultValue: 'primary',
    },
    size: {
      description: 'Size of the progress bar',
      control: 'select',
      options: ['sm', 'default', 'lg'],
      defaultValue: 'default',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

// Base story with controls
export const Playground: Story = {
  args: {
    value: 50,
    max: 100,
    label: 'Progress',
    showValueLabel: true,
    indeterminate: false,
    color: 'primary',
    size: 'default',
  },
}

// Determinate progress bar
export const Determinate: Story = {
  args: {
    value: 75,
    label: 'Downloading...',
    showValueLabel: true,
  },
}

// Indeterminate progress bar
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
}

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar value={50} size="sm" label="Small" />
      <ProgressBar value={60} size="default" label="Default" />
      <ProgressBar value={70} size="lg" label="Large" />
    </div>
  ),
}

// Color variants
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar value={70} color="primary" label="Primary" />
      <ProgressBar value={70} color="secondary" label="Secondary" />
      <ProgressBar value={70} color="success" label="Success" />
      <ProgressBar value={70} color="warning" label="Warning" />
      <ProgressBar value={70} color="danger" label="Danger" />
    </div>
  ),
}

// With custom value formatter
export const CustomFormatter: Story = {
  args: {
    value: 3,
    max: 10,
    label: 'Steps',
    showValueLabel: true,
    valueFormatter: (value, max) => `${value} of ${max} steps`,
  },
}

// Interactive progress bar (auto-incrementing)
export const Interactive = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 5))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar 
        value={progress} 
        label="Auto-incrementing progress" 
        showValueLabel
      />
    </div>
  )
}

// Multiple progress bars in a stacked view
export const MultipleProgressBars: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar value={25} color="primary" label="Downloads" showValueLabel />
      <ProgressBar value={50} color="secondary" label="Uploads" showValueLabel />
      <ProgressBar value={75} color="success" label="Processing" showValueLabel />
      <ProgressBar indeterminate color="warning" label="Connecting..." />
    </div>
  ),
}

// Usage in a form or dashboard context
export const UsageExample: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-4">System Resources</h3>
      <div className="space-y-4">
        <div>
          <ProgressBar value={65} color="primary" label="CPU Usage" showValueLabel />
        </div>
        <div>
          <ProgressBar value={80} color="warning" label="Memory Usage" showValueLabel />
        </div>
        <div>
          <ProgressBar value={30} color="success" label="Disk Space" showValueLabel />
        </div>
      </div>
    </div>
  ),
}

// Indeterminate colors
export const IndeterminateColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar indeterminate color="primary" label="Primary" />
      <ProgressBar indeterminate color="secondary" label="Secondary" />
      <ProgressBar indeterminate color="success" label="Success" />
      <ProgressBar indeterminate color="warning" label="Warning" />
      <ProgressBar indeterminate color="danger" label="Danger" />
    </div>
  ),
}