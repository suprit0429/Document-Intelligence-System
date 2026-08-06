import React from "react";
import { Link } from "react-router-dom";

export default function Register({ setActiveLink }) {
    return (
        <div>
            <h1>Register</h1>
            <p>Already have an account? <Link to="/login" onClick={() => setActiveLink && setActiveLink('/login')}>Login</Link></p>
        </div>
    );
}