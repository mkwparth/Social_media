import "./rightbar.css"
import { Users } from "../../Dummydata"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriend] = useState([]);
  const { user: currentUser } = useContext(AuthContext);


  useEffect(() => {
    const getfriends = async () => {
      try {
        const friendsList = await axios.get("http://localhost:8800/api/users/friends/" + currentUser._id);
        setFriend(friendsList.data);


      } catch (err) {
        console.log(err);
      }
    }
    getfriends();
  }, [currentUser._id])



  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} className="birthdayImg" />
          <span className="birthdayText">
            <b>paul walker</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src={`${PF}ad.png`} className="rightbarAD" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />
          })}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {

    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship</span>
            <span className="rightbarInfoValue">{user.relationship === 3 ? ` - ` : (user.relationship === 1 ? `Single` : `Married`)}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>

        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}} >
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noavtar.png"} className="rightbarFollowingImg" />
                <span className="rightbarFollowingUsername">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>

      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">

        {user ? <ProfileRightBar /> : <HomeRightbar />}
        {/* <ProfileRightBar/> */}
      </div>
    </div>
  )
}
