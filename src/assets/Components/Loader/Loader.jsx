import React from 'react'
import style from './Loder.module.css'

function Loader() {
  return (
    <>
      <div className={`${style.loader} ${style.rotateScale}`}></div>
    </>
  )
}

export default Loader
