import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {CalenderComp} from "./CalenderComp";

describe("CalenderComp", () => {
  test("renders input box and calendar element", () => {
    render(<CalenderComp />);
    const inputBox = screen.getByTestId("calendar-input");
    const calendarElement = screen.queryByRole("dialog");

    expect(inputBox).toBeInTheDocument();
    expect(calendarElement).not.toBeInTheDocument();
  });

//   test("opens calendar element when clicking on input box", () => {
//     render(<CalenderComp />);
  
//     const inputBox = screen.getByTestId("calendar-input");
//     fireEvent.click(inputBox);
  
//     const calendarElement = screen.getByRole("calendar-element");
  
//     expect(calendarElement).toBeInTheDocument();
//   });

//   test("closes calendar element when clicking outside", () => {
//     render(<CalenderComp />);

//     const inputBox = screen.getByTestId("calendar-input");
//     fireEvent.click(inputBox);

//     const calendarElement = screen.getByRole("dialog");

//     fireEvent.click(document);

//     expect(calendarElement).not.toBeInTheDocument();
//   });

//   test("selects a date range when clicking on calendar", () => {
//     render(<CalenderComp />);

//     const inputBox = screen.getByTestId("calendar-input");
//     fireEvent.click(inputBox);

//     const calendarElement = screen.getByRole("dialog");
//     const startDate = calendarElement.querySelector(".rdrStartDate");
//     const endDate = calendarElement.querySelector(".rdrEndDate");

//     fireEvent.click(startDate);
//     fireEvent.click(endDate);

//     const selectedDateRange = screen.getByText("to");

//     expect(selectedDateRange).toBeInTheDocument();
//   });

//   test("updates input box value when selecting a date range", () => {
//     render(<CalenderComp />);

//     const inputBox = screen.getByTestId("calendar-input");

//     fireEvent.click(inputBox);

//     //const calendarElement = screen.getByRole("dialog");
//     const calendarElement = container.querySelector(".calendarElement");

//     const startDate = calendarElement.querySelector(".rdrStartDate");
//     const endDate = calendarElement.querySelector(".rdrEndDate");

//     fireEvent.click(startDate);
//     fireEvent.click(endDate);

//     const inputBoxValue = inputBox.value;

//     expect(inputBoxValue).toMatch(/\d{2}-\d{2}-\d{4}\sto\s\d{2}-\d{2}-\d{4}/);
//   });
});

// describe("Calendar Component", () => {
//   test("should display calendar when input box is clicked", () => {
//     render(<CalenderComp />);
//     const inputBox = screen.getByTestId("calendar-input");
//     userEvent.click(inputBox);
//     expect(screen.getByLabelText("Next 2 months")).toBeInTheDocument();
//   });
// });
