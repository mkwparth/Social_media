import { MoreVert } from "@mui/icons-material"
import "./post.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    // console.log(post);
    const [like, setLike] = useState(post.likes.length);
    const [isLike, setIsLike] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    const likehandler = () => {
        try {
            axios.put("http://localhost:8800/api/posts/" + post._id + "/likes", { userId: currentUser._id });

        } catch (err) {
            console.log(err);
        }
        setLike(isLike ? like - 1 : like + 1);
        setIsLike(!isLike)
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [post.userId])
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noavtar.png"} className="postProfileImg" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    {post.img && <img src={PF + post.img} className="postImg" />}

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likehandler} />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likehandler} />
                        <span className="likeCounter">{like} people like it !</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
