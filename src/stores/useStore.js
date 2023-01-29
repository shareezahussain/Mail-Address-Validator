import React from "react";
import create from "zustand";

export const useCandidateMailingAddressStore = create((set) => ({
  mailingAddresses: null,
  getCandidateMailingAddresses: (data) => {
    set((state) => ({
      mailingAddresses: data
    }));
  }
}));
