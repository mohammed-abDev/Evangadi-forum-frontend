import { useEffect, useState } from "react";

export default function useTyping(text, speed = 15) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!text) return;
    
        let i = 0;
        setDisplayed("");
    
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
    
        return () => clearInterval(interval);
    }, [text]);

    return displayed;
}
