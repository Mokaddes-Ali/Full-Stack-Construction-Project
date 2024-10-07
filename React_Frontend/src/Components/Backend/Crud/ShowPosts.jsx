import React, { useEffect, useState } from 'react';
import axios from '../Crud/axiosInstance';

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/posts/${id}`);
            fetchPosts(); // Refresh posts after deletion
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ShowPosts;
