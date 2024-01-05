import { useEffect, useRef } from "react";
import Message from "./Message";

function Chat({ messages }) {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <div className="bg-brand-cream w-64 h-72 flex flex-col overflow-y-auto">
            {messages.map((el, index) => (
                <Message message={el} key={`${index}-whats-app-message`} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Chat;
