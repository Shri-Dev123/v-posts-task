import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav className="flex fixed top-0 left-0 right-0 items-start bg-blue-500 gap-3 p-4">
                    <Link className="text-white font-semibold" to="/">
                        Home
                    </Link>
                    <Link className="text-white font-semibold " to="/create">
                        Create Post
                    </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/posts/:postId" element={<PostDetail />} />
                    <Route path="/create" element={<CreatePost />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
