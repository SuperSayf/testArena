import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import About from "./about";




describe('About', () => {

    it("renders the navbar", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const navbar = screen.getByTestId("Header-container");
    expect(navbar).toBeInTheDocument();
  });

  it('renders the header container with the correct data-testid', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const headerContainer = screen.getByTestId('Header-container');
    expect(headerContainer).toBeInTheDocument();
  });

  it('renders the home link with the correct text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const homeLink = screen.getByTestId(/home/i);
    expect(homeLink).toBeInTheDocument();
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
    const homeLink = screen.getByTestId(/home/i);
    const competitionsLink = screen.getByTestId(/competitions/i);
    const contactLink = screen.getByTestId(/contact/i);
    const aboutLink = screen.getByTestId(/about/i);
    const closeMenuButton = screen.getByTestId("CloseMobileMenu-container");
    expect(homeLink).toBeInTheDocument();
    expect(competitionsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(closeMenuButton).toBeInTheDocument();
  });


  // Add more test cases here
});




// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import About from "./about";

// describe("About", () => {
//   it("renders the navbar", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//     const navbar = screen.getByTestId("Header-container");
//     expect(navbar).toBeInTheDocument();
//   });

//   it("renders the home link", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//     const homeLink = screen.getByRole("link", { name: /home/i });
//     expect(homeLink).toBeInTheDocument();
//     expect(homeLink.getAttribute("href")).toBe("/");
//   });

//   it("renders the competitions link", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//     const competitionsLink = screen.getByRole("link", {
//       name: /competitions/i,
//     });
//     expect(competitionsLink).toBeInTheDocument();
//     expect(competitionsLink.getAttribute("href")).toBe("/competitions");
//   });

//   it("renders the contact link", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//     const contactLink = screen.getByRole("link", { name: /contact/i });
//     expect(contactLink).toBeInTheDocument();
//     expect(contactLink.getAttribute("href")).toBe("/contact");
//   });

//   it("renders the correct links", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//   //   // check if HOME link is in the document and has the correct href
//   // const homeLink = screen.getByText('HOME');
//   // expect(homeLink).toBeInTheDocument();
//   // expect(homeLink.href).toContain('/');

//   // // check if COMPETITIONS link is in the document and has the correct href
//   // const competitionsLink = screen.getByText('COMPETITIONS');
//   // expect(competitionsLink).toBeInTheDocument();
//   // expect(competitionsLink.href).toContain('/competitions');

//   // // check if CONTACT link is in the document and has the correct href
//   // const contactLink = screen.getByText('CONTACT');
//   // expect(contactLink).toBeInTheDocument();
//   // expect(contactLink.href).toContain('/contact');

//   // // check if ABOUT link is in the document and has the correct href
//   // const aboutLink = screen.getByText('ABOUT');
//   // expect(aboutLink).toBeInTheDocument();
//   // expect(aboutLink.href).toContain('/about');
//     // const homeLink = screen.findByText(/home/i);
//     // const competitionsLink = screen.findByText(/competitions/i);
//     // const contactLink = screen.findByText(/contact/i);
//     // const aboutLink = screen.findByText(/about/i);
//     // // const playerPortalLink = screen.getByText(/player portal/i);
//     // expect(homeLink).toBeInTheDocument();
//     // expect(competitionsLink).toBeInTheDocument();
//     // expect(contactLink).toBeInTheDocument();
//     // expect(aboutLink).toBeInTheDocument();
//     // // expect(playerPortalLink).toBeInTheDocument();
//   });

//   it("renders the correct CTA button", () => {
//     render(
//       <BrowserRouter>
//         <About />
//       </BrowserRouter>
//     );
//     const ctaButton = screen.getByText(/project portal/i);
//     expect(ctaButton).toBeInTheDocument();
//   });

//   it("renders the mobile menu correctly", () => {
//     render(
//         <BrowserRouter>
//           <About />
//         </BrowserRouter>
//     );
//     const mobileMenuButton = screen.getByTestId("MobileMenu-container");
//     expect(mobileMenuButton).toBeInTheDocument();
//     mobileMenuButton.click();
//     const homeLink = screen.getByTestId(/home/i);
//     const competitionsLink = screen.getByTestId(/competitions/i);
//     const contactLink = screen.getByTestId(/contact/i);
//     const aboutLink = screen.getByTestId(/about/i);
//     const closeMenuButton = screen.getByTestId("CloseMobileMenu-container");
//     expect(homeLink).toBeInTheDocument();
//     expect(competitionsLink).toBeInTheDocument();
//     expect(contactLink).toBeInTheDocument();
//     expect(aboutLink).toBeInTheDocument();
//     expect(closeMenuButton).toBeInTheDocument();
//   });
// });

