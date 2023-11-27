<<<<<<< HEAD
=======

// import React, { useContext, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const { setUser } = useContext(UserContext);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   function validateEmail(email) {
//     const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
//     return emailRegex.test(email);
//   }

//   function validatePassword(password) {
//     return password.length >= 8;
//   }

//   async function handleLoginSubmit(ev) {
//     ev.preventDefault();

//     // Check if email is provided
//     if (!email.trim()) {
//       setEmailError('Email is required');
//       return;
//     } else if (!validateEmail(email)) {
//       setEmailError('Invalid email format');
//       return;
//     } else {
//       setEmailError('');
//     }

//     // Check if password is provided
//     if (!password.trim()) {
//       setPasswordError('Password is required');
//       return;
//     } else if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 8 characters long');
//       return;
//     } else {
//       setPasswordError('');
//     }

//     try {
//       const { data } = await axios.post('/login', { email, password });
//       setUser(data);

//       alert('Login successful.');
//       setRedirect(true);
//     } catch (e) {
//       alert('Login failed.');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div className="mb-48">
//         <h1 className="text-2xl text-center mb-4">Login</h1>
//         <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
//           <input
//             type="email"
//             placeholder="Gsuite id"
//             value={email}
//             onChange={(ev) => setEmail(ev.target.value)}
//           />
//           {emailError && <p className="text-red-500">{emailError}</p>}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="password min length should be 8"
//               value={password}
//               onChange={(ev) => setPassword(ev.target.value)}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-2 cursor-pointer"
//             >
//               <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//             </span>
//           </div>
//           {passwordError && <p className="text-red-500">{passwordError}</p>}
//           <button className="primary">Login</button>
//           <div className="text-center py-2 text-gray-500">
//             <Link className="underline text-black" to={"/forgot-password"}>
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="text-center py-2 text-gray-500">
//             <p>Admin login:</p>
//             <Link className="underline text-black" to={"/admin/login"}>
//               Login as Admin
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


>>>>>>> 1aabf5eb230d07c5d15c89d5f2341e4d92362738
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    // Check if email is provided
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Check if password is provided
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);

      alert('Login successful.');
      setRedirect(true);
    } catch (e) {
      alert('Login failed.');
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-48">
        <h1 className="text-2xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="College email id"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password (min length 8)"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            <Link className="underline text-black" to={"/forgot-password"}>
              Forgot Password?
            </Link>
          </div>
          <div className="text-center py-2 text-gray-500">
            <p>Admin login:</p>
            <Link className="underline text-black" to={"/admin/login"}>
              Login as Admin
            </Link>
          </div>

          {/* Registration Link */}
          <div className="text-center py-2 text-gray-500">
            <p>Don't have an account?</p>
            <Link className="underline text-black" to={"/register"}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}