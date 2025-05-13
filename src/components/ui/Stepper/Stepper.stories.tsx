import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Stepper, { Step, StepIcon, StepLabel, StepDescription } from './Stepper'
import Button from '@/components/ui/Button/Button'
import { AlertCircle, ArrowRight, Check, Home, PackageOpen, Send, Store, Truck, User } from 'lucide-react'

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      description: 'Current active step (0-based)',
      control: { type: 'number', min: 0 },
      defaultValue: 0,
    },
    orientation: {
      description: 'Stepper orientation',
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    size: {
      description: 'Size of stepper elements',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    states: {
      description: 'Manually define step states',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

// Base story with controls
export const Playground: Story = {
  args: {
    activeStep: 1,
    orientation: 'horizontal',
    size: 'md',
    children: [
      <Step key="1" label="Step 1" description="First step description" />,
      <Step key="2" label="Step 2" description="Second step description" />,
      <Step key="3" label="Step 3" description="Third step description" />,
    ],
  },
}

// Horizontal stepper (default)
export const Horizontal: Story = {
  args: {
    activeStep: 1,
    children: [
      <Step key="1" label="Account" description="Create an account" />,
      <Step key="2" label="Profile" description="Complete your profile" />,
      <Step key="3" label="Confirmation" description="Verify your email" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal orientation with step labels and descriptions.',
      },
    },
  },
}

// Vertical stepper
export const Vertical: Story = {
  args: {
    activeStep: 1,
    orientation: 'vertical',
    children: [
      <Step key="1" label="Account" description="Create an account" />,
      <Step key="2" label="Profile" description="Complete your profile" />,
      <Step key="3" label="Confirmation" description="Verify your email" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation with step labels and descriptions.',
      },
    },
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 font-medium">Small Size</h3>
        <Stepper activeStep={1} size="sm">
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" />
        </Stepper>
      </div>
      
      <div>
        <h3 className="mb-4 font-medium">Medium Size (default)</h3>
        <Stepper activeStep={1} size="md">
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" />
        </Stepper>
      </div>
      
      <div>
        <h3 className="mb-4 font-medium">Large Size</h3>
        <Stepper activeStep={1} size="lg">
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stepper in different sizes: small, medium (default), and large.',
      },
    },
  },
}

// Different states
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 font-medium">Default State Handling</h3>
        <Stepper activeStep={1}>
          <Step label="Complete" />
          <Step label="Active" />
          <Step label="Inactive" />
        </Stepper>
      </div>
      
      <div>
        <h3 className="mb-4 font-medium">Custom States</h3>
        <Stepper states={['complete', 'error', 'active', 'inactive']} activeStep={2}>
          <Step label="Complete" />
          <Step label="Error" description="There was a problem" />
          <Step label="Active" />
          <Step label="Inactive" />
        </Stepper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stepper showcasing different step states: inactive, active, complete, and error.',
      },
    },
  },
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 font-medium">Custom Icons</h3>
        <Stepper activeStep={1}>
          <Step label="Shipping" description="Shipping details">
            <StepIcon icon={<Truck className="w-3/5 h-3/5" />} />
            <div className='ml-3'>
              <StepLabel>Shipping</StepLabel>
              <StepDescription>Shipping details</StepDescription>
            </div>
          </Step>
          <Step label="Payment" description="Payment information">
            <StepIcon icon={<PackageOpen className="w-3/5 h-3/5" />} />
            <div className='ml-3'>
              <StepLabel>Payment</StepLabel>
              <StepDescription>Payment information</StepDescription>
            </div>
          </Step>
          <Step label="Confirm" description="Order confirmation">
            <StepIcon icon={<Send className="w-3/5 h-3/5" />} />
            <div className='ml-3'>
              <StepLabel>Confirm</StepLabel>
              <StepDescription>Order confirmation</StepDescription>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stepper with custom icons instead of numbers.',
      },
    },
  },
}

// Interactive example
const InteractiveDemo = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [errorStep, setErrorStep] = useState<number | null>(null)

  const steps = [
    { label: 'Account', description: 'Create an account', icon: <User className="w-3/5 h-3/5" /> },
    { label: 'Profile', description: 'Complete your profile', icon: <Home className="w-3/5 h-3/5" /> },
    { label: 'Review', description: 'Review your information', icon: <Store className="w-3/5 h-3/5" /> },
    { label: 'Complete', description: 'Submit your application', icon: <Check className="w-3/5 h-3/5" /> },
  ]

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handlePrev = () => setActiveStep((prev) => Math.max(prev - 1, 0))
  const handleError = () => setErrorStep(activeStep)
  const handleReset = () => { setActiveStep(0); setErrorStep(null) }

  const states = steps.map((_, index) => {
    if (index === errorStep) return 'error'
    if (index < activeStep) return 'complete'
    if (index === activeStep) return 'active'
    return 'inactive'
  })

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Stepper activeStep={activeStep} states={states}>
        {steps.map((step, index) => (
          <Step key={index} label={step.label} description={step.description} onClick={() => setActiveStep(index)}>
            <StepIcon icon={step.icon} />
            <div className="ml-3">
              <StepLabel>{step.label}</StepLabel>
              <StepDescription>{step.description}</StepDescription>
              {states[index] === 'error' && (
                <div className="mt-1 text-xs text-stepper-error-text flex items-center">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  <span>Error occurred in this step</span>
                </div>
              )}
            </div>
          </Step>
        ))}
      </Stepper>

      <div className="flex justify-between mt-4">
        <div>
          <Button onClick={handlePrev} disabled={activeStep === 0} variant="tertiary">Back</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleError} variant="tertiary">Simulate Error</Button>
          <Button onClick={handleReset} variant="secondary">Reset</Button>
          <Button onClick={handleNext} disabled={activeStep === steps.length - 1 || errorStep === activeStep}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            {activeStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive stepper with navigable steps, error simulation, and step control buttons.',
      },
    },
  },
}

