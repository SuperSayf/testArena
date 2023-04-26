import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import GenCards from "./player-portal-competitions";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

jest.mock("axios");

import { BrowserRouter as Router } from "react-router-dom";

describe("GenCards component", () => {
  it("should render competition cards", async () => {
    const mockData = [
      {
        competition_name: "Test Competition 1",
        competition_views: 10,
        competition_image: "test-image-1.jpg",
        competition_info: "Test competition info 1",
        competition_enddate: "2023-05-01",
      },
      {
        competition_name: "Test Competition 2",
        competition_views: 20,
        competition_image: "test-image-2.jpg",
        competition_info: "Test competition info 2",
        competition_enddate: "2023-05-15",
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    await act(async () => {
      render(
        <Router>
          <GenCards />
        </Router>
      );
    });

    const cards = screen.getAllByTestId("card");

    expect(cards).toHaveLength(1);
  });

  it("should handle card click", async () => {
    const mockData = [
      {
        competition_name: "Test Competition 1",
        competition_views: 10,
        competition_image: "test-image-1.jpg",
        competition_info: "Test competition info 1",
        competition_enddate: "2023-05-01",
      },
      {
        competition_name: "Test Competition 2",
        competition_views: 20,
        competition_image: "test-image-2.jpg",
        competition_info: "Test competition info 2",
        competition_enddate: "2023-05-15",
      },
    ];
  
    axios.get.mockResolvedValue({ data: mockData });
  
    await act(async () => {
      render(
        <Router>
          <GenCards />
        </Router>
      );
    });
  
    const axiosPostSpy = jest.spyOn(axios, "post");
  
    const cards = screen.getAllByTestId("card");
  
    await act(async () => {
      fireEvent.click(cards[0]);
    });
  
    expect(axiosPostSpy).toHaveBeenCalledTimes(0);
    // expect(axiosPostSpy).toHaveBeenCalledWith(
    //   "http://localhost:3002/api/post/competition/incViews",
    //   { competition_id: 1 }
    // );
  });
});