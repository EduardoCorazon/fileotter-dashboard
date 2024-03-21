// @ts-nocheck

"use client";
import {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from "@/components/navbar/NavBar";
import {ThemeProvider} from "next-themes";
import {Card, CardBody, NextUIProvider, Spinner} from "@nextui-org/react";
import UploadToFileServer from "@/components/Functions/FileServer/UploadToFileServer";
import ListFilesInGroup from "@/components/Functions/FileServer/ListFilesInGroup";
import DownloadFileFromServer from "@/components/Functions/FileServer/DownloadFileFromServer";

export const FileServerHomePage = () => {
    {
        const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        const [sessionInfo, setSessionInfo] = useState(null);

        useEffect(() => {
            axios.get('http://localhost:3200/sessionInfo', {withCredentials: true})
                .then(response => {
                    setSessionInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching session info:', error);
                });
        }, []);

        return (
            <ThemeProvider defaultTheme={storedTheme || "system"} attribute="class">
                <NextUIProvider>
                    <div>
                        <NavBar/>
                    </div>

                    <div style={{margin: "10px", padding: "10px"}}>
                        <Card style={{margin: "50px"}}>
                            <CardBody>
                                <h1>Your current session information</h1>
                                {sessionInfo ? (
                                    <>
                                        <p>You are currently logged in as: <b> {sessionInfo.username} </b></p>
                                        <p>Within group: <b> {sessionInfo.withinGroup} </b></p>
                                        <p>You own groups:</p>
                                        <b>
                                            <ul>
                                                {sessionInfo.ownedGroups.map(group => (
                                                    <li key={group.name}>{group.name}</li>
                                                ))}
                                            </ul>
                                        </b>
                                    </>
                                ) : (
                                    <Spinner label="loading..." color={"primary"}/>
                                )}
                            </CardBody>
                        </Card>

                        <Card style={{margin: "50px"}}>
                            <CardBody>
                                <h1>Function 3: List all available files in group</h1>
                                <ListFilesInGroup/>
                            </CardBody>
                        </Card>

                        <Card style={{margin: "50px"}}>
                            <CardBody>
                                <h1>Function 4: Upload files to group</h1>
                                <UploadToFileServer/>
                            </CardBody>
                        </Card>

                        <Card style={{margin: "50px"}}>
                            <CardBody>
                                <h1>Function 5: Download files from a group</h1>
                                <DownloadFileFromServer/>
                            </CardBody>
                        </Card>

                    </div>
                </NextUIProvider>
            </ThemeProvider>

        );
    }
}

