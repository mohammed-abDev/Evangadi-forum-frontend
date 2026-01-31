import React from 'react'
import style from "./Loder.module.css";

function LoaderForBot() {
  return (
    <div className={style.Q_loader}>
      <div className={style.thinking}>Evangadi thinking.....</div>
      <div className={style.line}></div>
      <div className={style.line}></div>
      <div className={style.line}></div>
    </div>
  );
}

export default LoaderForBot
