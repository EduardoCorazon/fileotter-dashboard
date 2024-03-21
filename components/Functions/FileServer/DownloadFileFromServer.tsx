// @ts-nocheck

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

const DownloadFileFromServer = () => {
    const [filename, setFilename] = useState('');
    const [userGroup, setUserGroup] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserGroup();
    }, []);
    const fetchUserGroup = async () => {
        try {
            const response = await axios.get('http://localhost:3200/sessionInfo', {withCredentials: true});
            setUserGroup(response.data.withinGroup);
        } catch (error) {
            console.error('Error fetching user group:', error);
        }
    };

    const handleDownload = async () => {
        if (!filename) {
            setError('Please enter a filename.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3300/download/${filename}`, {
                params: {
                    userGroup: userGroup
                },
                responseType: 'blob',
                withCredentials: true
            });

            // Create a temp URL and <a> element to trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);

            // Trigger the download and remove the temporary elements
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clear the filename input and error
            setFilename('');
            setError('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error downloading file. Please make sure the filename is correct.');
            }
        }
    };

    return (
        <div style={{marginTop: "10px", height: "100%"}}>
            <Input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Enter filename"
            />
            {error && <p style={{marginTop: "10px"}}>{error}</p>}
            <Button color={"primary"} style={{marginTop: "10px"}} onClick={handleDownload}>Download</Button>
        </div>
    );
};

export default DownloadFileFromServer;