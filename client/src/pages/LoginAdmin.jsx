import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleClick = () => {
        // Validate password
        if (!validatePassword(adminPassword)) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        } else {
            setPasswordError('');
        }

        axios
            .post('http://localhost:4000/admin/login', {
                userName: userName,
                adminPassword: adminPassword,
            })
            .then((res) => {
                if (res.data.code === 200 && res.data.role === 'admin') {
                    const { token } = res.data;
                    localStorage.setItem('token', token);

                    navigate('/');
                } else {
                    console.error('Login failed:', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="card-admin flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl text-center mb-4">Login Admin</h1>
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Name"
                    className="input-admin mb-4"
                    type="text"
                />

                <input
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Password"
                    className={`input-admin mb-4 ${passwordError ? 'border-red-500' : ''}`}
                    type="password"
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}

                <button onClick={handleClick} className="submit-btn">
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

export default LoginAdmin;
