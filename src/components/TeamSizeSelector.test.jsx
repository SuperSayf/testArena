import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { TeamSizeSelector } from "./TeamSizeSelector";

test("changes to minimum team size are reflected in the input field", () => {
  render(<TeamSizeSelector />);

  const minInput = screen.getByLabelText("Minimum team size");
  fireEvent.change(minInput, { target: { value: "3" } });

  expect(minInput.value).toBe("3");
  expect(typeof parseInt(minInput.value)).toBe("number");
});

test("changes to maximum team size are reflected in the input field", () => {
  render(<TeamSizeSelector />);

  const maxInput = screen.getByLabelText("Maximum team size");
  fireEvent.change(maxInput, { target: { value: "8" } });

  expect(maxInput.value).toBe("8");
  expect(typeof parseInt(maxInput.value)).toBe("number");
});

test("changes to the number of teams are reflected in the input field", () => {
  render(<TeamSizeSelector />);

  const numTeamsInput = screen.getByLabelText("Max number of teams");
  fireEvent.change(numTeamsInput, { target: { value: "20" } });

  expect(numTeamsInput.value).toBe("20");
  expect(typeof parseInt(numTeamsInput.value)).toBe("number");
});


