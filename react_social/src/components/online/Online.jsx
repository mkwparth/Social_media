import "./online.css"

export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src={PF+user.profilePicture} />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
    </div>
  )
}
