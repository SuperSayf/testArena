import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function CustomDataGrid({ rows, columns }) {
  return (
    <Box sx={{ height: "100%", width: '100%' }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
