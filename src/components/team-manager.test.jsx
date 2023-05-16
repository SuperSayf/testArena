import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamManager from './team-manager';
import { mount } from 'enzyme';

describe('TeamManager', () => {
  const teamName = 'Test Team';
  const teamMembers = ['Alice', 'Bob', 'Charlie'];
  const location = 'New York';
  const handleDeleteClick = jest.fn();
  const handleCopyClick = jest.fn();
  
  it('should render the team name and members', () => {
    render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(teamName);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Team Members');
    // expect(screen.getAllByRole('listitem')).toHaveLength(3);
    // expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(teamMembers[0]);
    // expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(teamMembers[1]);
    // expect(screen.getAllByRole('listitem')[2]).toHaveTextContent(teamMembers[2]);
    expect(screen.getByText(`Location: ${location}`)).toBeInTheDocument();
  });

  it('should call the handleDeleteClick function when delete button is clicked', () => {
    render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} DName="Delete" DonClick={handleDeleteClick} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(handleDeleteClick).toHaveBeenCalled();
  });

  it('should call the handleCopyClick function when copy button is clicked', () => {
    render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} onCopyClick={handleCopyClick} />);
    const copyButton = screen.getByRole('button', { name: 'Copy Team Code' });
    fireEvent.click(copyButton);
    expect(handleCopyClick).toHaveBeenCalled();
  });

  it('should disable the delete button if Ddisabled prop is true', () => {
    render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} DName="Delete" DonClick={handleDeleteClick} Ddisabled={true} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeDisabled();
  });
});

