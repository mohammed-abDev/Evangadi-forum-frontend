import React from "react";
import style from "../LandingHome.module.css";
import BugReportIcon from "@mui/icons-material/BugReport";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssistantIcon from "@mui/icons-material/Assistant";
import { useNavigate } from "react-router-dom";

function GrowSection() {
  const navigate = useNavigate();

  return (
    <div className={style.grow_container}>
      <div className={style.grow_left}>
        <h2>Light Up Your Future With Knowledge.</h2>

        <p>
          <BugReportIcon className={style.moouse} />
          One question can fix a bug, spark an idea, or unlock a new skill.
        </p>

        <p>
          <QuestionAnswerIcon className={style.moouse} />
          One answer can open a new path in your coding journey.
        </p>

        <p>
          <AssistantIcon className={style.moouse} />
          Unlock your potential — your next breakthrough starts here.
        </p>

        <button type="button" onClick={() => navigate("/home")}>
          Join Community
        </button>
      </div>

      <div className={style.grow_right}>
        <div className={style.image_wrapper}>
          <img
            src="/img/bulb.png"
            alt="Community Star"
            className={style.circle_image}
            loading="lazy"
          />
          <img
            src="/img/ask_Q.webp"
            alt="Ask Question"
            className={style.circle_image2}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default GrowSection;
