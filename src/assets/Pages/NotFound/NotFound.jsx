import React from 'react'
import style from './NotFound.module.css'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className={style.NotFound_bg_img}>
        <div className={style.nf_container}>
          <h2 className={style.nf_title}>Page Not Found</h2>
          <p className={style.nf_text}>
            The page you are looking for doesn’t exist or has been moved.
          </p>
          <Link to="/" className={style.nf_btn}>
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound
