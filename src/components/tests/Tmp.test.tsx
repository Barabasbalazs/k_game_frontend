import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Tmp from '@/components/Tmp'

describe('Tmp Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<Tmp />)
    expect(getByText('Hello from Tmp')).toBeInTheDocument()
  })

  it('should display the correct text content', () => {
    const { getByText } = render(<Tmp />)
    const element = getByText('Hello from Tmp')
    expect(element).toBeVisible()
  })

  it('should render as a div element', () => {
    const { getByText } = render(<Tmp />)
    const element = getByText('Hello from Tmp')
    expect(element.tagName).toBe('DIV')
  })
})
