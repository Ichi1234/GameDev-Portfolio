"use client";

import React from "react";
import { ProfileContext } from "./profile_context";
import { MockOwnerProfile } from "@/mock/owner_profile";

type Props = {
  children: React.ReactNode;
};

export default function ProfileProvider({ children }: Props) {
  return (
    <ProfileContext.Provider value={MockOwnerProfile}>
      {children}
    </ProfileContext.Provider>
  );
}