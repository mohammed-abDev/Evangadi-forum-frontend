import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRobot, FaCopy } from "react-icons/fa";
import useTyping from "../Loader/TypingText";
import style from "../Chatbot/style/BotMessage.module.css";

export default function BotMessage({ text }) {
    const typedText = useTyping(text || "", 18);

    const copyCode = (code) => navigator.clipboard.writeText(code);

    return (
    <div className={style.ai_message}>
        <div className={style.circle}>
            <div className={style.circle2}></div>
            <div className={style.circle3}></div>
            <div className={style.circle1}></div>
        </div>

        <div className={style.botHeader}>
            <FaRobot className={style.botIcon} />
            <span>Evangadi Bot</span>
        </div>

        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
            code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                    <div style={{ position: "relative" }}>
                    <SyntaxHighlighter style={oneDark} language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                    <FaCopy
                        className={style.copyIcon}
                        onClick={() => copyCode(String(children))}
                        title="Copy code"
                    />
                    {" Copy code"}
                    </div>
                ) : (
                    <code className={style.inline_code}>{children}</code>
                );
            },
            }}
        >
        {typedText}
        </ReactMarkdown>
    </div>
    );
}  
