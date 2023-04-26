import { render, screen } from '@testing-library/react';
import AccordionContent from './collapse';
import '@testing-library/jest-dom';


describe('AccordionContent', () => {
  test('renders with correct title and content', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    render(<AccordionContent title={title} content={content} />);
    const titleElement = screen.getByText(title);
    const contentElement = screen.getByText(content);
    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});