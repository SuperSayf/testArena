import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamManager from './team-manager';

describe('TeamManager', () => {
  test('renders TeamManager component with correct props', () => {
    const LonClickMock = jest.fn();
    const DonClickMock = jest.fn();
    const { getByText, getByLabelText, getByDisplayValue } = render(
      <TeamManager
        TeamName="TeamA"
        TeamMember1="Member1"
        TeamMember2="Member2"
        TeamMember3="Member3"
        TeamMember4="Member4"
        LonClick={LonClickMock}
        Ldisabled={false}
        DName="Delete"
        DonClick={DonClickMock}
        Ddisabled={false}
      />
    );

    // const locationSelect = getByTestId('location-select');

    expect(getByText('TeamManager')).toBeInTheDocument();
    expect(getByText('TeamA')).toBeInTheDocument();
    expect(getByText('Member1')).toBeInTheDocument();
    expect(getByText('Member2')).toBeInTheDocument();
    expect(getByText('Member3')).toBeInTheDocument();
    expect(getByText('Member4')).toBeInTheDocument();
    // expect(locationSelect).toBeInTheDocument();
    //expect(getByDisplayValue('')).toBeInTheDocument(); // Location default value
    //expect(getByText('Update Location')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();

    
    // fireEvent.change(locationSelect, { target: { value: 'Gauteng' } });
    // expect(getByDisplayValue('Gauteng')).toBeInTheDocument();
    // fireEvent.click(getByText('Update Location'));
    // expect(LonClickMock).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('Delete'));
    expect(DonClickMock).toHaveBeenCalledTimes(1);
  });

  
});
