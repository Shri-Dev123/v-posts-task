import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import loadingIcon from "../images/loading.png";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const postsPerPage = 10;
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    _start: (currentPage - 1) * postsPerPage,
                    _limit: postsPerPage,
                },
            });

            setPosts(response.data);
            setTotalPages(
                Math.ceil(response.headers["x-total-count"] / postsPerPage)
            );

            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="p-4 mt-10">
            <h2 className="text-3xl font-semibold mb-4">List of Posts</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
                        <img src={loadingIcon} alt="loadingIcon" />
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 p-2 m-2 md:grid-cols-2">
                    {posts.map((post) => (
                        <Link key={post.id} to={`/posts/${post.id}`}>
                            <div className="bg-teal-100 rounded-lg p-4 shadow-md cursor-pointer">
                                <h3 className="text-xl font-semibold mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-700">{post.body}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostList;
