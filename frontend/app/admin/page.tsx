"use client";

import { useState } from "react";
import HeroForm from "@/components/admin_form/hero_form";
import GameForm from "@/components/admin_form/game_form";
import AboutForm from "@/components/admin_form/about_form";
import DataForm from "@/components/admin_form/data_form";



export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("hero");

    const tabs = [
        { key: "hero", label: "Hero" },
        { key: "game", label: "Game" },
        { key: "about", label: "About Me" },
        { key: "data", label: "Data Management" },
    ];

    const renderForm = () => {
        switch (activeTab) {
            case "hero":
                return <HeroForm />;
            case "game":
                return <GameForm />;
            case "about":
                return <AboutForm />;
            case "data":
                return <DataForm />;
            default:
                return null;
        }
    };

    return (
        <main className="min-h-[75vh] px-8 py-4 bg-adminbackground text-admintext flex flex-col  justify-center  items-center">
            <h1 className="font-title text-2xl text-admintitle font-bold my-8">Admin Page UwU</h1>
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