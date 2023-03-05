import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css"

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {

      }
    }
    try {
      await axios.post("http://localhost:8800/api/posts/", newPost);
      window.location.reload();
    } catch (error) {

    }
  };



  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noavtar.png"} className="shareProfileImg" />
          <input placeholder={"What's in your mind " + user.username + "?"} className="shareInput" ref={desc} />
        </div>
        <hr className="shareHr" />
        {
          file && (
            <div className="shareImgContainer">
              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />

              <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            </div>
          )
        }
        {/* form  */}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="orange" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input type="file" id="file" style={{ display: "none" }} accept=".png,.jpeg,.jpg" onChange={(e) => { setFile(e.target.files[0]) }} />
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </label>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}
