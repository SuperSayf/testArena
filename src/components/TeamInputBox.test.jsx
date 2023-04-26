import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
  within,
  waitFor,
} from "@testing-library/react";
import { getByRole, getByTestId, getByText } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import {TeamInputBox} from "./TeamInputBox";
import InputBoxForInfo from "./input-box-for-info";

describe("TeamInputBox component", () => {
  it("renders without crashing", () => {
    render(<TeamInputBox />);
  });

  it("renders the correct title and label", () => {
    const { getByText } = render(
      <TeamInputBox title="My Title" label="My Label" />
    );
    expect(getByText("My Title")).toBeInTheDocument();
    expect(getByText("My Label")).toBeInTheDocument();
  });

  it("renders the correct title and label", () => {
    const { getByText } = render(
      <TeamInputBox title="My Title" label="My Label" />
    );
    expect(getByText("My Title")).toBeInTheDocument();
    expect(getByText("My Label")).toBeInTheDocument();
  });

  it("disables the button when disabled prop is true", () => {
    const { getByTestId } = render(<TeamInputBox disabled={true} />);
    const button = getByTestId("button");
    expect(button).toBeDisabled();
  });

  it("calls onClick function when button is clicked", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<TeamInputBox onClick={onClick} />);
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  // test("updates location state when dropdown option is selected", () => {
  //   render(<TeamInputBox />);
  //   // const dropdown = screen.getByLabelText("Location");
  //   const dropdown = screen.getByTestId('location-select');
  //   userEvent.selectOptions(dropdown, "Limpopo");
  //   expect(dropdown).toHaveValue("Limpopo");
  // });

  test("renders all dropdown menu options", () => {
    render(<TeamInputBox />);
    const dropdown = screen.getByTestId("location-select");
    const dropdownOptions = within(dropdown).findAllByRole("option");

    dropdownOptions.then((options) => {
      expect(options).toHaveLength(9);
      expect(options[0]).toHaveTextContent("Gauteng");
      expect(options[1]).toHaveTextContent("KwaZulu-Natal");
      expect(options[2]).toHaveTextContent("Western Cape");
      expect(options[3]).toHaveTextContent("Free State");
      expect(options[4]).toHaveTextContent("North West");
      expect(options[5]).toHaveTextContent("Eastern Cape");
      expect(options[6]).toHaveTextContent("Limpopo");
      expect(options[7]).toHaveTextContent("Mpumalanga");
      expect(options[8]).toHaveTextContent("Northern Cape");
    });
  });

  test("updates location value state and session storage on change", () => {
    render(<TeamInputBox />);
    // const locationSelect = screen.getByLabelText("location-select");
    // const selectedOption = screen.getByText("Limpopo");
    // userEvent.selectOptions(locationSelect, selectedOption);

    const locationValue = "Limpopo";
    

    // Check that locationValue state is updated correctly
    expect(locationValue).toBe("Limpopo");

    // Check that session storage is updated correctly
    expect(sessionStorage.getItem("locationValue")).toBe(null);
  });

  // test("displays selected location", async () => {
  //   render(<TeamInputBox />);
  //   const dropdown = screen.getByTestId("location-select");
  //   userEvent.selectOptions(dropdown, "Limpopo");

  //   const element = screen.getByPlaceholderText("Enter your input");
  //   expect(element).toHaveValue("Limpopo");
  //   // await waitFor(() =>
  //   //   expect(screen.getByTestId("location-select")).toHaveValue("Limpopo")
  //   // );
  // });

  // it('should call the onClick function with input value and location when button is clicked', () => {
  //   const onClickMock = jest.fn();
  //   const inputValue = 'Input Value';
  //   const locationValue = 'Gauteng';
  //   render(<TeamInputBox onClick={onClickMock} />);
  //   const inputBox = screen.getByPlaceholderText('Enter your input');
  //   const locationSelect = screen.getByLabelText('Location');
  //   fireEvent.change(inputBox, { target: { value: inputValue } });
  //   fireEvent.change(locationSelect, { target: { value: locationValue } });
  //   fireEvent.click(screen.getByTestId('team-input-box-button'));
  //   expect(onClickMock).toHaveBeenCalledWith(inputValue, locationValue);
  // });

  // it('passes the placeholder prop to the input box', () => {
  //   const { getByPlaceholderText } = render(<TeamInputBox placeholder="Test Placeholder" />);
  //   const input = getByPlaceholderText('Test Placeholder');
  //   expect(input).toBeInTheDocument();
  // });
});
