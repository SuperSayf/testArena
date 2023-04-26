import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { AdminTeams } from './admin-teams';
import DataGrid from '../components/datagridAdminTeams';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('AdminTeams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the DataGrid component with correct props', () => {
    const testData = [
      {
        id: 1,
        team_code: 'team1',
        user_id: 'user1',
        team_name: 'Team One',
        team_score: 100,
        competition_name: 'Competition One',
      },
    ];

    render(<DataGrid rows={testData} pageSize={5} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });

  it('calls axios and sets the state correctly', async () => {
    const testData = [
      {
        team_code: 'team1',
        user_id: 'user1',
        team_name: 'Team One',
        team_score: 100,
        competition_name: 'Competition One',
      },
    ];

    axios.get.mockResolvedValue({ data: testData });

    render(
      <BrowserRouter>
        <AdminTeams />
      </BrowserRouter>
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3002/api/get/admin_teams'
    );

    await screen.findByRole('grid');

    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByText('Team One')).toBeInTheDocument();
  });

  it('calls axios with correct URL', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <AdminTeams />
      </BrowserRouter>
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3002/api/get/admin_teams'
    );
  });
});
