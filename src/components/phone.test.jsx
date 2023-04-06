import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import PropTypes from 'prop-types'
import Phone from './phone'

describe('Phone', () => {
  it('renders without crashing', () => {
    render(<Phone />)
  });

  it('renders the phone icon', () => {
    const { getByTestId } = render(<Phone />)
    const icon = getByTestId('phone-container1')
    expect(icon).toBeInTheDocument()
  });

  it('renders the phone text', () => {
    const text = 'Test Text'
    const { getByText } = render(<Phone text={text} />)
    const phoneText = getByText(text)
    expect(phoneText).toBeInTheDocument()
  });

  it('applies the rootClassName prop correctly', () => {
    const className = 'custom-class'
    const { container } = render(<Phone rootClassName={className} />)
    expect(container.firstChild).toHaveClass(className)
  });

  it('renders with default text if text prop is not provided', () => {
    const { getByText } = render(<Phone />)
    const phoneText = getByText('Text')
    expect(phoneText).toBeInTheDocument()
  });

  it('renders with default rootClassName if rootClassName prop is not provided', () => {
    const { container } = render(<Phone />)
    expect(container.firstChild).not.toHaveClass('custom-class')
  });

  it('handles custom text prop correctly', () => {
    const text = 'Custom Text'
    const { getByText } = render(<Phone text={text} />)
    const phoneText = getByText(text)
    expect(phoneText).toBeInTheDocument()
  });

  it('handles custom rootClassName prop correctly', () => {
    const className = 'custom-class'
    const { container } = render(<Phone rootClassName={className} />)
    expect(container.firstChild).toHaveClass(className)
  });

  afterEach(() => {
    jest.clearAllMocks()
  });
});

Phone.defaultProps = {
  text: 'Text',
  rootClassName: '',
}

Phone.propTypes = {
  text: PropTypes.string,
  rootClassName: PropTypes.string,
}