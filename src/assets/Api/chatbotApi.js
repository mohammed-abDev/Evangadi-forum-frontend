import axiosInstance from "./axios";

export const sendToBot = async (prompt) => {
  try {
    if (!prompt || prompt.trim() === "") {
      return "Please enter a valid question.";
    }

    const response = await axiosInstance.post("/chat", {
      message: prompt,
    });

    return response.data.reply;
  } catch (error) {
    console.error("BOT ERROR:", error);
    return "⚠️ Evangadi AI is busy right now. Please try again.";
  }
};

