import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Api from '../Common';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ROLE from '../Common/Role';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ open, handleClose, name, role, email, updateUserDetails, fetchAllUser }) => {

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
        '& .MuiPaper-root': {
            width: '450px',
            maxWidth: '450px',
        },
    }));

    const [userRole, setUserRole] = useState(role);

    function handleOnChange(e) {
        setUserRole(e.target.value);
        console.log(e.target.value);
    }

    async function updateUserRole() {
        const fetchResponse = await fetch(Api.updateUser.url, {
            method: Api.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: updateUserDetails._id,
                role: userRole,
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message)
            handleClose()
            fetchAllUser()
        }

        console.log("role update", responseData);
    }

    return (
        <>
            <Box>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Change User Role
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Name : {updateUserDetails.name}
                        </Typography>
                        <Typography gutterBottom>
                            Email : {updateUserDetails.email}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
                            <Typography gutterBottom>
                                Role: {role}
                            </Typography>

                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userRole}
                                        label="Role"
                                        onChange={handleOnChange}
                                        defaultValue={updateUserDetails.role}
                                    >
                                        {Object.values(ROLE).map(item => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Box>
                            <Button autoFocus onClick={updateUserRole} sx={{ backgroundColor: "#DC2626", color: "white", borderRadius: "50px", py: 1, px: 3, ":hover": { backgroundColor: "#B91C1C" } }}>
                                Change Role
                            </Button>
                        </Box>
                    </DialogActions>
                </BootstrapDialog>
            </Box>
        </>
    );
}

export default ChangeUserRole;
