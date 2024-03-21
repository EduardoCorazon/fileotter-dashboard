// @ts-nocheck

"use client";
// Next Ui
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from 'next-themes'
// Components
import {FileServerHomePage} from "@/app/FileServer/FileServerHomePage";
import AuthenticatedRoute from "@/components/Authentication/AuthenticatedRoute";

// Essentially this makes /home a protected route meaning that unauthenticated users will be redirected to /login
const AuthenticatedContent = AuthenticatedRoute(FileServerHomePage);
export default function Home() {
    return (
        <ThemeProvider defaultTheme="system" attribute="class">
            <NextUIProvider>
                <AuthenticatedContent/>
            </NextUIProvider>
        </ThemeProvider>
    )
}
