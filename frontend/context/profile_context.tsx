"use client";

import { createContext, useContext } from "react";
import { OwnerProfile } from "@/types/owner_profile";

export const ProfileContext = createContext<OwnerProfile | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
};