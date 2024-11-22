import api from "./api/api.js"
import { useEffect, useState } from "react";
import AddPost from "./Component/AddPost";
import EditPost from "./Component/EditPost";
import Posts from "./Component/Posts";
// import posts from "./Data/data";
// import initialPosts from "./data/data.js";
// let initialPosts=posts
function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      let id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
      let finalpost = {
        id: id.toString(),
        ...newPost,
      };
      let response = await api.post("/posts", finalpost);
      setPosts([...posts, response.data]);
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(
          `error came from server ${err.response.status} message ${err.response.data}`
        );
      } else {
        setError(err.message);
      }
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      if (confirm("Are you sure you want to delete the posts?")) {
        await api.delete(`/posts/${postId}`);
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      } else {
        console.log("You chose not to delete the post!");
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(
          `error came from server ${err.response.status} message ${err.response.data}`
        );
      } else {
        setError(err.message);
      }
    }
  };
  const handleEditPost = async (updatedPost) => {
    try {
      let response = await api.patch(
        `/posts/${updatedPost.id}`,
        updatedPost
      );
      
      let updatedPosts = posts.map((post) =>
        post.id == response.data.id ? response.data : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      if (err.response) {
        console.log(err);
        // server error
        setError(
          `error came from server ${err.response.status} message ${err.response.data}`
        );
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        if (response && response.data) {
          console.log(response.data);
          setPosts(response.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err);
          // server error
          setError(
            `error came from server ${err.response.status} message ${err.response.data}`
          );
        } else {
          setError(err.message);
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div>
        <h1>API Request with api</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />

          <hr />

          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost post={post} onEditPost={handleEditPost} />
          )}
          <hr />
          {error && (
            <>
              <hr />
              <div className="error">{error}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
