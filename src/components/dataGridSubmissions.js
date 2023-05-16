import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function CustomDataGrid(props) {
  const { numColumns, testcases, data } = props;

  const columns = [
    {
      field: 'rowNumber',
      headerName: 'Submission Number',
      width: 200,
      valueGetter: (params) => params.row.id,
    },
    ...Array.from({ length: numColumns }, (_, i) => ({
      field: `testcase${i + 1}`,
      headerName: `${testcases[i]}`,
      width: 150,
      editable: true,
    })),
  ];

  const rows = data.map((item, index) => {
    const row = { id: index + 1 };
    for (let i = 0; i < numColumns; i++) {
      const key = `testcase${i + 1}`;
      row[key] = item[i] || null;
    }
    return row;
  });

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
