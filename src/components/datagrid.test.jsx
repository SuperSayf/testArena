/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import CustomDataGrid from './datagrid';
import "@testing-library/jest-dom";

const mockRows = [
  { id: 1, name: 'John', age: 28 },
  { id: 2, name: 'Mary', age: 32 },
  { id: 3, name: 'Bob', age: 25 },
];

const mockColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
];

describe('CustomDataGrid component', () => {
  test('renders without errors', () => {
    render(<CustomDataGrid rows={mockRows} columns={mockColumns} />);
  });

  test('renders a data grid', () => {
    const { getByRole } = render(
      <CustomDataGrid rows={mockRows} columns={mockColumns} />
    );
    const dataGrid = getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} columns={mockColumns} />
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(mockRows.length + 1); // +1 for header row
  });

  test('renders the correct number of columns', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} columns={mockColumns} />
    );
    const headerRow = getAllByRole('row')[0];
    const headerCells = headerRow.querySelectorAll('[role="columnheader"]');
    expect(headerCells).toHaveLength(mockColumns.length);
  });
});