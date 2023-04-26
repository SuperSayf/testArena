import axios from 'axios';
import { render, act } from '@testing-library/react';
import { useEffect, useState } from 'react';

jest.mock('axios');

describe('useEffect', () => {
    it('should call axios and set the number of tests', async () => {
        //     axios.get.mockResolvedValue({ data: mockResponse });
        
        //     const mockSetNumTests = jest.fn();
        //     const mockConsoleLog = jest.spyOn(console, 'log');
        
        //     await act(async () => {
        //       render(<MockComponent competition_id={competition_id} user_id={user_id} setNumTests={mockSetNumTests} />);
            });
});
//   const competition_id = 1;
//   const user_id = 2;
//   const mockResponse = [
//     {
//       no_testcases: 3,
//       testcase_prev: '{"testcase_1":"input1", "testcase_2":"input2", "testcase_3":"input3"}',
//     },
//   ];

//   it('should call axios and set the number of tests', async () => {
//     axios.get.mockResolvedValue({ data: mockResponse });

//     const mockSetNumTests = jest.fn();
//     const mockConsoleLog = jest.spyOn(console, 'log');

//     await act(async () => {
//       render(<MockComponent competition_id={competition_id} user_id={user_id} setNumTests={mockSetNumTests} />);
//     });

//     expect(axios.get).toHaveBeenCalledWith(`http://localhost:3002/api/get/numTests/${competition_id}`);
//     expect(mockSetNumTests).toHaveBeenCalledWith(3);
//     expect(mockConsoleLog).toHaveBeenCalledWith('3');
//   });

//   it('should call axios and set the data', async () => {
//     axios.get.mockResolvedValue({ data: mockResponse });

//     const mockSetData = jest.fn();
//     const mockConsoleLog = jest.spyOn(console, 'log');

//     await act(async () => {
//       render(<MockComponent competition_id={competition_id} user_id={user_id} setData={mockSetData} />);
//     });

//     expect(axios.get).toHaveBeenCalledWith(`http://localhost:3002/api/get/testcase_prev/${competition_id}/${user_id}`);
//     expect(mockSetData).toHaveBeenCalledWith([['input1', 'input2', 'input3']]);
//     expect(mockConsoleLog).toHaveBeenCalledWith([['input1', 'input2', 'input3']]);
//   });
// });

// function MockComponent({ competition_id, user_id, setNumTests, setData }) {
//   const [numTests, setNumTestsState] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3002/api/get/numTests/${competition_id}`).then(response => {
//       setNumTestsState(response.data[0].no_testcases);
//       console.log(response.data[0].no_testcases);
//     });
//   }, [competition_id]);

//   useEffect(() => {
//     if (numTests !== null) {
//       axios.get(`http://localhost:3002/api/get/testcase_prev/${competition_id}/${user_id}`).then(response => {
//         const historyJSON = JSON.parse(response.data[0].testcase_prev);
//         const newData = Object.values(historyJSON).map(testcaseObj => {
//           const testcaseData = [];
//           for (let i = 1; i <= numTests; i++) {
//             testcaseData.push(testcaseObj[`testcase_${i}`]);
//           }
//           return testcaseData;
//         });
//         setData(newData);
//         console.log(newData);
//       });
//     }
//   }, [competition_id, user_id, numTests]);

//   useEffect(() => {
//     setNumTests(mockResponse[0].no_testcases);
//   }, [setNumTests]);

//   return null;
// }
