import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '@/App'

describe('App Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<App />)
    expect(getByText('Hello from Bali')).toBeInTheDocument()
  })

  it('should display the welcome message', () => {
    const { getByText } = render(<App />)
    expect(getByText('Hello from Bali')).toBeVisible()
  })

  it('should render the Tmp component', () => {
    const { getByText } = render(<App />)
    expect(getByText('Hello from Tmp')).toBeInTheDocument()
  })

  it('should apply flexbox centering', () => {
    const { container } = render(<App />)
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('flex', 'items-center', 'justify-center', 'h-screen')
  })
})
