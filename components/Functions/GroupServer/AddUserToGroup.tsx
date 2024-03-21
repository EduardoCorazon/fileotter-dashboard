// @ts-nocheck

"use client";
import {useState} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

export default function AddUserToGroup() {
    const [message, setMessage] = useState('');
    const [groupName, setGroupName] = useState('');
    const [userToAdd, setUserToAdd] = useState('');

    const handleAddUserToGroup = async () => {
        try {
            const response = await axios.post('http://localhost:3200/addGroupMember', {
                groupName: groupName,
                userToAdd: userToAdd
            }, {
                withCredentials: true
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Failed to add user to the group.');
            }
        }
    };

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4" style={{marginTop: "10px"}}>
                <Input
                    type="text"
                    label="Group:"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}/>
                <Input
                    type="text"
                    label="Username"
                    placeholder="User ID to Add"
                    value={userToAdd}
                    onChange={(e) => setUserToAdd(e.target.value)}/>
            </div>

            <div style={{marginTop: "20px", height: "100%"}}>
                <Button color="primary" onClick={handleAddUserToGroup}>Add User to Group</Button>
                <p style={{marginTop: "10px"}}>{message}</p>
            </div>
        </div>
    );
}
