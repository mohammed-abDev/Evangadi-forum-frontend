import { useState ,memo} from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import axiosInstance from "../../Api/axios";
import style from "./Like.module.css";

function LikeDislike({ answerId, initialLikes, initialDislikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userAction, setUserAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/question/answer/${answerId}/like`,
        {},
        { headers: { authorization: `Bearer ${token}` } },
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setUserAction();
    } catch (err) {
      console.log("LIKE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axiosInstance.post(
        `/question/answer/${answerId}/dislike`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setUserAction("dislike");
    } catch (err) {
      console.log("DISLIKE ERROR:", err);
    }
  };

  return (
    <div className={style.Like_disLike}>
      <span
        onClick={handleLike}
      >
        <ThumbUpOutlinedIcon />
        {likes}
      </span>

      <span
        onClick={handleDislike}
      >
        <ThumbDownOffAltOutlinedIcon />
        {dislikes}
      </span>
    </div>
  );
}

export default memo(LikeDislike);
