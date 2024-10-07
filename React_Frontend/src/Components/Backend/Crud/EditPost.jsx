import React, { useEffect, useState } from 'react';
import axios from '../Crud/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // To redirect after the update
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPost = async () => {
        try {
            const response = await axios.get(`/posts/edit/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            setError('Error fetching post');
            console.error('Error fetching post', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/update/${id}`, { title, content });
            alert('Post updated successfully!');
            navigate(`/posts/${id}`); // Redirect to the updated post page
        } catch (error) {
            setError('Error updating post');
            console.error('Error updating post', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="border border-gray-300 p-2 w-full mb-4"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                className="border border-gray-300 p-2 w-full mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Update Post
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default EditPost;
