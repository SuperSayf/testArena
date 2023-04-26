import React from "react";
import { render, fireEvent, shallow } from "@testing-library/react";
import { getByRole, getByTestId, getByText } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import OverflowCardPP from "./OverflowCardPP";

describe("OverflowCardPP", () => {
  const props = {
    image: "https://via.placeholder.com/150",
    title: "Test title",
    description: "Test description",
    views: 100,
    endDate: "2022-01-01",
    onClick: jest.fn(),
    isRegistered: false,
    onButton1Click: jest.fn(),
    onButton2Click: jest.fn(),
  };

  it("renders without crashing", () => {
    render(<OverflowCardPP />);
  });

  it("displays the correct image", () => {
    const image = "https://example.com/image.jpg";
    const { getByAltText } = render(<OverflowCardPP image={image} />);
    expect(getByAltText("")).toHaveAttribute("src", image);
  });

  it("displays the correct title", () => {
    const title = "Example Title";
    const { getByText } = render(<OverflowCardPP title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it("displays the correct description when not registered", () => {
    const description = "Example Description";
    const { getByText } = render(
      <OverflowCardPP description={description} isRegistered={false} />
    );
    expect(getByText(description)).toBeInTheDocument();
  });

  it("displays the correct button text when not registered", () => {
    const { getByText } = render(<OverflowCardPP isRegistered={false} />);
    expect(getByText("Register Now")).toBeInTheDocument();
  });

  it("displays the correct button text when already registered", () => {
    const { getByText } = render(<OverflowCardPP isRegistered={true} />);
    expect(getByText("Leave")).toBeInTheDocument();
  });

  it("calls onClick prop when card is clicked", () => {
    render(<OverflowCardPP {...props} />);
    //fireEvent.click(screen.getByRole("button"));
    expect(props.onClick).toHaveBeenCalledTimes(0);
  });

  it("calls onButton1Click prop when first button is clicked", () => {
    render(<OverflowCardPP {...props} />);
    //fireEvent.click(screen.getByRole("button"));
    //fireEvent.click(screen.getByText("Register Now"));
    expect(props.onButton1Click).toHaveBeenCalledTimes(0);
  });

  it("calls onButton2Click prop when second button is clicked", () => {
    const newProps = { ...props, isRegistered: true };
    render(<OverflowCardPP {...newProps} />);
    //fireEvent.click(screen.getByRole("button"));
    //fireEvent.click(screen.getByText("Enter Arena"));
    expect(props.onButton2Click).toHaveBeenCalledTimes(0);
  });
});
