// @ts-nocheck


import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button} from "@nextui-org/react";

const ListFilesInGroup = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGroupFiles();
    }, []);

    const fetchGroupFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3200/sessionInfo', {withCredentials: true});
            const userGroup = response.data.withinGroup;

            if (!userGroup) {
                setError('User is not assigned to any group');
                return;
            }

            const groupFilesResponse = await axios.get(`http://localhost:3300/ListFiles/${userGroup}`, {withCredentials: true});
            setFiles(groupFilesResponse.data.files);
            setError('');
        } catch (error) {
            setFiles([]);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error fetching files. Please try again.');
            }
        }
    };

    const handleRefresh = () => {
        fetchGroupFiles();
    };

    return (
        <div style={{ height: "100%"}}>
            <h2>Available Files:</h2>
            <p>{error && <p>{error}</p>}</p>
            <ul>
                {files.map((file, index) => (
                    <li key={index}><b>{file}</b></li>
                ))}
            </ul>
            <Button style={{marginTop: "10px"}} color={"primary"} onClick={handleRefresh}>Refresh</Button>
        </div>
    );
};

export default ListFilesInGroup;
