// @ts-nocheck

"use client";
import {useState} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

// still need to perform type check lol
interface Member {
    username: string;
}

export default function ListAllGroupUsers() {
    const [group, setGroup] = useState<string>('');
    const [members, setMembers] = useState<Member[]>([]);
    const [message, setMessage] = useState('');

    const handleFetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:3200/groupMembers/${group}`, {
                withCredentials: true // Ensure cookies are sent with the request
            });
            setMembers(response.data.members.map((username: string) => ({username}))); // Convert each string to an object with username property
            setMessage('');
        } catch (error) {
            setMembers([]);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Failed to fetch group members.');
            }
        }
    };

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4" style={{marginTop: "10px"}}>
                <Input
                    type="text"
                    label="Group"
                    placeholder="Fetch Members from Group"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                />
            </div>

            <div style={{marginTop: "20px", height: "100%"}}>
                <Button onClick={handleFetchMembers} color="primary">Fetch Group Members</Button>
                <p style={{marginTop: "10px"}}>{message}</p>
                <p>Group Members: {members.map(member => member.username).join(', ')}</p>
            </div>
        </div>
    );
}
