import React from "react";
import { render, getAllByText } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import '@testing-library/jest-dom';

describe("Home component", () => {
  test("renders without errors", () => {
    render(
        <Router>
          <Home />
        </Router>
      );
  });

  test("contains expected HTML elements and CSS classes", () => {
    const { container } = 
    render(
        <Router>
          <Home />
        </Router>
    );
    expect(container.querySelector(".home-container")).toBeInTheDocument();
    expect(container.querySelector(".home-navbar-container")).toBeInTheDocument();
    expect(container.querySelector(".home-navbar")).toBeInTheDocument();
    expect(container.querySelector(".home-left-side")).toBeInTheDocument();
    expect(container.querySelector(".home-image")).toBeInTheDocument();
    expect(container.querySelector(".home-burger-menu")).toBeInTheDocument();
    expect(container.querySelector(".home-links-container")).toBeInTheDocument();
    expect(container.querySelector(".home-link")).toBeInTheDocument();
    expect(container.querySelector(".home-link1")).toBeInTheDocument();
    expect(container.querySelector(".home-link2")).toBeInTheDocument();
    expect(container.querySelector(".contact-link3")).toBeInTheDocument();
    expect(container.querySelector(".contact-link4")).toBeInTheDocument();
    expect(container.querySelector(".home-right-side")).toBeInTheDocument();
    expect(container.querySelector(".home-cta-btn")).toBeInTheDocument();
    expect(container.querySelector(".home-text1")).toBeInTheDocument();
    expect(container.querySelector(".home-mobile-menu")).toBeInTheDocument();
    expect(container.querySelector(".home-container1")).toBeInTheDocument();
    expect(container.querySelector(".home-image1")).toBeInTheDocument();
    expect(container.querySelector(".home-close-menu")).toBeInTheDocument();
    expect(container.querySelector(".home-icon")).toBeInTheDocument();
    expect(container.querySelector(".home-icon2")).toBeInTheDocument();
  });
});
