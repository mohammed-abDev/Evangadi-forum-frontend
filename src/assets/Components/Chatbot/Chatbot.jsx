import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import style from "../Chatbot/style/Chatbot.module.css";
import AddIcon from "@mui/icons-material/Add";
import Person2Icon from "@mui/icons-material/Person2";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";
import SendIcon from "@mui/icons-material/Send";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import LoaderForBot from "../Loader/LoaderForBot";
import BotMessage from "./BotMessage";

function Chatbot() {
  const [extended, setExtended] = useState(false);

  const {
    state,
    loading,
    showResult,
    prevPrompt,
    recentPrompt,
    setInput,
    input,
    onSent,
    newChat,
    loadPrompt,
    resultData,
  } = useContext(AppContext);

  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => setInput(e.target.value);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prevPrompt, resultData]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSent(input);
  };

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  return (
    <div className={style.aiLayout}>
      {/* MOBILE MENU ICON */}
      <div className={style.menuIcon2} onClick={() => setExtended(!extended)}>
        {extended ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* SIDEBAR */}
      <div className={`${style.sidebar} ${extended ? style.open : ""}`}>
        <div className={style.topSection}>
          <div className={style.evlogo}>
            <Link to="/Home">
              <img src="/img/favicon.png" alt="evangadi-Logo" />
            </Link>
            {extended ? (
              <KeyboardDoubleArrowLeftIcon
                onClick={() => setExtended(false)}
                className={style.menuIcon}
              />
            ) : (
              <KeyboardDoubleArrowRightIcon
                onClick={() => setExtended(true)}
                className={style.menuIcon}
              />
            )}
          </div>
          {extended && <p className={style.slogan}>Your coding assistant</p>}

          {/* New Chat */}
          <div className={style.newChat} onClick={newChat} id={!extended ? style.circle : ""}>
            <AddIcon style={{ fontSize: 30 }} />
            {extended && <div onClick={newChat}><p>New Chat</p></div>}
          </div>

          {/* History */}
          <div className={style.history}>
            {extended && <small>Your Chats</small>}
            {extended && prevPrompt.map((item) => (
              <p key={item.id} onClick={() => loadPrompt(item)} className={style.historyItem}>
                {item.prompt.slice(0, 20)}...
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={style.bottomIcons}>
          <div className={style.help} id={!extended ? style.circle : ""}>
            <QuestionMarkIcon style={{ fontSize: 20 }} />
            {extended && <p>Help</p>}
          </div>

          <div className={style.settings} id={!extended ? style.circle : ""}>
            <SettingsIcon style={{ fontSize: 20 }} />
            {extended && <p>Settings</p>}
          </div>

          <div className={style.profile} id={!extended ? style.circle : ""}>
            <span>
              <span className={style.answer_avatar}>
                <img
                  width={38}
                  height={38}
                  src={state?.avatar ? `${BACKEND_URL}${state.avatar}` 
                  : "/img/avator.png"}
                  alt="User Avatar"
                />
              </span>
              <div className={style.green_online}></div>
            </span>
            {extended && <p>{state.username.slice(0, 12).toUpperCase()}</p>}
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className={style.aiBody}>
        {!showResult ? (
          <div>
            <h1>Hello, <span>Dev.</span></h1>
            <p className={style.askToask}>👋 How can I help you today?</p>
            <div className={style.cards}>
              <div>Ask about Evangadi Forum</div>
              <div>Learn programming & software concepts</div>
              <div>Debug & improve your code</div>
              <div>Assist in multiple languages(English, Amharic, Oromic)</div>
            </div>
          </div>
        ) : (
          <div className={style.chatMessages}>
            {/* User Message */}
            <div className={style.userMessage}>
              <Person2Icon className={style.avatar} />
              <div className={style.bubbleUser}>
                <p>{recentPrompt}</p>
              </div>
            </div>

            {/* AI Message */}
            <div className={style.aiMessage}>
              <img src="/img/favicon.png" alt="evangadi-logo" className={style.aiAvatar} />

              {loading ? (
                <LoaderForBot />
              ) : (
                <div className={style.bubbleAI}>
                  <BotMessage text={resultData} />
                </div>
              )}
            </div>

            <div ref={messagesEndRef} />
          </div>
        )}
        {/* INPUT BOX */}
        <div className={style.inputBox}>
          <input
            value={input}
            name="text"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Evangadi AI..."
          />
          <button onClick={() => onSent(input)}>
            <SendIcon />
          </button>
        </div>

        {/* Retry for errors */}
        {resultData?.startsWith("⚠️") && (
          <button className={style.retryBtn} onClick={() => onSent(recentPrompt)}>Retry</button>
        )}

        <small className={style.bottomTag}>
          Evangadi AI can make mistakes. Check important info
        </small>
      </div>
    </div>
  );
}

export default Chatbot;
