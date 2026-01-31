import { useContext, useState, useRef, memo } from "react";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../Api/axios";
import style from "./Profile.module.css";
import { FaTimes } from "react-icons/fa";

function Profile({ onClose }) {
  const { state, setState, token } = useContext(AppContext);

  const [file, setFile] = useState(null);
  const [bio, setBio] = useState(state?.bio || "Add a few words about yourself");
  const [loading, setLoading] = useState(false); 
  const fileInputRef = useRef();

  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const avatarURL = state?.avatar
    ? `${BACKEND_URL}${state.avatar}`
    : "/img/avator.png";

  const handleChooseFile = () => {
    setLoading(true);           
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setLoading(false);          
  };

  const handleAvatarUpload = async () => {
    if (!file) {
      alert("Please choose an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axiosInstance.post("user/avatar", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setState((prev) => ({ ...prev, avatar: res.data.avatar }));
      alert("Avatar updated!");
    } catch (err) {
      console.error("Avatar upload failed:", err);
      alert("Failed to upload avatar");
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        "user/profile",
        { bio },
        { headers: { authorization: `Bearer ${token}` } }
      );

      setState((prev) => ({ ...prev, bio }));
      alert("Profile updated!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className={style.profile_page}>
      <div className={style.profile_card}>
        <FaTimes className={style.closeIcon} onClick={onClose} />

        <div className={style.user_profile}>
        <img src={avatarURL} className={style.avatar} alt="avatar" />
        <p><span>Hi,</span> {state?.username}<span> !</span></p>
        <p><strong>Bio:</strong> {bio}</p>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />

        <button className={style.uploadBtn1} onClick={handleChooseFile}>
          {loading ? "Opening..." : "Choose Avatar"}
        </button>

        {file && <p className={style.selecte_file}>Selected avatar: {file.name}</p>}

        <button className={style.uploadBtn} onClick={handleAvatarUpload}>
          Upload Avatar
        </button>

        <input
          className={style.bio_input}
          type="text"
          onChange={(e) => setBio(e.target.value)}
          placeholder={bio ? "Update your profile bio..." : "Add a short bio..."}
        />

        <button className={style.saveBtn} onClick={handleUpdate}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default memo(Profile);
