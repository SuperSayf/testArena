import { render, fireEvent} from "@testing-library/react";
import { getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import JoinTeam from "./JoinTeam";
import InputBoxForInfo from "./input-box-for-info";

describe("JoinTeam component", () => {
    it('renders without crashing', () => {
        render(<JoinTeam />);
      });
    
    it('renders the correct title and label', () => {
      const { getByText } = render(<JoinTeam title="My Title" label="My Label" />);
      expect(getByText('My Title')).toBeInTheDocument();
      expect(getByText('My Label')).toBeInTheDocument();
    });

    it('renders the correct title and label', () => {
        const { getByText } = render(<JoinTeam title="My Title" label="My Label" />);
        expect(getByText('My Title')).toBeInTheDocument();
        expect(getByText('My Label')).toBeInTheDocument();
    });

    it("should call onClick function when button is clicked", () => {
        const mockOnClick = jest.fn();
        const { getByTestId } = render(<JoinTeam onClick={mockOnClick} />);
        const button = getByTestId("button");
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should update input value when user types", () => {
        const { getByTestId } = render(<JoinTeam />);
        const input = getByTestId("input");
        input.value= "Test input";
        expect(input.value).toBe("Test input");
    });

});