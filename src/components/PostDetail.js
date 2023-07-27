import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(apiUrl);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    if (!post) {
        return <div>loading....</div>;
    }

    return (
        <div className="p-4 mt-10">
            <h2 className="text-2xl font-semibold mb-4">Post Detail</h2>
            <div className="bg-teal-100 rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.body}</p>
            </div>
        </div>
    );
};

export default PostDetail;
