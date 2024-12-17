import React from "react";
import logoImage from "@/app/images/logo.png";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75  transition items-center gap-x-2 hidden md:flex ">
        <Image height={30} width={30} alt="taskify logo" src={logoImage.src} />
        <p className="text-lg text-neutral-700 pb-1">Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;
