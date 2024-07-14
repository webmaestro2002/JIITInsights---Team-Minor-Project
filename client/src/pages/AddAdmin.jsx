
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState(''); // Use the same email for both user and admin
    const [adminPassword, setAdminPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if userName, email, and adminPassword are provided
        if (!userName || !email || !adminPassword) {
            alert('Please provide a username, email, and admin password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/admin/add', {
                userName: userName,
                email: email, // Use the same email for both user and admin
                adminPassword: adminPassword,
                role: 'admin',
            });

            console.log('Response:', response.data);

            // Assuming successful response, navigate to the admin list page
            navigate('/admin/list');
        } catch (error) {
            console.error('Error:', error.response.data);
            alert('Error adding admin. Please check the console for details.');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1>Add Admin</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="john doe"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="email"
                    placeholder="College email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    placeholder="Password (Min length 8)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button type="submit" className="primary">
                    Add Admin
                </button>
            </form>
        </div>
    );
};

export default AddAdmin;
