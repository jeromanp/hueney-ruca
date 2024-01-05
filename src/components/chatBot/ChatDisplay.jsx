import { useState } from "react";
import Chat from "./Chat";
import messageParser from "textProcessor/messageParser";
import sendButton from '../../../public/send-button.svg';
import close from '../../../public/close.svg';

function ChatDisplay({ visible, setExpanded }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            botGen: true,
            content: "Hola, soy el bot de Hueney Ruca, como puedo ayudarte?",
        },
    ]);
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = () => {
        if (input.length < 1) return;
        const response = messageParser(input);
        setMessages([
            ...messages,
            { botGen: false, content: input },
            { botGen: true, content: response },
        ]);
        setInput("");
    };
    const handleKey = (e) => {
        if (e.key === "Enter") {
            const response = messageParser(input);
            setMessages([
                ...messages,
                { botGen: false, content: input },
                { botGen: true, content: response },
            ]);
            setInput("");
        }
    };

    return (
        <div
            className={`bg-brand-light-green absolute -top-96 -right-0 shadow shadow-black rounded-lg overflow-hidden ${visible ? "block" : "hidden"
                }`}
        >
            <div className="flex justify-between">
                <p className="p-2 text-brand-cream">Hueney Ruca</p>
                <img
                    src={close.src}
                    onClick={() => setExpanded(false)}
                    className="w-4 mx-3"
                />
            </div>
            <Chat messages={messages} />
            <div className="w-full h-8 flex flex-nowrap">
                <input
                    type="text"
                    className="text-xs w-full h-full p-3"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    placeholder="Pregúntale a Hueney Ruca"
                />
                <button className="bg-green-500" onClick={handleClick}>
                    <img src={sendButton.src} alt="boton enviar" className="w-4 m-2" />
                </button>
            </div>
        </div>
    );
}

export default ChatDisplay;
