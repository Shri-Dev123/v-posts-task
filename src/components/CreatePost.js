import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const descriptionMaxLength = 1000;

    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }
        if (formData.description.trim().length > descriptionMaxLength) {
            errors.description = `Description must be ${descriptionMaxLength} characters or less`;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await axios.post(apiUrl, {
                title: formData.title,
                body: formData.description,
            });

            console.log("New post created:", response.data);

            toast.success("Post has been successfully submitted!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });

            setFormData({ title: "", description: "" });
            setFormErrors({});
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to submit the post. Please try again later.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="p-4 mt-10">
            <h2 className="text-3xl font-semibold mb-4">Create New Post</h2>
            <ToastContainer />
            <form
                className="bg-teal-100 p-2 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-xl font-semibold mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the title"
                        className={`border border-blue-700 rounded-md p-2 w-full ${
                            formErrors.title ? "border-red-500" : ""
                        }`}
                    />
                    {formErrors.title && (
                        <p className="text-red-500 mt-1">{formErrors.title}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-xl font-semibold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter the description"
                        rows="6"
                        className={`border border-blue-700 rounded-md p-2 w-full resize-none ${
                            formErrors.description ? "border-red-500" : ""
                        }`}
                    />
                    {formErrors.description && (
                        <p className="text-red-500 mt-1">
                            {formErrors.description}
                        </p>
                    )}
                    <p className="text-gray-500 mt-1">
                        {formData.description.length}/{descriptionMaxLength}
                    </p>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
