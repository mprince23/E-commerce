import React, { useEffect, useState } from 'react';
import Api from '../Common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [updateUserDetails, setUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id: "",
    })

    async function fetchAllUser() {
        const fetchData = await fetch(Api.allUsers.url, {
            method: Api.allUsers.method,
            credentials: 'include'
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUser(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    const handleOpenDialog = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='pb-4 bg-white'>
            <table className='userTable w-full bg-white'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.role}</td>
                            <td>{moment(item?.createAt).format("LL")}</td>
                            <td>
                                <button
                                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                    onClick={() => {
                                        handleOpenDialog(item)
                                        setUpdateUserDetails(item)
                                    }}
                                >
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ChangeUserRole
                open={openDialog}
                handleClose={handleCloseDialog}
                user={selectedUser}
                updateUserDetails={updateUserDetails}
                fetchAllUser={fetchAllUser}
            />
        </div>
    );
}

export default AllUsers;