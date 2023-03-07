import { useState } from "react";
import axiosClient from "../axiosClient";

function PostForm({ post }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const submit = (e) => {
    console.log(title, description, file);
  };

  return (
    <form className="post-from" onSubmit={submit}>
      <h3>Create Post:</h3>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea name="description" />
      </div>
      <input type="file" name="file" />
      <input type="submit" />
    </form>
  );
}

export default PostForm;
