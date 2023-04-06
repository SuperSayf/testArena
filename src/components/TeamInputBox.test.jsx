import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import TeamInputBox from "./TeamInputBox";
import InputBoxForInfo from "./input-box-for-info";

describe("TeamInputBox component", () => {
    it('renders without crashing', () => {
        render(<TeamInputBox />);
      });
    
    it('renders the correct title and label', () => {
      const { getByText } = render(<TeamInputBox title="My Title" label="My Label" />);
      expect(getByText('My Title')).toBeInTheDocument();
      expect(getByText('My Label')).toBeInTheDocument();
    });

    it('renders the correct title and label', () => {
        const { getByText } = render(<TeamInputBox title="My Title" label="My Label" />);
        expect(getByText('My Title')).toBeInTheDocument();
        expect(getByText('My Label')).toBeInTheDocument();
    });
});
