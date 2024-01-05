export default function Message({ message }) {
    const send = `self-start bg-[#ffffff]`;
    const recived = `self-end bg-[#dcf8c8]`;
    return (
        <div
            className={`${
                message.botGen ? send : recived
            } text-xs p-2 m-1 rounded-xl max-w-[180px]`}
        >
            {message.content}
        </div>
    );
}