// @ts-nocheck

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import {DarkModeSwitch} from "@/app/login/darkmodeswitch";


export default function NavBar() {

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3200/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">FileOtter</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/FileServer">
                        FileServer
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/home" aria-current="page" color="secondary">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/GroupServer">
                        GroupServer
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                            Log Out
                        </DropdownItem>
                        <DropdownItem key="themeSwitch">
                            <DarkModeSwitch/>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
