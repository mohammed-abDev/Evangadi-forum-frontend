import React from 'react'
import style from './Howitwork.module.css'
import {useNavigate} from 'react-router-dom'

function Howitwork() {
  const navigate = useNavigate()
  return (
    <>
      {/* How It Works  */}
      <div className={style.content_wrapper}>
        {/* Hero Section - VS Code */}
        <div className={style.hero_container_bg}>
          <div className={style.hero_container_title}>
            <div className={style.title_wrapper}>
              <h1 className={style.main_title}>
                How to Use Evangadi Forum Q&A
              </h1>
              <div className={style.content_wrapper}>
                <div className={style.code_sidebar}>
                  <div className={style.sidebar_tabs}>
                    <div
                      className={`${style.tab} ${style.active}`}
                      onClick={() => navigate("/register")}
                    >
                      User Registration
                    </div>
                    <div
                      className={style.tab}
                      onClick={() => navigate("/login")}
                    >
                      User Login
                    </div>
                    <div className={style.tab} onClick={() => navigate("/ask")}>
                      Asking a Question
                    </div>
                    <div className={style.tab} onClick={() => navigate("/bot")}>
                      🤖Asking Evangadi bot
                    </div>
                    <div
                      className={style.tab}
                      onClick={() => navigate("/home")}
                    >
                      Viewing Q&A
                    </div>
                    <div
                      className={style.tab}
                      onClick={() => navigate("/question/:question_id")}
                    >
                      Submitting an Answer
                    </div>
                    <div className={style.tab} onClick={() => navigate("/login")}>Logging Out</div>
                    <div className={style.tab}  onClick={() => navigate("/home")}>Home</div>
                  </div>
                </div>

                <div className={style.code_content}>
                  <div className={style.code_header}>
                    <div className={style.code_dots}>
                      <span
                        className={style.dot}
                        style={{ background: "#ff5f56" }}
                      ></span>
                      <span
                        className={style.dot}
                        style={{ background: "#ffbd2e" }}
                      ></span>
                      <span
                        className={style.dot}
                        style={{ background: "#27ca3f" }}
                      ></span>
                    </div>
                    <div className={style.code_title}>how-to-use.md</div>
                  </div>

                  <div className={style.code_body}>
                    <div className={style.code_line}>
                      <span className={style.line_number}>1</span>
                      <span className={style.code_keyword}>
                        # User Registration
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>2</span>
                      <span className={style.code_text}>
                        To join Evangadi Networks Q&A, you need to create an
                        account.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>3</span>
                      <span className={style.code_text}>
                        Follow these steps:
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>4</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Click on the "Sign In" button  .
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>5</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Switch to the "Create a new account" form.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>6</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Fill in the required fields: Username, First Name, Last
                        Name, Email, and Password.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>7</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Click on the "Agree and Join" button to register.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>8</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        You will receive a confirmation message upon successful
                        registration.
                      </span>
                    </div>

                    <div className={style.code_line}>
                      <span className={style.line_number}>9</span>
                      <span className={style.code_keyword}># User Login</span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>10</span>
                      <span className={style.code_text}>
                        Once you have registered, you can log in to your
                        account:
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>11</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Click on the "Sign In" button in the top-right corner.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>12</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Enter your registered Email and Password.
                      </span>
                    </div>
                    <div className={style.code_line}>
                      <span className={style.line_number}>13</span>
                      <span className={style.code_bullet}>•</span>
                      <span className={style.code_text}>
                        Click on the "Login" button to access your account.
                      </span>
                    </div>

                    <div className={style.code_scroll} sty>
                      // login and naviget for more....
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Howitwork
