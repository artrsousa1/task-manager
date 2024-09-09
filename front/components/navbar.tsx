import React from "react";
import Image from "next/image";
import Logo from "../app/assets/hivee-white.png"
import  Login  from "@/components/login"
import Signin from "@/components/signin";

const Navbar = () => {
    return (
        <header className="backdrop-blur-md px-4 h-14 sticky inset-x-0 top-0 w-full bg-background z-50 border-b border-white border-opacity-10">
            <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl px-4">
                <Image src={Logo} alt="Hivee" width={100} height={100} draggable="false"/>
                <div className="flex gap-4">
                    <Login />
                    <Signin />
                </div>
                
            </div>
        </header>
    );
};

export default Navbar;