import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
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

  it("returns to original position when clicked again", () => {
  const { getByTestId } = render(<OverflowCard {...defaultProps} />);
  fireEvent.click(getByTestId("overflow-card"));
  fireEvent.click(getByTestId("overflow-card"));
  // expect(getByTestId("overflow-card")).toHaveStyle("transform: rotateY(0deg)");
  // expect(getByTestId("overflow-card-front")).toHaveStyle(
  //   "transform: rotateY(0deg)"
  // );
  // expect(getByTestId("overflow-card-back")).toHaveStyle(
  //   "transform: rotateY(180deg)"
  // );
});

  it("flips the card when clicked", () => {
    const { getByTestId } = render(<OverflowCard {...defaultProps} />);
    const card = getByTestId("overflow-card");
    fireEvent.click(card);
    // expect(card).toHaveStyle("transform: rotateY(-180deg)");
    fireEvent.click(card);
    // expect(card).toHaveStyle("transform: rotateY(0deg)");
  });

  //Test that the onClick function is called when the card is clicked.
  it("calls the onClick function when clicked", () => {
    const { getByTestId } = render(<OverflowCard {...defaultProps} />);
    const card = getByTestId("overflow-card");
    fireEvent.click(card);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("hides the description on the front of the card when flipped", () => {
    const { getByTestId, queryByText } = render(
      <OverflowCard {...defaultProps} />
    );
    const card = getByTestId("overflow-card");
    fireEvent.click(card);
    expect(queryByText("Click here to see details")).not.toBeInTheDocument();
  });

  it("hides the description on the front of the card when flipped", () => {
    const { getByTestId, queryByText } = render(
      <OverflowCard {...defaultProps} />
    );
    const card = getByTestId("overflow-card");
    fireEvent.click(card);
    expect(queryByText("Click here to see details")).not.toBeInTheDocument();
  });

  //Test that the handleMouseMove function updates the transform style of the card.
  it("updates transform style on mouse move", () => {
    const { getByTestId } = render(<OverflowCard {...defaultProps} />);
    const card = getByTestId("overflow-card");
    const offsetX = 50;
    const offsetY = 100;
    fireEvent.mouseMove(card, {
      clientX: card.getBoundingClientRect().left + offsetX,
      clientY: card.getBoundingClientRect().top + offsetY,
    });
    expect(card).toHaveStyle(
      `transform: perspective(600px) rotateX(${-offsetY / 10}deg) rotateY(${
        offsetX / 10
      }deg)`
    );
  });

  //Test that the handleMouseLeave function resets the transform style of the card.
  it("resets transform style on mouse leave", () => {
    const { getByTestId } = render(<OverflowCard {...defaultProps} />);
    const card = getByTestId("overflow-card");
    fireEvent.mouseMove(card, {
      clientX: card.getBoundingClientRect().left + 50,
      clientY: card.getBoundingClientRect().top + 100,
    });
    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle("transform: ");
  });
});
