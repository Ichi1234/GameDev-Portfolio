"use client";

import { useState, useEffect } from "react";
import MainForm from "@/components/admin_form/main_form";
import { useAuth } from "@/context/auth_provider";
import GameForm from "@/components/admin_form/game_form";
import SkillForm from "@/components/admin_form/skill_form";
import FocusForm from "@/components/admin_form/focus_form";
import TagPlatForm from "@/components/admin_form/tag_plat_form";



export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("main");
    const { user } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!user || user.role !== 'developer') {
                window.location.href = '/';
            }
        }
    }, [user]);

    const tabs = [
        { key: "game", label: "Game" },
        { key: "main", label: "Main" },
        { key: "skill", label: "Skill" },
        { key: "focus", label: "Focus" },
        { key:"tag-platform", label: "Tag & Platform" }
    ];

    const renderForm = () => {
        switch (activeTab) {
            case "main":
                return <MainForm />;
            case "game":
                return <GameForm />;
            case "skill":
                return <SkillForm />;
            case "focus":
                return <FocusForm />;
            case "tag-platform":
                return <TagPlatForm/>;
            default:
                return null;
        }
    };

    return (
        <main className="min-h-[75vh] px-8 py-4 bg-adminbackground text-admintext flex flex-col  justify-center  items-center">
            <h1 className="font-title text-2xl text-admintitle font-bold mt-28 mb-8">Admin Page UwU</h1>
            <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-xl p-10">

                {/* Navbar */}
                <nav className="flex justify-center gap-6 mb-10 font-title font-bold text-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`transition cursor-pointer ${
                                activeTab === tab.key
                                    ? "text-admintitle font-bold"
                                    : "text-admintext font-normal"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Dynamic Form */}
                {renderForm()}

            </div>
        </main>
    );
}