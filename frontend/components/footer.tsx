"use client";

import { useProfile } from "@/context/profile_context";

export default function Footer() {
    const profile = useProfile();

    return (
        <footer>
            <hr className="text-[#1f1c19]"/>
            <div className="flex justify-center p-8 text-sm text-textsubcolor">
                <p>© {new Date().getFullYear()} {profile?.portfolio_title}, All rights reserved.</p>
            </div>
        </footer>
    );
}