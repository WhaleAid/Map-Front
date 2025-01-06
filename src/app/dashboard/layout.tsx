"use client";
import React, { Children, useState, use } from "react";
import {
    IconAi,
    IconArrowLeft,
    IconBrandTabler,
    IconMap,
    IconSettings,
    IconUpload,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

export default function DashboardLayout(props: { children: React.ReactNode }) {
    const children = use(props.children);
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Map",
            href: "/dashboard/map",
            icon: (
                <IconMap className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "AI",
            href: "/dashboard/prompt",
            icon: (
                <IconAi className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Upload panels",
            href: "/dashboard/upload",
            icon: (
                <IconUpload className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            )
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        (<div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10 z-50">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <>
                            <Logo />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Walid K",
                                href: "#",
                                icon: (
                                    <Image
                                        src="/assets/imgs/turnadon-logo.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                            className="font-semibold"
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>)
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/assets/imgs/turnadon-logo.png"
                className="h-6 w-6 flex-shrink-0 object-contain"
                width={40}
                height={40}
                alt="Logo"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Turnadon
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm
            zflex-shrink-0" />
        </Link>
    );
};