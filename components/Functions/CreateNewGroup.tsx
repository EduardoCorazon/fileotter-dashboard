// @ts-nocheck

"use client";

import {useState} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

export default function CreateNewGroup() {
    const [message, setMessage] = useState('');
    const [group, setGroup] = useState('');

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post('http://localhost:3200/createGroup', {
                groupName: group
            }, {
                withCredentials: true
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Failed to create group.');
            }
        }
    };

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4" style={{marginTop: "10px"}}>
                <Input
                    type="text"
                    label="Group"
                    placeholder="New Group"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                />
            </div>
            <div style={{marginTop: "20px", height: "100%"}}>
                <Button color="primary" onClick={handleCreateGroup}>Create Group</Button>
                <p style={{marginTop: "10px"}}>{message}</p>
            </div>
        </div>
    );
}
