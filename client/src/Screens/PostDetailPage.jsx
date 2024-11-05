import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdAPI } from "../services/apiService";

const PostDetailPage = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostByIdAPI(id);
        setPost(response.data); // Assuming the post details are in `response.data`
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching post: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {post ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700">{post.body}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Post not found.</p>
      )}
    </div>
  );
};

export default PostDetailPage;
