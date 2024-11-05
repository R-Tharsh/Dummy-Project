import React, { useEffect, useState } from "react";
import { getPostsAPI } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsAPI();
        setPosts(response.data); // Assuming the posts are in `response.data`
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty array ensures the effect runs only once

  const handlePostClick = (id) => {
    // Navigate to the detailed post page
    navigate(`/post/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching posts: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handlePostClick(post.id)} // Navigate to detailed post
            >
              <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
