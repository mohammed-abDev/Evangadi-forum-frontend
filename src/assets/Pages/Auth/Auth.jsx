import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Auth.module.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className={`${styles.authContainer} ${
        isLogin ? styles.loginView : styles.registerView
      }`}
    >
      {/* Card Section */}
      <div className={styles.card}>
        <div className={isLogin ? styles.fadeIn : styles.fadeOut}>
          {isLogin ? <Login /> : <Register />}
        </div>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Go to Register" : "Go to Login"}
        </button>
      </div>

      {/* About Section */}
      <div className={styles.about}>
        <h1>Evangadi Networks</h1>
        <p>
          Evangadi Student Forum is a space where students can ask questions,
          share answers, and support each other throughout their learning
          journey.
        </p>
        <p>
          The forum also gives students hands-on experience building a real-world
          full-stack app using technologies like React, Node.js, and MySQL.
        </p>
      </div>
    </div>
  );
}

export default Auth;
