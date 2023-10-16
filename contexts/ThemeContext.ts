import { Dispatch, SetStateAction, createContext } from "react";
export type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
    setTheme: Dispatch<SetStateAction<string>>;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);