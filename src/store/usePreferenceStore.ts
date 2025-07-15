import { create } from "zustand";

type Preferences = {
    topics: string[];
    categories: string[];
};

type PreferenceStore = {
    preferences: Preferences;
    hasPreferences: boolean;
    setPreferences: (prefs: Preferences) => void;
    clearPreferences: () => void;
}

export const usePreferenceStore = create<PreferenceStore>((set) => ({
    preferences: { topics:[], categories:[] },
    hasPreferences: false,
    setPreferences: (prefs) => set ({preferences: prefs, hasPreferences: true}),
    clearPreferences: () => set ({preferences: {topics: [], categories: []}, hasPreferences: false}),
}));