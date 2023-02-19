import React from 'react'
import './LandingPage.css'
import uniqid from "uniqid"
import { Navigate } from "react-router-dom";


export default function LandingPage() {
    // const navigate = useNavigate();

    function generateToken() {
        const token = uniqid();
        window.localStorage.setItem("VoiceChatToken", token);
    }

  return (
    <div>
        <button onClick={generateToken}>Guest</button>
    </div>
  )
}
