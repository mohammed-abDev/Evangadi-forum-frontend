import React, { useState, useContext, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import  apiAxios from '../../Api/axios'
import style from './Login.module.css'
import LayOut from '../../Components/LayOut/LayOut';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AppContext } from '../../context/AppContext'
import Loader from "../../Components/Loader/Loader";

function Login() {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);

  // Password toggle
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tohomeloding ,setTohomeloding] =useState(false);
  

  const passShowHandler = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Form data error
  const [feledErrors, setfeledErrors] = useState({});

  //handle input change
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setfeledErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }, []);

  //handle validation
  const fieldValidate = useCallback(() => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please insert your email";
    if (!formData.password) newErrors.password = "Please insert your password";
    return newErrors;
  }, [formData]);

  //handle form submit
  const submitHandler =  useCallback(
  async (e) => {
    e.preventDefault();
    
    const newErrors = fieldValidate();
    if (Object.keys(newErrors).length > 0) {
      setfeledErrors(newErrors);
      return;
    }
    
    try {
      setLoading(true);
      setTohomeloding(true);

      const res = await apiAxios.post("/user/login", formData);
      // console.log("LOGIN RESPONSE:", res.data);

      // SAVE TOKEN and USER NAME
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userid", res.data.userid);

      // Update context 
      setState({
        token: res.data.token,
        username: res.data.username,
        userid: res.data.userid,
        
      });
      // redirect
      navigate("/home");

    } catch (err) {
      setLoading(false);
      setTohomeloding(false);
      console.error("Error:", err.response?.data);

      // Invalid password passwwprd must >8
      if (err.response?.data?.error) {
        setfeledErrors({
          ...feledErrors,
          password: err.response.data.message,
        });
      } 
    }finally { 
        setLoading(false); 
        setTohomeloding(false)
    }
    
  },[formData, fieldValidate, navigate, setState]);

  return (
    <LayOut>

      {tohomeloding && (
        <div className={style.loader_container}>
            <Loader size="sm"/>
            <p>Loading......</p>
        </div>
    )}
    
  {!tohomeloding && (
      <div className={style.login}>
        <div className={style.container}>
          {/* LEFT – Login Card */}
          <div className={style.card}>
            <h3>Wellcome Back!</h3>
            <h3>Login to your account</h3>
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create a new account</Link>
            </p>

            <form className={style.form} onSubmit={submitHandler}>
              <div className={style.field}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                />
                {feledErrors.email && (
                  <p className={style.fielderror}>{feledErrors.email}</p>
                )}
              </div>
              <div className={style.field}>
                <div className={style.passwordBox}>
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                  />

                  <span onClick={passShowHandler} className={style.eyeIcon}>
                    {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                </div>

                {feledErrors.password && (
                  <p className={style.fielderror}>{feledErrors.password}</p>
                )}
              </div>
              <button type="submit" disabled={loading}>{!loading ? "Login" : "Logging in..."}</button>
            </form>
            <Link className={style.create} to="/register">
              Create an account?
            </Link>
          </div>
          {/* RIGHT – About */}
          <div className={style.about}>
            <span>
              <Link to={"#"}>About</Link>
            </span>
            <h1>Evangadi Networks Q&A</h1>
            <p>
              No matter what stage of life you are in, whether you are just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>

            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button className={style.howBtn} onClick={() => navigate('/how-it-work')}>HOW IT WORKS</button>
          </div>
        </div>
      </div>)}
    </LayOut>
  );
}

export default memo(Login);
