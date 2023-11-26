
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
                    placeholder="admin.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    placeholder="admin password"
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddAdmin = () => {
//     const navigate = useNavigate();
//     const [userName, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [adminPassword, setAdminPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [userNameError, setUserNameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     useEffect(() => {
//         // Reset errors when inputs change
//         setEmailError('');
//         setUserNameError('');
//         setPasswordError('');
//     }, [email, userName, adminPassword]);

//     const validateEmail = (email) => {
//         const emailRegex = /^\S+@\S+\.\S+$/;
//         return emailRegex.test(email);
//     };

//     const validatePassword = (password) => {
//         return password.length >= 8;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate email
//         if (!email.trim() || !validateEmail(email)) {
//             setEmailError('Invalid email format');
//             return;
//         }

//         // Validate username
//         if (!userName.trim()) {
//             setUserNameError('Username is required');
//             return;
//         }

//         // Validate password
//         if (!adminPassword.trim() || !validatePassword(adminPassword)) {
//             setPasswordError('Password must be at least 8 characters long');
//             return;
//         }

//         // Check if email and username are already registered
//         try {
//             const emailResponse = await axios.get(`http://localhost:4000/check-email/${email}`);
//             const userNameResponse = await axios.get(`http://localhost:4000/check-username/${userName}`);

//             if (emailResponse.data.exists) {
//                 setEmailError('Email is already registered');
//                 return;
//             } else {
//                 setEmailError('');
//             }

//             if (userNameResponse.data.exists) {
//                 setUserNameError('Username is already taken');
//                 return;
//             } else {
//                 setUserNameError('');
//             }
//         } catch (error) {
//             console.error('Error checking email and username:', error);
//             alert('Error checking email and username. Please check the console for details.');
//             return;
//         }

//         // If all validations pass, proceed with adding the admin
//         try {
//             const response = await axios.post('http://localhost:4000/admin/add', {
//                 userName: userName,
//                 email: email,
//                 adminPassword: adminPassword,
//                 role: 'admin',
//             });

//             console.log('Response:', response.data);

//             // Assuming successful response, navigate to the admin list page
//             navigate('/admin/list');
//         } catch (error) {
//             console.error('Error adding admin:', error.response.data);
//             alert('Error adding admin. Please check the console for details.');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto">
//             <h1>Add Admin</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="john doe"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 {userNameError && <p className="text-red-500">{userNameError}</p>}

//                 <input
//                     type="email"
//                     placeholder="admin.email@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 {emailError && <p className="text-red-500">{emailError}</p>}

//                 <input
//                     type="password"
//                     placeholder="admin password"
//                     value={adminPassword}
//                     onChange={(e) => setAdminPassword(e.target.value)}
//                     className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 {passwordError && <p className="text-red-500">{passwordError}</p>}

//                 <button type="submit" className="primary">
//                     Add Admin
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddAdmin;
