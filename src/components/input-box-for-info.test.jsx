/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BasicTextFields from "./input-box-for-info";
import "@testing-library/jest-dom";

describe("BasicTextFields component", () => {
  test("renders without errors", () => {
    render(<BasicTextFields />);
  });

  test("renders a single text field", () => {
    const { getByRole } = render(<BasicTextFields />);
    const textField = getByRole("textbox");
    expect(textField).toBeInTheDocument();
  });

  test("renders a text field with the correct label", () => {
    const labelText = "Submit";
    const { getByLabelText } = render(
      <BasicTextFields buttonText={labelText} />
    );
    const textField = getByLabelText(labelText);
    expect(textField).toBeInTheDocument();
  });

  test("renders a text field with the outlined variant", () => {
    const { getByRole } = render(<BasicTextFields />);
    const textField = getByRole("textbox");
    expect(textField).toHaveClass("MuiOutlinedInput-input");
  });

  test("renders a password field when isPassword prop is true", () => {
    const { getByLabelText } = render(
      <BasicTextFields buttonText="Password" isPassword={true} />
    );
    const passwordField = getByLabelText("Password");
    expect(passwordField).toHaveAttribute("type", "password");
  });

  test("calls the onChange prop function when the text field value changes", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <BasicTextFields buttonText="Username" onChange={onChangeMock} />
    );
    const textField = getByRole("textbox");
    fireEvent.change(textField, { target: { value: "test" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  test("does not crash when the onChange prop is not provided", () => {
    const { getByRole } = render(<BasicTextFields />);
    const textField = getByRole("textbox");
    expect(() => fireEvent.change(textField, { target: { value: "test" } })).not.toThrow();
  });

  test("does not crash when the buttonText prop is not provided", () => {
    expect(() => render(<BasicTextFields />)).not.toThrow();
  });

  test("does not crash when the isPassword prop is not provided", () => {
    expect(() => render(<BasicTextFields buttonText="Username" />)).not.toThrow();
  });
});