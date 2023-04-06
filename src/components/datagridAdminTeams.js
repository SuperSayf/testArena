import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function CustomDataGrid({ rows }) {

    const [clickedRowDelete, setClickedRowDelete] = React.useState();
    const [clickedRowEdit, setClickedRowEdit] = React.useState();

    const onButtonEdit = (e, row) => {
        e.stopPropagation();
        setClickedRowEdit(row);
    };

    const onButtonDelete = (e, row) => {
        e.stopPropagation();
        setClickedRowDelete(row);
    };

    const columns = [
        { field: 'team_code', headerName: 'Team Code', width: 350 },
        { field: 'user_id', headerName: 'User ID', width: 150 },
        { field: 'team_captain', headerName: 'Team Captain', width: 150 },
        { field: 'team_name', headerName: 'Team Name', width: 250 },
        { field: 'team_score', headerName: 'Team Score', width: 150 },
        { field: 'competition_id', headerName: 'Competition ID', width: 150 },
        {
            field: "deleteButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 190,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            onClick={(e) => onButtonEdit(e, params.row)}
                            variant="contained"
                        >
                            Edit
                        </Button>

                        <Button
                            onClick={(e) => onButtonDelete(e, params.row)}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </Box>
                );
            }
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
            />
            Row selected for deletion: {clickedRowDelete ? `${clickedRowDelete.team_code}` : null}
            <br />
            Row selected for edit: {clickedRowEdit ? `${clickedRowEdit.team_code}` : null}
        </Box>
    );
}