const CheckoutDemo = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { label: 'Cart', description: 'Review items', icon: <PackageOpen className="w-3/5 h-3/5" /> },
    { label: 'Shipping', description: 'Shipping address', icon: <Truck className="w-3/5 h-3/5" /> },
    { label: 'Payment', description: 'Payment method', icon: <Store className="w-3/5 h-3/5" /> },
    { label: 'Review', description: 'Order summary', icon: <Check className="w-3/5 h-3/5" /> },
  ]

  const stepContent = [
    <div key="cart" className="p-4 border rounded-md mt-6">
      <h3 className="font-medium mb-2">Shopping Cart</h3>
      <div className="flex justify-between py-2 border-b">
        <span>Product 1</span>
        <span>$19.99</span>
      </div>
      <div className="flex justify-between py-2 border-b">
        <span>Product 2</span>
        <span>$29.99</span>
      </div>
      <div className="flex justify-between py-2 font-medium mt-2">
        <span>Total</span>
        <span>$49.98</span>
      </div>
    </div>,

    <div key="shipping" className="p-4 border rounded-md mt-6">
      <h3 className="font-medium mb-4">Shipping Address</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="John" />
        </div>
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="Doe" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm mb-1">Address</label>
          <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="123 Main St" />
        </div>
        <div>
          <label className="block text-sm mb-1">City</label>
          <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="New York" />
        </div>
        <div>
          <label className="block text-sm mb-1">Zip Code</label>
          <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="10001" />
        </div>
      </div>
    </div>,

    <div key="payment" className="p-4 border rounded-md mt-6">
      <h3 className="font-medium mb-4">Payment Method</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <input type="radio" id="card" name="payment" defaultChecked />
          <label htmlFor="card" className="ml-2">Credit Card</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm mb-1">Card Number</label>
            <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="**** **** **** 1234" />
          </div>
          <div>
            <label className="block text-sm mb-1">Expiration</label>
            <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="05/25" />
          </div>
          <div>
            <label className="block text-sm mb-1">CVV</label>
            <input type="text" className="w-full border rounded p-2 text-sm" defaultValue="***" />
          </div>
        </div>
      </div>
    </div>,

    <div key="review" className="p-4 border rounded-md mt-6">
      <h3 className="font-medium mb-4">Order Summary</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Items</h4>
          <div className="flex justify-between py-2 text-sm">
            <span>Product 1</span>
            <span>$19.99</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span>Product 2</span>
            <span>$29.99</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium">Shipping</h4>
          <p className="text-sm">John Doe<br />123 Main St<br />New York, 10001</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Payment</h4>
          <p className="text-sm">Credit Card ending in 1234</p>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>$49.98</span>
          </div>
        </div>
      </div>
    </div>,
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col w-full max-w-3xl">
      <div className="mb-6">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step
              key={index}
              label={step.label}
              description={step.description}
              onClick={() => setActiveStep(index)}
            >
              <StepIcon icon={step.icon} />
              <div className="ml-3">
                <StepLabel>{step.label}</StepLabel>
                <StepDescription>{step.description}</StepDescription>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Current step content */}
      {stepContent[activeStep]}

      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePrev}
          disabled={activeStep === 0}
          variant="tertiary"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

// Story export
export const CheckoutExample: Story = {
  render: () => <CheckoutDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A complete checkout flow example using the Stepper component.',
      },
    },
  },
}


// Mobile responsive stepper
export const MobileResponsive: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Desktop View (Horizontal)</h3>
        <div className="hidden md:block">
          <Stepper activeStep={1}>
            <Step label="Account" description="Create an account" />
            <Step label="Profile" description="Complete your profile" />
            <Step label="Confirm" description="Verify your email" />
          </Stepper>
        </div>
        <div className="block md:hidden">
          <p className="text-sm text-muted-foreground mb-2">Resize window to see desktop version</p>
          <Stepper activeStep={1} orientation="vertical" size="sm">
            <Step label="Account" description="Create an account" />
            <Step label="Profile" description="Complete your profile" />
            <Step label="Confirm" description="Verify your email" />
          </Stepper>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Adaptive Stepper</h3>
        <div className="w-full">
          <Stepper 
            activeStep={1}
            orientation="horizontal"
            className="hidden md:flex"
          >
            <Step label="Step 1" description="First step" />
            <Step label="Step 2" description="Second step" />
            <Step label="Step 3" description="Third step" />
            <Step label="Step 4" description="Fourth step" />
          </Stepper>
          
          <Stepper 
            activeStep={1}
            orientation="vertical"
            size="sm"
            className="flex md:hidden"
          >
            <Step label="Step 1" description="First step" />
            <Step label="Step 2" description="Second step" />
            <Step label="Step 3" description="Third step" />
            <Step label="Step 4" description="Fourth step" />
          </Stepper>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive stepper that switches between horizontal (desktop) and vertical (mobile) orientations.',
      },
    },
  },
}