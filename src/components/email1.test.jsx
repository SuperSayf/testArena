import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Email1 from './email1'

describe("Email1 component", () => {
    test('renders without errors', () => {
        render(<Email1 />)
    });

    test('rootClassName is applied to the container div', () => {
        const { getByTestId } = render(<Email1 rootClassName="custom-class" />)
        expect(getByTestId('email1-container')).toHaveClass('custom-class')
    });

    test('text prop is displayed correctly', () => {
        const { getByText } = render(<Email1 text="Test email" />)
        expect(getByText('Test email')).toBeInTheDocument()
    });

    console.error = jest.fn()

    test('prop types are validated correctly', () => {
        render(<Email1 rootClassName={123} text={123} />)
        expect(console.error).toHaveBeenCalledTimes(2)
    });
});