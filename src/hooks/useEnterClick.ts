/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useEnterClick = (func: () => void) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            func();
        }
    };
    
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};