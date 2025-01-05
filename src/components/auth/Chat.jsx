import React, { useState } from 'react';
import axios from 'axios';
import MineNav from './MineNav';
import '../styles/Chat.css';

function Chat() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        owner_email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-email', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Error sending email', error);
            alert('Failed to send email.');
        }
    };

    return (
        <>
            <MineNav />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="styled-form">
                    <h2 className="form-title">Contact Us</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        onChange={handleChange}
                        value={formData.name}
                        className="form-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={handleChange}
                        value={formData.email}
                        className="form-input"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        onChange={handleChange}
                        value={formData.message}
                        className="form-textarea"
                        required
                    />
                    <input
                        type="email"
                        name="owner_email"
                        placeholder="Owner's Email"
                        onChange={handleChange}
                        value={formData.owner_email}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="form-button">Send Email</button>
                </form>
            </div>
        </>
    );
}

export default Chat;
