import React, { useState } from 'react';
import axios from '../Crud/axiosInstance';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/posts', { title, content });
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Post</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
