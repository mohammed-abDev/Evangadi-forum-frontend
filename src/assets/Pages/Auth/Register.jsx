import React, { useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../Api/axios";
import style from "./Register.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../../Components/Loader/Loader";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tohomeloding ,setTohomeloding] =useState(false);



  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // Validate fields
  const validateFields = useCallback(() => {
    const errors = {};

    if (!formData.email) errors.email = "Please insert your email";
    if (!formData.firstname) errors.firstname = "First name is required";
    if (!formData.lastname) errors.lastname = "Last name is required";
    if (!formData.username) errors.username = "Please insert your username";
    if (!formData.password) errors.password = "Please insert your password";

    return errors;
  }, [formData]);

  // Toggle password visibility
  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Handle form submit
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      const errors = validateFields();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      
      try {
        setLoading(true);
        setTohomeloding(true);

        const { data } = await apiAxios.post("/user/register", formData);

        alert("Registered successfully! Please login.");
        localStorage.setItem("token", data.token);

        navigate("/login");
      } catch (err) {
        setTohomeloding(true);
        console.error("Error:", err.response?.data);

        if (err.response?.data?.message) {
          setFieldErrors((prev) => ({
            ...prev,
            password: err.response.data.message,
          }));
        }
      }finally { 
        setLoading(false); 
        setTohomeloding(false);
    }
    },
    [formData, validateFields, navigate]
  );

  return (
    <LayOut>
      {tohomeloding && (
        <div className={style.loader_container}>
            <Loader size="sm"/>
            <p>Creating your account...</p>
        </div>
      )}

    {!tohomeloding && (  
      <div className={style.signup}>
        <div className={style.container}>
          {/* Right Side */}
          <div className={style.right}>
            <div className={style.right_center}>
              <h3>Wellcome!</h3>
              <h3>Join the network</h3>
              <p>
                Already have an account?
                <Link to="/login"> Sign in</Link>
              </p>
            </div>

            <form className={style.form} onSubmit={handleSubmit}>
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && (
                <p className={style.fielderror}>{fieldErrors.email}</p>
              )}

              {/* First + Last Name */}
              <div className={style.FL_name_input}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>

              <div className={style.errorRow}>
                {fieldErrors.firstname && (
                  <p className={style.fielderror}>{fieldErrors.firstname}</p>
                )}
                {fieldErrors.lastname && (
                  <p className={style.fielderror}>{fieldErrors.lastname}</p>
                )}
              </div>

              {/* Username */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {fieldErrors.username && (
                <p className={style.fielderror}>{fieldErrors.username}</p>
              )}

              {/* Password */}
              <div className={style.passwordBox}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Your Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span onClick={togglePassword} className={style.eyeIcon}>
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              {fieldErrors.password && (
                <p className={style.fielderror}>{fieldErrors.password}</p>
              )}

              <button type="submit" disabled={loading}>{loading ? "Loading..." :"Agree and Join"}</button>
            </form>

            <div className={style.right_center}>
              <p>
                I agree to the <a href="https://evangadi.com/legal/privacy">privacy policy</a> and{" "}
                <a href="https://evangadi.com/legal/terms">terms of service</a>
              </p>
            </div>

            <Link to="/login" className={style.signin}>
              Already have an account?
            </Link>
          </div>

          {/* Left Side */}
          <div className={style.left}>
            <strong style={{color:"#ff8500"}}>About</strong>
            <h2>Evangadi Networks</h2>
            <p>
              Evangadi Student Forum is a space where students can ask
              questions, share answers, and support each other throughout their
              learning journey.
            </p>
            <p>
              The forum also gives students hands-on experience building a
              real-world full-stack app using technologies like React, Node.js,
              and MySQL.
            </p>

            <button
              className={style.loginBtn}
              onClick={() => navigate('/how-it-work')}
            >
              HOW IT WORKS?
            </button>
          </div>
        </div>
      </div>
      )}
    </LayOut>
  );
}

export default memo(Register);
