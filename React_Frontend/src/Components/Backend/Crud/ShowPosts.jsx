import React, { useEffect, useState } from 'react';
import axios from '../Crud/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/posts'); // Get all posts
            setPosts(response.data);
        } catch (error) {
            setError('Error fetching posts'); // Set error message
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`/posts/delete/${id}`); // Delete the post
                fetchPosts(); // Refresh posts after deletion
            } catch (error) {
                setError('Error deleting post'); // Set error message
                console.error('Error deleting post', error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-post/${id}`); // Redirect to edit page
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {loading && <p>Loading posts...</p>}
            {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
            {posts.map(post => (
                <div key={post.id} className="border p-4 my-2">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={() => handleEdit(post.id)} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ShowPosts;
