import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import OverflowCard from "./OverflowCard";

describe("OverflowCard", () => {
  const onClickMock = jest.fn();

  const defaultProps = {
    image: "https://picsum.photos/300",
    title: "Sample title",
    description: "Sample description",
    views: "1000",
    endDate: "2023-12-31",
    onClick: onClickMock,
  };

  it("renders correctly", () => {
    const { getByText } = render(<OverflowCard {...defaultProps} />);
    expect(getByText("Sample title")).toBeInTheDocument();
  });

  it("displays the correct content on the front of the card", () => {
    const { getByText, getByAltText } = render(
      <OverflowCard {...defaultProps} />
    );
    expect(getByText("Sample title")).toBeInTheDocument();
    expect(getByAltText("")).toBeInTheDocument();
    expect(getByText("1000 views")).toBeInTheDocument();
    expect(getByText("2023-12-31")).toBeInTheDocument();
  });
});
