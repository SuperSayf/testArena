import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultilineTextFields from './input-textarea';

describe("InputTextArea component", () => {
    test('renders the component with the correct label', () => {
        const { getByLabelText } = render(<MultilineTextFields label="Test Label" />);
        expect(getByLabelText('Test Label')).toBeInTheDocument();
    });

    test('calls the onChange function when text is inputted', () => {
        const onChange = jest.fn();
        const { getByLabelText } = render(<MultilineTextFields label="Test Label" onChange={onChange} />);
        const inputElement = getByLabelText('Test Label');
        fireEvent.change(inputElement, { target: { value: 'Test Input' } });
        expect(onChange).toHaveBeenCalled();
        expect(inputElement.value).toBe('Test Input');
    });

    test('limits the width of the input field', () => {
        const { getByLabelText } = render(<MultilineTextFields label="Test Label" />);
        const inputElement = getByLabelText('Test Label');
        expect(inputElement).toHaveStyle('width: 100%');
    });
});
