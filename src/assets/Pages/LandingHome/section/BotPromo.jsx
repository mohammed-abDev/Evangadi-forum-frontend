import React from "react";
import style from "../LandingHome.module.css";

function BotPromo() {
  return (
    <>
      <div className={style.promo_title}>
        <h3>Try Our AI Assistant</h3>
        <small>Instant coding help 24/7</small>
      </div>

      <div
        className={style.bot_promo}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4), rgba(238,138,8,0.01)),
            url(/img/evangadi-Ai-response.webp)
          `,
        }}
      ></div>
    </>
  );
}

export default BotPromo;
