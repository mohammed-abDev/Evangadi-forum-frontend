import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import style from "./Qcss/QuestionDetail.module.css";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppContext } from "../../context/AppContext";
import PopupSucces from "../../Components/Loader/PopupSucces";
import LikeDislike from "../../Components/Like-DisLike/LikeDisLike";

dayjs.extend(relativeTime);

function QuestionDetail() {
  const { state } = useContext(AppContext);
  const { question_id } = useParams();

  const [questionDet, setQuestionDet] = useState({});
  const [answerData, setAnswerData] = useState([]);
  const [answerText, setAnswerText] = useState({ answer: "" });
  const [postingloading, setPostingloading] = useState(false);
  const [successPost, setSuccessPost] = useState(false);

  // Audio refs
  const successAudio = useRef(new Audio("/sound/send-notification.wav"));
  const updateAudio = useRef(new Audio("/sound/edit-send-notification.mp3"));

  const playSuccessSound = () => {
    successAudio.current.volume = 0.5;
    successAudio.current.play().catch(() => {});
  };

  const playSuccessupdateSound = () => {
    updateAudio.current.volume = 1;
    updateAudio.current.play().catch(() => {});
  };

  // Fetch question details
  useEffect(() => {
    const fetchQDetail = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axiosInstance.get(`question/${question_id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setQuestionDet(res.data.question);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQDetail();
  }, [question_id]);

  // Fetch answers
  const fetchQAnswer = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`question/${question_id}/answer`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setAnswerData(res.data.answers || []);
    } catch (error) {
      console.error("Error get Answer", error);
    }
  }, [question_id]);

  useEffect(() => {
    fetchQAnswer();
  }, [question_id, fetchQAnswer]);

  // Answer change handler
  const AnsChngeHandler = (e) => {
    setAnswerText({ ...answerText, [e.target.name]: e.target.value });
  };

  // Submit handler
  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setPostingloading(true);
      await axiosInstance.post(`question/${question_id}/answer`, answerText, {
        headers: { authorization: `Bearer ${token}` },
      });
      setPostingloading(false);
      playSuccessSound();
      setAnswerText({ answer: "" });
      fetchQAnswer();

      setSuccessPost(true);
      setTimeout(() => {
        setSuccessPost(false);
      }, 2000);
    } catch (error) {
      console.error("Error in post answer", error);
      setPostingloading(false);
    }
  };

  // Editing state
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const startEditing = (ansGet) => {
    setEditing(true);
    setEditText(ansGet.answer);
    setEditId(ansGet.answerid);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/question/answer/${editId}`,
        { answer: editText },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      playSuccessupdateSound();
      setEditing(false);
      fetchQAnswer();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Delete state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const askDelete = (answerId) => {
    setDeleteId(answerId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/question/answer/${deleteId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setShowConfirm(false);
      setDeleteId(null);
      fetchQAnswer();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  /* ================= QUESTION EDIT ================= */
  const [qEditing, setQEditing] = useState(false);
  const [qEditText, setQEditText] = useState({
    title: "",
    description: "",
  });

  const startQuestionEdit = () => {
    setQEditing(true);
    setQEditText({
      title: questionDet.title,
      description: questionDet.description,
    });
  };

  const handleQuestionUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(
        `/question/${question_id}`,
        qEditText,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setQuestionDet((prev) => ({ ...prev, ...qEditText }));
      setQEditing(false);
    } catch (err) {
      console.error("Question update failed", err);
    }
  };

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  return (
    <div>
      {successPost && <PopupSucces />}
      <div className={style.qna_page}>
        {/* Question */}
        <div className={style.question_card}>
          <div className={style.userBox}>
            <div className={style.answer_avatar}>
              <img
                    loading="lazy"
                    src={
                      questionDet.avatar
                        ? `${BACKEND_URL}${questionDet.avatar}`
                        : "/img/avator.png"
                    }
                    alt={questionDet.username ? questionDet.username.charAt(0).toUpperCase() : "?"}
                  />
            </div>
             {Number(questionDet.userid) === Number(state.userid) && (
              <div className={`${style.edit_question} ${style.edit_delete}`}
>
                <span onClick={startQuestionEdit}>
                  <EditTwoToneIcon />
                </span>
              </div>
            )}
            <div className={style.userInfo}>
              <small className={style.username}>{questionDet.username}</small>
              <small className={style.user_bio}>{questionDet.bio}</small>
            </div>
          </div>
          <Link to="/home">
            <h3 style={{opacity:"0.7"}}>QUESTION</h3>
          </Link>
          <h2 className={style.question_title}>{`${questionDet?.title} ?`}</h2>
          <p className={style.question_desc}>{questionDet?.description}</p>
          <small className={style.answer_counter}>
            {answerData.length > 0
              ? `${answerData.length} ${
                  answerData.length === 1 ? "Answer" : "Answers"
                } Found`
              : "No Answers"}
          </small>
            
        </div>
        {/* QUESTION EDIT BOX */}
        {qEditing && (
          <div className={style.edit_box}>
            <input
              value={qEditText.title}
              onChange={(e) =>
                setQEditText({ ...qEditText, title: e.target.value })
              }
            />
            <textarea
              value={qEditText.description}
              onChange={(e) =>
                setQEditText({
                  ...qEditText,
                  description: e.target.value,
                })
              }
            />
            <button onClick={handleQuestionUpdate}>Save</button>
            <button onClick={() => setQEditing(false)}>Cancel</button>
          </div>
        )}

        {/* Answers */}
        <div className={style.answers_section}>
          <h3 className={style.answers_title}>
            {answerData.length > 0 ? (
              `Answer${answerData.length > 1 ? "s" : ""} from the Community`
            ) : (
              <div className={style.no_answers}>
                No Answers Yet
                <small className={style.highlight}> be the first one!</small>
              </div>
            )}
          </h3>

          {answerData.map((ansGet) => (
            <div className={style.answer_card} key={ansGet.answerid}>
              <div>
                {dayjs().diff(dayjs(ansGet.created_at), "day") <= 7 ? (
                  <small className={style.new_badge}>New</small>
                ) : null}
              </div>
              <div className={style.avatar_block}>
                <div className={style.answer_avatar}>
                    <img
                        loading="lazy"
                        src={
                          ansGet.avatar
                            ? `${BACKEND_URL}${ansGet.avatar}`
                            : "/img/avator.png"
                        }
                        alt={ansGet.username ? ansGet.username.charAt(0).toUpperCase() : "?"}
                      />
                </div>
                  <small className={style.answer_user}>{ansGet.username}</small>
              </div>

              <div className={style.answer_content}>
                <p className={style.answer_text}>{ansGet.answer}</p>
                <div className={style.answer_meta}>
                  <div className={style.day_and_counter}>
                    <span className={style.answer_time}>
                      <CalendarMonthIcon />
                      {dayjs(ansGet.created_at).fromNow()}
                    </span>
                  </div>
                  <div className={style.Like_disLike}>
                    <LikeDislike
                      answerId={ansGet.answerid}
                      initialLikes={ansGet.likes}
                      initialDislikes={ansGet.dislikes}
                    />
                  </div>
                  {Number(ansGet.userid) === Number(state.userid) && (
                    <div className={style.edit_delete}>
                      <span onClick={() => startEditing(ansGet)}>
                        <EditTwoToneIcon />
                      </span>
                      <span onClick={() => askDelete(ansGet.answerid)}>
                        <DeleteOutlineTwoToneIcon />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete PopUp */}
        {showConfirm && (
          <div className={style.confirmOverlay}>
            <div className={style.confirmBox}>
              <p>Are you sure you want to delete this answer?</p>
              <div className={style.confirmButtons}>
                <button className={style.deleteBtn} onClick={handleDelete}>
                  Delete
                </button>
                <button
                  className={style.cancelBtn}
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Editing box */}
        {editing && (
          <div className={style.edit_box}>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        )}

        {/* Post Answer */}
        <div className={style.answer_box}>
          <h3>Answer The Top Question</h3>
          <Link to={"/home"}>← Back to question page</Link>

          <textarea
            name="answer"
            value={answerText.answer}
            placeholder="Your answer..."
            onChange={AnsChngeHandler}
            className={style.answer_textarea}
          />

          <button className={style.answer_btn} onClick={submitHandler}>
            {postingloading ? "Posting..." : "Post Your Answer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
