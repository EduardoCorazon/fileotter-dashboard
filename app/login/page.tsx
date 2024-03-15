// @ts-nocheck

"use client"

// imports
import React, {useState} from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, NextUIProvider, Snippet} from "@nextui-org/react";
import BackgroundAnimation from "@/app/login/BackgroundAnimation";
import {ThemeProvider} from "next-themes";
import {DarkModeSwitch} from "@/app/login/darkmodeswitch";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {authenticate, logout} from '@/components/Authentication/useClient';

export default function LoginPage() {
    //style
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    // user input
    const [selected, setSelected] = React.useState("login");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //login
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentials = {username, password};
            const response = await authenticate(credentials);
            console.log('Authentication successful:', response);
            window.location.href = '/home';
        } catch (error) {
            setErrorMessage('Authentication failed. Please check your credentials.');
            console.error('Authentication error:', error);
        }
    };

    return (
        <ThemeProvider defaultTheme={storedTheme || "system"} attribute="class">
            <NextUIProvider>
                <BackgroundAnimation/>
                <div className="flex justify-center items-center h-screen">
                    <Card className="max-w-full w-[340px] h-[400px]">
                        <CardBody className="overflow-hidden">
                            <h1 className="text-center mb-4 text-1xl font-bold">FileOtter</h1>
                            <Tabs
                                fullWidth
                                size="md"
                                aria-label="Tabs form"
                                selectedKey={selected}
                                onSelectionChange={setSelected}
                            >
                                <Tab key="login" title="Login">
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <Input
                                            label="Username"
                                            placeholder="Enter your username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}/>
                                        <Input
                                            //type="password"
                                            label="Password"
                                            //variant="bordered"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                            required
                                            endContent={
                                                <button className="focus:outline-none" type="button"
                                                        onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    ) : (
                                                        <EyeFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                            className="max-w-xs"
                                        />
                                        <p className="text-center text-small">
                                            Need to create an account?{" "}
                                            <Link size="sm" onPress={() => setSelected("sign-up")}>
                                                Get Started
                                            </Link>
                                        </p>
                                        <div className="flex gap-2 justify-end">
                                            <Button fullWidth color="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>
                                        <div className="error-message text-red-500">{errorMessage &&
                                            <p>{errorMessage}</p>}</div>
                                    </form>
                                </Tab>


                                <Tab key="sign-up" title="Get Started">
                                    <form className="flex flex-col gap-4 h-[300px]">
                                        <p>Administrator Credentials:</p>
                                        <Snippet>admin | password</Snippet>
                                        <p>Basic User Credentials:</p>
                                        <Snippet>user | password</Snippet>
                                        <p className="text-center text-small">
                                            Already have an account?{" "}
                                            <Link size="sm" onPress={() => setSelected("login")}>
                                                Login
                                            </Link>
                                        </p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div>Theme:</div>
                                            <DarkModeSwitch/>
                                        </div>
                                    </form>
                                </Tab>
                            </Tabs>


                        </CardBody>
                    </Card>
                </div>
            </NextUIProvider>
        </ThemeProvider>
    );
}
