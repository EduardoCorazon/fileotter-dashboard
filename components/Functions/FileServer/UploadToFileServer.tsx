// @ts-nocheck

import {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Input} from "@nextui-org/react";

const UploadToFileServer = () => {
    const [file, setFile] = useState(null);
    const [userGroup, setUserGroup] = useState('');

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !userGroup) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('groupName', userGroup);

            const response = await axios.post('http://localhost:3300/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded:', response.data.filename);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div style={{height: "100%"}}>
            <h1>Upload File:</h1>
            <Input style={{marginTop: "10px"}} type="file" onChange={handleFileChange}/>
            <Button style={{marginTop: "20px"}} color={"primary"} onClick={handleUpload}>Upload</Button>
        </div>
    );
};

export default UploadToFileServer;