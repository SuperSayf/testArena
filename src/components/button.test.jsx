// Button.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "./button";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders button with or without name text", () => {
  act(() => {
    render(<Button />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Button name="Register" />, container);
  });
  expect(container.textContent).toBe("Register");

  act(() => {
    render(<Button name="Login" />, container);
  });
  expect(container.textContent).toBe("Login");
});