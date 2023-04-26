import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import './datagridArenaLeaderboard.css'

export default function CustomDataGrid({ rows, noTests, myTeam }) {

    // Sort the rows based on team_score in descending order
    const sortedRows = React.useMemo(() => {
        const sorted = [...rows].sort((a, b) => b.team_score - a.team_score);
        return sorted.map((row, index) => ({ ...row, team_rank: index + 1 }));
    }, [rows]);

    const columns = [
        { field: 'team_rank', headerName: 'Rank', width: 100 },
        { field: 'team_name', headerName: 'Name', width: 200 },
        { field: 'team_location', headerName: 'Location', width: 200,type: "singleSelect", 
        valueOptions: [
            //{ value: 99, label: "Select One" },
            { value: "Free State", label: "Free State" },
            { value: "Limpopo", label: "Limpopo" },
            { value: "Northern Cape", label: "Northern Cape" },
            { value: "Mpumalanga", label: "Mpumalanga" },
            { value: "North West" , label: "North West" },
            { value: "Western Cape", label: "Western Cape" },
            { value: "Eastern Cape", label: "Eastern Cape" },
            { value: "Gauteng", label: "Gauteng" },
            { value: "Kwa-Zulu-Natal", label: "Kwa-Zulu-Natal" }
          ],
          valueFormatter: ({ id: rowId, value, field, api }) => {
            const colDef = api.getColumn(field);
            const option = colDef.valueOptions.find(
              ({ value: optionValue }) => value === optionValue
            );
      
            return option ? option.label : '';;
          },
          editable: false
        },
        // TODO: #3 Figure out how to add no. test case columns dynamically
        ...Array.from({ length: noTests }, (_, i) => ({
            field: `testcase_${i+1}`, headerName: `Test Case ${i+1}`, width: 150
          })),
        { field: 'team_score', headerName: 'Team Score', width: 150 },
    ];

    // Highlight row based on "team_name" field
    const getRowClassName = (params) => {
        return params.row.team_name === myTeam ? 'highlighted-row' : '';
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={sortedRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15,
                        },
                    },
                }}
                pageSizeOptions={[15]}
                getRowClassName={getRowClassName} // Add getRowClassName prop
            />
        </Box>
    );
}