import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
import axios from 'axios';
import AdminCompetitions from "./admin-competitions";
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';






jest.mock('axios');

test('fetches data and updates state', async () => {
  const mockData = [
    {
      competition_id: 1,
      competition_name: 'Competition 1',
      competition_views: 100,
      competition_image: 'image1.png',
      competition_leaderboard: 'leaderboard1.png',
      competition_startdate: '2023-04-23',
      competition_enddate: '2023-04-30',
      competition_info: 'Info 1',
      competition_testcases: 5,
    },
    {
      competition_id: 2,
      competition_name: 'Competition 2',
      competition_views: 200,
      competition_image: 'image2.png',
      competition_leaderboard: 'leaderboard2.png',
      competition_startdate: '2023-05-01',
      competition_enddate: '2023-05-07',
      competition_info: 'Info 2',
      competition_testcases: 10,
    },
  ];

  axios.get.mockResolvedValueOnce({ data: mockData });

  let component;

  await act(async () => {
    const { container } = render(
        <Router>
          <AdminCompetitions />
        </Router>
      );
    component = container;
  });

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(component.textContent).toContain('Competition 1');
  expect(component.textContent).toContain('Competition 2');
});


jest.mock("axios");
test('populates table with data', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          competition_id: 1,
          competition_name: 'Competition 1',
          competition_views: 100,
          competition_image: 'image1.png',
          competition_leaderboard: 'leaderboard1.png',
          competition_startdate: '2023-04-23',
          competition_enddate: '2023-04-30',
          competition_info: 'Info 1',
          competition_testcases: 5,
        },
        {
          competition_id: 2,
          competition_name: 'Competition 2',
          competition_views: 200,
          competition_image: 'image2.png',
          competition_leaderboard: 'leaderboard2.png',
          competition_startdate: '2023-05-01',
          competition_enddate: '2023-05-07',
          competition_info: 'Info 2',
          competition_testcases: 10,
        },
      ],
    });
  
    const { getByRole, getAllByRole }  = render(
        <Router>
          <AdminCompetitions />
        </Router>
      );
    const rows = await waitFor(() => getAllByRole('row'));
  
    expect(rows.length).toBe(1); // Including header row
    expect(getByRole('cell', { name: /competition 1/i })).toBeInTheDocument();
    expect(getByRole('cell', { name: /competition 2/i })).toBeInTheDocument();
  });

//   it("should call the API when submitting the form with valid data", async () => {
//     axios.post.mockResolvedValueOnce({ data: {} });

//     const { getByText, getByLabelText } = render(
//         <Router>
//           <AdminCompetitions />
//         </Router>
//       );

//     const createBtn = getByText("Create a Competition");
//     fireEvent.click(createBtn);

//     const compNameInput = getByLabelText("Competition Name");
//     fireEvent.change(compNameInput, { target: { value: "Test Competition" } });

//     const numTestCasesInput = getByLabelText("Number of test cases");
//     fireEvent.change(numTestCasesInput, { target: { value: 5 } });

//     const submitBtn = getByText("Submit");
//     fireEvent.click(submitBtn);

//     await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
//     expect(axios.post).toHaveBeenCalledWith("http://localhost:3002/api/post/Create_comp", {
//       compname: "Test Competition",
//       pic: "",
//       startDate: "",
//       endDate: "",
//       desc: "",
//       pdf: "",
//       testcaseNum: 5,
//     });
//   });
