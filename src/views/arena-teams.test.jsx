// Import the necessary dependencies for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ArenaTeam from './arena-team';

describe('ArenaTeam', () => {
  test('renders the team name', () => {
    // Render the component with sample props and BrowserRouter
    render(
      <BrowserRouter>
        <ArenaTeam
          TeamName="Test Team"
          TeamMember1="John Doe"
          TeamMember2="Jane Doe"
          TeamMember3="Bob Smith"
          TeamMember4="Alice Smith"
          location="Gauteng"
          Ldisabled={false}
          LonClick={() => console.log('Button clicked')}
          DName="Delete this team"
          Ddisabled={false}
          DonClick={() => console.log('Button clicked')}
        />
      </BrowserRouter>
    );

    // Expect the team name to be displayed on the page
    expect(screen.getByText('Team Name')).toBeInTheDocument();
  });
});
