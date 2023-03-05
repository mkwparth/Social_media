import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
// const axios = require('axios');
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../Dummydata"
export default function Feed({ username }) {

  const [posts, setPost] = useState([])
  const { user } = useContext(AuthContext);
  // const url = ""
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = username
          ? await axios.get('http://localhost:8800/api/posts/profile/' + username)
          : await axios.get('http://localhost:8800/api/posts/timeline/' + user._id);

        setPost(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, [user._id, username])


  // const url = "http://localhost:5000/api/auth/login"

  // const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({email:credientials.email,password:credientials.password})

  // });
  // const json = await response.json();
  // console.log(json);
  return (
    <div className="feed">

      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}

        {
          posts.map((p) => {
            return <Post key={p._id} post={p} />
          })
        }

      </div>
    </div>
  )
}
