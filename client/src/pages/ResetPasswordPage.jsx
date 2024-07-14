// ForgotPasswordPage.js
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');

  function validateEmail(email) {
    const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
    return emailRegex.test(email);
  }

  async function handleForgotPassword(ev) {
    ev.preventDefault();

    // Check if email is provided
    if (!email.trim()) {
      setResetPasswordError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setResetPasswordError('Invalid email format');
      return;
    } else {
      setResetPasswordError('');
    }

    try {
      // Send a request to the server to initiate the password reset
      await axios.post('/forgot-password', { email });
      setResetPasswordSuccess(true);
    } catch (error) {
      setResetPasswordError('Password reset failed. Please try again.');
    }
  }

  if (resetPasswordSuccess) {
    return <div>Password reset instructions sent to your email.</div>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-48">
        <h1 className="text-2xl text-center mb-4">Forgot Password</h1>
        <Link to="/login" className="text-blue-500">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Login
        </Link>
        <form className="max-w-md mx-auto" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          {resetPasswordError && <p className="text-red-500">{resetPasswordError}</p>}
          <button className="primary">Reset Password</button>
        </form>
      </div>
    </div>
  );
}