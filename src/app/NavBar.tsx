'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues", label: "Issues" },
    ];
    console.log(currentPath);


    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><FaBug /></Link>
            <ul className="flex space-x-6">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={classNames({
                            "text-zinc-900": href === currentPath,
                            "text-zinc-500": href !== currentPath,
                            "hover:text-zinc-800 transition-colors": true,
                        })

                        }
                    // className={`${href == currentPath ? 'text-zinc-900' : 'text-zinc-500'}hover:text-zinc-800`}
                    >
                        {label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
