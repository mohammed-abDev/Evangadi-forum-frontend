import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Qcss/Home.module.css";
import { FaChevronRight } from "react-icons/fa";
import axiosInstance from "../../Api/axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loader from "../../Components/Loader/Loader";

dayjs.extend(relativeTime);

function Home() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [questionss, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [toloading ,setLoading] =useState(false);


  const toBot = useCallback(() => {
  setLoading(true); 
  setTimeout(() => { 
    navigate("/bot");
    setLoading(false); 
  }, 300); 
}, [navigate]);

  const handleClickQid = useCallback(
  (questionid) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/question/${questionid}`);
      setLoading(false);
    }, 300);
  },
  [navigate]
);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("question?page=1&limit=10", {
          headers: { authorization: `Bearer ${token}` },
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
        setLoading(false);

      }finally{
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axiosInstance.get(`/question/search?q=${query}`);

      if (res.data.length === 0) {
        setNoResults(true);
        setQuestions([]);
      } else {
        setNoResults(false);
        setQuestions(res.data);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setNoResults(true);
      setQuestions([]);
    }
  };

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  return (
    <LayOut>
        {toloading && (
        <div className={style.loader_container}>
            <Loader size="sm"/>
            <p>Loading......</p>
        </div>
    )}
    {!toloading && (
      <div className={style.page}>
        {/* Top bar */}
        <div className={style.topBar}>
          <button className={style.askBtn} onClick={() => navigate("/ask")}>
            Ask Question
          </button>
          <h3 className={style.welcome}>
            Welcome 👋 <span>{state.username}</span>
          </h3>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className={style.search_form}>
          <input
            type="text"
            placeholder="Search questions,html,css,js,react ....."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={!query.trim()}>
            Search
          </button>
        </form>

        {noResults && (
          <p className={style.no_results}>
            😕 No questions found for "<strong>{query}</strong>"
            <br />
            <span>Try again or</span>
            <span
              className={style.try_again}
              onClick={async () => {
                const res = await axiosInstance.get("question/");
                setQuestions(res.data.questions);
                setNoResults(false);
                setQuery("");
              }}
            >
              ← go Back
            </span>
          </p>
        )}

        {/* Questions */}
        <div className={style.list}>
          {questionss.map((q) => (
            <div
              className={style.card}
              key={q.questionid}
              onClick={() => handleClickQid(q.questionid)}
            >
              <div>
                {dayjs().diff(dayjs(q.created_at), "day") <= 7 ? (
                  <small className={style.new_badge}>New</small>
                ) : null}
              </div>

              <div className={style.user}>
                <div className={style.avatar}>
                  <img
                    loading="lazy"
                    src={
                      q.avatar
                        ? `${BACKEND_URL}${q.avatar}`
                        : "/img/avator.png"
                    }
                    alt={q.username ? q.username.charAt(0).toUpperCase() : "?"}
                  />
                </div>
                <p>{q.username}</p>

                <div className={style.question_legend}>
                  <div className={style.question_time}>
                    <CalendarMonthIcon
                      style={{ fontSize: "16px", marginRight: "4px" }}
                    />
                    {dayjs(q.created_at).fromNow()}
                  </div>

                  <div className={style.question_time}>
                    <ChatIcon
                      style={{ fontSize: "16px", marginRight: "4px" }}
                    />
                    {q.answer_count > 0
                      ? `Answers: ${q.answer_count}`
                      : "No Answers"}
                  </div>

                  <div className={style.question_time}>
                    <ThumbUpOutlinedIcon
                      style={{ fontSize: "16px", marginRight: "4px" }}
                    />
                    {q.like_count}
                  </div>

                  <div className={style.question_time}>
                    <ThumbDownOffAltOutlinedIcon
                      style={{ fontSize: "16px", marginRight: "4px" }}
                    />
                    {q.dislike_count}
                  </div>

                  {q.tag ? (
                    <div className={style.question_time}>
                      <LocalOfferIcon
                        style={{ fontSize: "16px", marginRight: "4px" }}
                      />
                      {q.tag}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={style.question}>{q.title}</div>
              <FaChevronRight className={style.arrow} />
            </div>
          ))}
        </div>

        <div className={style.bot} onClick={toBot}>
          🤖
        </div>
      </div>
      )}
    </LayOut>
  );
}

export default Home;
