/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import CustomDataGrid from './datagridAdminTeams';
import "@testing-library/jest-dom";

const mockRows = [
    {
      id: 1,
      team_code: 'TC001',
      user_id: '25',
      team_name: 'Team 1',
      team_score: '500',
      competition_name: 'Competition 1'
    },
    {
      id: 2,
      team_code: 'TC002',
      user_id: '14',
      team_name: 'Team 2',
      team_score: '450',
      competition_name: 'Competition 2'
    },
    {
        id: 3,
        team_code: 'TC003',
        user_id: '15',
        team_name: 'Team 3',
        team_score: '400',
        competition_name: 'Competition 3'
    }
  ];

describe('CustomDataGrid component', () => {
  test('renders without errors', () => {
    render(<CustomDataGrid rows={mockRows} />);
  });

  test('renders a data grid', () => {
    const { getByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const dataGrid = getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(mockRows.length + 1); // +1 for header row
  });

  test('renders the correct number of columns', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const headerRow = getAllByRole('row')[0];
    const headerCells = headerRow.querySelectorAll('[role="columnheader"]');
    expect(headerCells).toHaveLength(3);
  });
  

});