import React from "react";
import style from "../LandingHome.module.css";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

function FindSection() {
  const navigate = useNavigate();

  return (
    <div className={style.find_container}>
      {/* Left Image */}
      <div className={style.find_left}>
        <div className={style.image_wrapper}>
          <img
            src="/img/ask-get-answer.webp"
            alt="Find Solutions"
            className={style.circle_image}
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className={style.find_right}>
        <h2>Get Multiple Answers</h2>

        <p>
          <CheckIcon className={style.green_cirle} />
          Receive answers from various community members
        </p>

        <p>
          <CheckIcon className={style.green_cirle} />
          Choose the most helpful solution for your needs
        </p>

        <button type="button" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default FindSection;
