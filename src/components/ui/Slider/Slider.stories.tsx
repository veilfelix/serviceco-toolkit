import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Slider from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Slider>

const PlaygroundDemo = () => {
  const [value, setValue] = useState(50)
  return (
    <Slider
      value={value}
      onChange={setValue}
      label="Slider Playground"
      showTooltip="focus"
      showMinMaxLabels
    />
  )
}
export const Playground: Story = { render: () => <PlaygroundDemo /> }

const SingleValueDemo = () => {
  const [value, setValue] = useState(30)
  return <Slider value={value} onChange={setValue} label="Single Value Slider" showTooltip="focus" />
}
export const SingleValue: Story = { render: () => <SingleValueDemo /> }

const RangeSliderDemo = () => {
  const [range, setRange] = useState<[number, number]>([20, 80])
  return (
    <Slider
      range={range}
      onRangeChange={setRange}
      showTooltip="focus"
      showMinMaxLabels
      label="Range Slider"
    />
  )
}
export const RangeSlider: Story = { render: () => <RangeSliderDemo /> }

const SizesDemo = () => {
  const [sm, setSm] = useState(25)
  const [md, setMd] = useState(50)
  const [lg, setLg] = useState(75)
  return (
    <div className="space-y-6">
      <Slider size="sm" value={sm} onChange={setSm} label="Small" />
      <Slider size="md" value={md} onChange={setMd} label="Medium" />
      <Slider size="lg" value={lg} onChange={setLg} label="Large" />
    </div>
  )
}
export const Sizes: Story = { render: () => <SizesDemo /> }

const VariantsDemo = () => {
  const [def, setDef] = useState(20)
  const [pri, setPri] = useState(50)
  const [sec, setSec] = useState(80)
  return (
    <div className="space-y-6">
      <Slider variant="default" value={def} onChange={setDef} label="Default" />
      <Slider variant="primary" value={pri} onChange={setPri} label="Primary" />
      <Slider variant="secondary" value={sec} onChange={setSec} label="Secondary" />
    </div>
  )
}
export const Variants: Story = { render: () => <VariantsDemo /> }

const WithStepsAndTicksDemo = () => {
  const [value, setValue] = useState(40)
  return (
    <Slider
      value={value}
      onChange={setValue}
      step={10}
      showTicks
      tickCount={11}
      showMinMaxLabels
      label="With Steps and Ticks"
    />
  )
}
export const WithStepsAndTicks: Story = { render: () => <WithStepsAndTicksDemo /> }

const WithTooltipsDemo = () => {
  const [focusVal, setFocusVal] = useState(25)
  const [alwaysVal, setAlwaysVal] = useState(75)
  const [range, setRange] = useState<[number, number]>([20, 80])
  return (
    <div className="space-y-6">
      <Slider value={focusVal} onChange={setFocusVal} showTooltip="focus" label="Tooltip on focus" />
      <Slider value={alwaysVal} onChange={setAlwaysVal} showTooltip="always" label="Always visible" />
      <Slider range={range} onRangeChange={setRange} showTooltip="focus" label="Range with tooltip" />
    </div>
  )
}
export const WithTooltips: Story = { render: () => <WithTooltipsDemo /> }

const WithFormattedValuesDemo = () => {
  const [price, setPrice] = useState(500)
  const [percent, setPercent] = useState(40)
  const [years, setYears] = useState<[number, number]>([1990, 2010])
  return (
    <div className="space-y-6">
      <Slider
        value={price}
        onChange={setPrice}
        min={0}
        max={1000}
        formatValue={(val) => `$${val}`}
        showTooltip="focus"
        label="Price"
      />
      <Slider
        value={percent}
        onChange={setPercent}
        formatValue={(val) => `${val}%`}
        showTooltip="focus"
        label="Percentage"
      />
      <Slider
        range={years}
        onRangeChange={setYears}
        min={1900}
        max={2025}
        step={1}
        formatValue={(val) => `${val}`}
        showTooltip="focus"
        label="Year Range"
      />
    </div>
  )
}
export const WithFormattedValues: Story = { render: () => <WithFormattedValuesDemo /> }

export const Disabled: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider value={50} disabled label="Disabled Slider" />
      <Slider range={[30, 70]} disabled label="Disabled Range" />
    </div>
  )
}
