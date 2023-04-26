import * as React from 'react';
import Box from '@mui/material/Box';
import InputBoxForInfo from "../components/input-box-for-info";
import { DataGrid } from '@mui/x-data-grid';
import Modal from 'react-modal';
import Button from '../components/button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function CustomDataGrid({ rows }) {

    const [clickedRowDelete, setClickedRowDelete] = React.useState();
    const [clickedRowEdit, setClickedRowEdit] = React.useState();
    const [visible, setvisible] = React.useState(false);

    const [rowID, setRowID] = React.useState(null);
    const [teamCode, setTeamCode] = React.useState('');
    const [userID, setUserID] = React.useState('');
    const [teamName, setTeamName] = React.useState('');
    const [teamScore, setTeamScore] = React.useState('');
    const [competitionName, setCompetitionName] = React.useState('');


    const onButtonEdit = (e, row) => {
        e.stopPropagation();
        setClickedRowEdit(row);

        setRowID(row.id);
        setTeamCode(row.team_code);
        setUserID(row.user_id);
        setTeamName(row.team_name);
        setTeamScore(row.team_score);
        setCompetitionName(row.competition_name);

        setvisible(true);
    };

    const onButtonEditSubmit = async (e) => {
        console.log(rowID);
        console.log(teamCode);
        console.log(userID);
        console.log(teamName);
        console.log(teamScore);
        console.log(competitionName);

        try {
            const response = await axios.post('http://localhost:3002/api/post/update/team', {
                team_code: teamCode,
                user_id: userID,
                team_name: teamName,
                team_score: teamScore
            });
            console.log(response.data);

            window.location.reload(false);

            setvisible(false);
        } catch (error) {
            console.error(error);
        }
    };



    const onButtonDelete = async (e, row) => {
        e.stopPropagation();
        setClickedRowDelete(row);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post('http://localhost:3002/api/post/remove/team', {
                    user_id: row.user_id,
                    team_code: row.team_code
                });

                Swal.fire(
                    'Deleted!',
                    'Row has been deleted.',
                    'success'
                ).then(() => {
                    window.location.reload(false);
                });
            }
        })
    };




    const columns = [
        { field: 'team_code', headerName: 'Team Code', width: 350 },
        { field: 'user_id', headerName: 'User ID', width: 100 },
        { field: 'team_name', headerName: 'Team Name', width: 150 },
        { field: 'team_score', headerName: 'Team Score', width: 150 },
        { field: 'competition_name', headerName: 'Competition Name', width: 200 },
        {
            field: "deleteButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            name="Edit"
                            onClick={(e) => onButtonEdit(e, params.row)}
                        >
                            Edit
                        </Button>

                        <Button
                            name="Delete"
                            onClick={(e) => onButtonDelete(e, params.row)}
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

            <Modal isOpen={visible} style={{ content: { width: '70%', height: '70%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, overlay: { zIndex: 1000 } }} >

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%'
                    }}>

                    <h1>Row selected for edit:</h1>

                    <InputBoxForInfo
                        buttonText="Team Code"
                        initialValue={clickedRowEdit ? `${clickedRowEdit.team_code}` : null}
                        onChange={(e) => setTeamCode(e.target.value)}
                    />

                    <InputBoxForInfo
                        buttonText="User ID"
                        initialValue={clickedRowEdit ? `${clickedRowEdit.user_id}` : null}
                        onChange={(e) => setUserID(e.target.value)}
                    />

                    <InputBoxForInfo
                        buttonText="Team Name"
                        initialValue={clickedRowEdit ? `${clickedRowEdit.team_name}` : null}
                        onChange={(e) => setTeamName(e.target.value)}
                    />

                    <InputBoxForInfo
                        buttonText="Team Score"
                        initialValue={clickedRowEdit ? `${clickedRowEdit.team_score}` : null}
                        onChange={(e) => setTeamScore(e.target.value)}
                    />

                    <InputBoxForInfo
                        buttonText="Competition Name"
                        initialValue={clickedRowEdit ? `${clickedRowEdit.competition_name}` : null}
                        onChange={(e) => setCompetitionName(e.target.value)}
                    />

                    <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
                        <Button
                            name="Edit"
                            onClick={(e) => {
                                onButtonEditSubmit(e.target.value);
                                console.log("Edit button clicked");
                            }}
                        />
                    </div>

                    <div style={{ marginLeft: 6, marginBottom: 10 }}>
                        <Button
                            name="Close"
                            onClick={() => {
                                setvisible(false)
                                console.log("Close button clicked");
                            }}
                        />
                    </div>

                </div>

            </Modal>

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

        </Box>
    );
}