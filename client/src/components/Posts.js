import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

function Post({ post }) {
  return (
    <div className="post">
      <div>
        <h2>{post.title}</h2>
        <p>{post.author.email}</p>
      </div>
      <img src={post.image} />
      <p> {post.description}</p>
    </div>
  );
}

export default Posts;
