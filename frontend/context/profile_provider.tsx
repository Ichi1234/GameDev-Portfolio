"use client";

import React, { useEffect, useState } from "react";
import { ProfileContext } from "./profile_context";
import { OwnerProfile } from "@/types/owner_profile";
import { CoreSkills } from "@/types/core_skill";
import { Focuses } from "@/types/focus";

type Props = {
  children: React.ReactNode;
};

export default function ProfileProvider({ children }: Props) {
  const emptyProfile: OwnerProfile = {
    portfolio_title: "",
    main_quote: "",
    sub_quote: "",
    introduction: "",
    github_link: "",
    current_focus: [],
    core_skills: [],
  };

  type BackendSkill = { id?: number; name?: string; description?: string } | string;
  type BackendFocus = { id?: number; name?: string } | string;

  type ProfileResponse = {
    id?: number;
    portfolio_title?: string;
    main_quote?: string;
    sub_quote?: string;
    introduction?: string;
    github_link?: string;
    current_focus?: BackendFocus[];
    core_skills?: BackendSkill[];
  };

  const [profile, setProfile] = useState<OwnerProfile>(emptyProfile);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    const url = `${base.replace(/\/$/, "")}/profiles/`;

    let mounted = true;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json() as Promise<ProfileResponse>;
      })
      .then((data) => {
        if (!mounted) return;

        const mappedCurrentFocus: Focuses[] = Array.isArray(data.current_focus)
          ? data.current_focus.map((f) => {
              if (f && typeof f === "object") {
                const ff = f as { id?: number; name?: string };
                return { id: ff.id ?? 0, name: ff.name ?? "" };
              }
              return { id: 0, name: String(f) };
            })
          : [];

        const mappedCoreSkills: CoreSkills[] = Array.isArray(data.core_skills)
          ? data.core_skills.map((s) => {
              if (s && typeof s === "object") {
                const ss = s as { id?: number; name?: string; description?: string };
                return { id: ss.id ?? 0, name: ss.name ?? "", description: ss.description ?? "" };
              }
              return { id: 0, name: String(s), description: "" };
            })
          : [];

        const mapped: OwnerProfile = {
          portfolio_title: data.portfolio_title ?? "",
          main_quote: data.main_quote ?? "",
          sub_quote: data.sub_quote ?? "",
          introduction: data.introduction ?? "",
          github_link: data.github_link ?? "",
          current_focus: mappedCurrentFocus,
          core_skills: mappedCoreSkills,
        };

        setProfile(mapped);
      })
      .catch((err) => {
        // leave empty profile on error; components can handle empty state
        console.error("Error fetching profile:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}