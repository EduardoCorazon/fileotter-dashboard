// @ts-nocheck

import {useState} from 'react';
import {Button, Input} from "@nextui-org/react";

const UserGroupPage = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const getUserGroup = async () => {
        try {
            const response = await fetch(`http://localhost:3200/getUserGroup/${username}`);
            const data = await response.json();
            if (response.ok) {
                setMessage(data.group ? `User Group: ${data.group}` : 'User is not assigned to any group');
            } else {
                setMessage(data.error || 'Failed to fetch user group');
            }
        } catch (error) {
            console.error('Error fetching user group:', error);
            setMessage('Error fetching user group');
        }
    };

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4" style={{marginTop: "10px"}}>

                <Input
                    style={{marginTop: "10px"}}
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div style={{marginTop: "20px", height: "100%"}}>
                <Button color="primary" onClick={getUserGroup}>Get User Group</Button>
                {message && <p style={{marginTop: "10px"}}>{message}</p>}
            </div>

        </div>
    );
};

export default UserGroupPage;
