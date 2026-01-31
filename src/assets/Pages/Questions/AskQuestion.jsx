import React, { useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Qcss/AskQuestion.module.css";
import axiosInstance from "../../Api/axios";

const PopupSucces = lazy(() => import("../../Components/Loader/PopupSucces"));

function AskQuestion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const [errors, setErrors] = useState({});
  const [successPost, setSuccessPost] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const changeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.tag.trim()) newErrors.tag = "Tag is required";
    return newErrors;
  };

  const playSuccessSound = () => {
    try {
      const audio = new Audio("/sound/send-notification.wav");
      audio.volume = 0.5;
      audio.play();
    } catch {
      // ignore audio errors
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axiosInstance.post("question/", formData, {
        headers: { authorization: `Bearer ${token}` },
      });

      playSuccessSound();
      setSuccessPost(true);

      setTimeout(() => {
        setSuccessPost(false);
        navigate("/home");
      }, 1800);
    } catch (err) {
      console.error("Question submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LayOut>
      <div className={style.ask_page}>
        {successPost && (
          <Suspense fallback={null}>
            <PopupSucces className={style.positionPopUp} />
          </Suspense>
        )}

        <div className={style.steps_box}>
          <h3 className={style.steps_title}>Steps to write a good question</h3>
          <ul>
            <li>Summarize your problem in one clear title</li>
            <li>Describe your problem in detail</li>
            <li>Explain what you tried</li>
            <li>Review before posting</li>
          </ul>
        </div>

        <form className={style.ask_card} onSubmit={submitHandler}>
          <div className={style.ask_header}>Ask a Public Question</div>

          {errors.title && (
            <small className={style.fielderror}>{errors.title}</small>
          )}
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter a clear, short title"
            onChange={changeHandler}
            className={style.ask_input}
          />
          <br />

          {errors.description && (
            <small className={style.fielderror}>{errors.description}</small>
          )}
          <br />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Describe your problem in detail..."
            onChange={changeHandler}
            className={style.ask_textarea}
          />
          <br />

          {errors.tag && (
            <small className={style.fielderror}>{errors.tag}</small>
          )}
          <br />
          <input
            type="text"
            name="tag"
            value={formData.tag}
            placeholder="Enter related tag..."
            onChange={changeHandler}
            className={style.ask_input}
          />

          <div className={style.post_btn_wrap}>
            <button
              type="submit"
              className={style.post_btn}
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Post Your Question"}
            </button>
          </div>
        </form>

        <div className={style.clearfix} />
      </div>
    </LayOut>
  );
}

export default AskQuestion;
