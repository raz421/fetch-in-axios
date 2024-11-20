import { useState, useEffect } from "react";

export default function EditPost({ post, onEditPost }) {
  const [title, setTitle] = useState(post?.title || ""); // Handle potential undefined/null post
  const [body, setBody] = useState(post?.body || "");

  // Update state if the passed `post` changes
  useEffect(() => {
    setTitle(post?.title || "");
    setBody(post?.body || "");
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Both title and body are required.");
      return;
    }

    const updatedPost = {
      id: post.id,
      title,
      body,
    };

    onEditPost(updatedPost);

    // Clear input fields
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Post body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </p>
        <div>
          <input type="submit" value="Update Post" />
        </div>
      </form>
    </div>
  );
}
