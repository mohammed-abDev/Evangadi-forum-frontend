import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`, 
    // withCredentials: true,
    
})

// Attach JWT automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // login token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//chat bot api
export const sendToBot = async (prompt) => {
  try {
    const response = await axiosInstance.post("/chat", {
      message: prompt,
    });
    return response.data.reply;
  } catch (error) {
    console.error("AI ERROR:", error);
    return "⚠️ Evangadi AI is busy. Please try again.";
  }
};


export default axiosInstance;