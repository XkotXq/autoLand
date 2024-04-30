"use client"
import {Navbar, NavbarBrand, NavbarContent} from "@nextui-org/navbar";

export default function Navigation() {
    return (
        <Navbar isBlurred>
            <NavbarBrand>
                <p className="text-xl">
                    Autoland
                </p>
            </NavbarBrand>
            <NavbarContent>
                Import samochodów z UE, USA i Japonii
            </NavbarContent>
        </Navbar>
    )
}