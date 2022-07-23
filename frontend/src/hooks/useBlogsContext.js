
import { useContext } from "react";
import { blogContext } from "../context/BlogContext";

export const useBlogsContext = () => {
    const context = useContext(blogContext);
    if (!context) {
        throw new Error("useBlogsContext must be used within a BlogContextProvider");
    }
    return context;
}