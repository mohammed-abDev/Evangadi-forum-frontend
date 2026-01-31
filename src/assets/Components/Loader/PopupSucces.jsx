import React from 'react'
import style from './Loder.module.css'

function PopupSucces({className }) {
  return (
    <>
      <div className={`${style.success_popup} ${className || ""}`}
      >
        ✓ Posted successfully...
      </div>
    </>
  );
}

export default PopupSucces
