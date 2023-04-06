import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import About from "./about";

describe("About", () => {
  it("renders the navbar", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const navbar = screen.getByTestId("Header-container");
    expect(navbar).toBeInTheDocument();
  });

  it("renders the home link", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("renders the competitions link", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const competitionsLink = screen.getByRole("link", {
      name: /competitions/i,
    });
    expect(competitionsLink).toBeInTheDocument();
    expect(competitionsLink.getAttribute("href")).toBe("/competitions");
  });

  it("renders the contact link", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const contactLink = screen.getByRole("link", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute("href")).toBe("/contact");
  });

  it("renders the correct links", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const homeLink = screen.getByText(/home/i);
    const competitionsLink = screen.getByText(/competitions/i);
    const contactLink = screen.getByText(/contact/i);
    const aboutLink = screen.getByText(/about/i);
    const playerPortalLink = screen.getByText(/player portal/i);
    expect(homeLink).toBeInTheDocument();
    expect(competitionsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(playerPortalLink).toBeInTheDocument();
  });

  it("renders the correct CTA button", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const ctaButton = screen.getByText(/project portal/i);
    expect(ctaButton).toBeInTheDocument();
  });

  it("renders the mobile menu correctly", () => {
    render(
        <BrowserRouter>
          <About />
        </BrowserRouter>
    );
    const mobileMenuButton = screen.getByTestId("MobileMenu-container");
    expect(mobileMenuButton).toBeInTheDocument();
    mobileMenuButton.click();
    const resourcesLink = screen.getByText(/resources/i);
    const inspirationLink = screen.getByText(/inspiration/i);
    const processLink = screen.getByText(/process/i);
    const ourStoryLink = screen.getByText(/our story/i);
    const closeMenuButton = screen.getByTestId("CloseMobileMenu-container");
    expect(resourcesLink).toBeInTheDocument();
    expect(inspirationLink).toBeInTheDocument();
    expect(processLink).toBeInTheDocument();
    expect(ourStoryLink).toBeInTheDocument();
    expect(closeMenuButton).toBeInTheDocument();
  });
});