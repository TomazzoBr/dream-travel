"use client";

import Image from "next/image";
import Button from "../shared-components/button/button";
import React from "react";

interface HeaderProps {
  setIsDialogCreateItemOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsDialogCreateItemOpen }) => {
  return (
    <header className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-lg">
      <div className="flex items-center">
        <div className="bg-white text-black rounded-full flex items-center justify-center w-10 h-10">
          <Image
            src={"/icon.svg"}
            alt={"Logo"}
            className="rounded-lg object-cover"
            width={32}
            height={32}
          />
        </div>
      </div>

      <Button
        text="Create new trip"
        mode="light"
        type="button"
        onClick={() => setIsDialogCreateItemOpen(true)}
      />
    </header>
  );
};

export default Header;
