import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance, { sendToBot } from "../Api/axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // USER STATE
  const [state, setState] = useState({
    username: localStorage.getItem("username"),
    userid: localStorage.getItem("userid"),
    avatar: null,
    bio: "",
    email: localStorage.getItem("email"),
  });

  const [token, setToken] = useState(localStorage.getItem("token"));

  // GLOBAL APP LOADING 
  const [appLoading, setAppLoading] = useState(true);

  // Load user on app start or refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) return setAppLoading(false);

        const res = await axiosInstance.get("user/me", {
          headers: { authorization: `Bearer ${token}` },
        });

        setState(res.data);
      } catch (err) {
        console.log("No user logged in");
        localStorage.removeItem("token");
      } finally {
        setAppLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // CHATBOT STATE
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [resultData, setResultData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answerData, setAnswerData] = useState([]);

  // NEW CHAT
  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
    setLoading(false);
  };

  // LOAD OLD PROMPT
  const loadPrompt = (item) => {
    setRecentPrompt(item.prompt);
    setResultData(item.response);
    setShowResult(true);
  };

  // SEND MESSAGE TO BOT
  const onSent = useCallback(async (prompt) => {
  if (!prompt?.trim()) return;

  setLoading(true);
  setRecentPrompt(prompt);
  setShowResult(true);

  try {
    // Send the prompt to the AI backend
    const response = await sendToBot(prompt);

    // Update result data
    setResultData(response);

    // Save the prompt and response in history 
    setPrevPrompt((prev) => [
      ...prev.slice(-50),
      {
        id: Date.now(),
        prompt,
        response,
      },
    ]);

    // Clear input after sending
    setInput("");
  } catch (error) {
    console.error("Error sending prompt:", error);
    setResultData("⚠️ Error: Could not get response. Try again.");
  } finally {
    setLoading(false);
  }
}, []);


  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        token,
        setToken,

        // GLOBAL LOADING
        appLoading,
        setAppLoading,

        // CHATBOT
        loading,
        setLoading,
        showResult,
        setShowResult,
        prevPrompt,
        setPrevPrompt,
        recentPrompt,
        setRecentPrompt,
        resultData,
        setResultData,
        input,
        setInput,
        onSent,
        newChat,
        loadPrompt,
        answerData,
        setAnswerData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
