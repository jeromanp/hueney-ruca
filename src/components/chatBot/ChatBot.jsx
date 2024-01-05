import { useState } from "react";
import ChatDisplay from "./ChatDisplay";

function ChatBot() {
    const [expanded, setExpanded] = useState(false);

    const handleClick = (e) => {
        if (e.target.id === "whats-app-icon") setExpanded(!expanded);
    };

    return (
        <div className="fixed right-6 bottom-6" onClick={handleClick}>
            <img src="/whatsAppIcon.png" alt="whatsapp" id="whats-app-icon" />
            <ChatDisplay visible={expanded} setExpanded={setExpanded} />
        </div>
    );
}

export default ChatBot;
