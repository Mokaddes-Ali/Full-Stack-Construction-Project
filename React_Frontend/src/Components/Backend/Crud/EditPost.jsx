import React, { useEffect, useState } from 'react';
import axios from '../Crud/axiosInstance';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const fetchPost = async () => {
        try {
            const response = await axios.get(`/posts/edit/${id}`); // Updated URL
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching post', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/update/${id}`, { title, content });
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Post</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPost;
