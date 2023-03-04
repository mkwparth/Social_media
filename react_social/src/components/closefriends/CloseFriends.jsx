import "./closefriends.css"

export default function CloseFriends({ user }) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <li className="sidebarFriend">
                <img src={PF+user.profilePicture} className="sidebarFriendImg" />
                <span className="sidebarFriendName">
                    {user.username}
                </span>
            </li>
        </div>
    )
}
