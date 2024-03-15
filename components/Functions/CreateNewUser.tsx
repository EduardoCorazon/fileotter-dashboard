// @ts-nocheck
"use client";
import {useState} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

export default function CreateNewUser() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [group, setGroup] = useState('');

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:3200/createUser', {
                username: username,
                group: group
            }, {
                withCredentials: true
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Failed to create user.');
            }
        }
    };

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4" style={{marginTop: "10px"}}>
                <Input
                    type="text"
                    label="Username"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="text"
                    label="Group"
                    placeholder="Assign the new user a group"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                />
            </div>
            <div style={{marginTop: "20px", height: "100%"}}>
                <Button color={"primary"} onClick={handleCreateUser}>Create User</Button>
                <p style={{marginTop: "10px"}}>{message}</p>
            </div>
        </div>
    );
}

