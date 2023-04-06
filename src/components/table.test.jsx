import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './table';

describe('Table component', () => {
  it('renders without crashing', () => {
    render(<Table />);
  });

  it('has the correct class name', () => {
    const { container } = render(<Table />);
    expect(container.firstChild).toHaveClass('table-container');
  });

  it('contains an unordered list', () => {
    const { getByRole } = render(<Table />);
    expect(getByRole('list')).toBeInTheDocument();
  });

  it('receives and displays props correctly', () => {
    const props = {
      items: ['This', 'Should', 'Update']
    };
    const { getAllByRole } = render(<Table {...props} />);
    const listItems = getAllByRole('listitem');
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(props.items[index]);
    });
  });
});