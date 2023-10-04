import React, { useState } from "react";

export default function LoginShow() {

  const [status, setStatus] = useState(true);

  const handleClick = (hidden) => {

    const loginForm = document.getElementById('loginForm');
    const forgot = document.getElementById('forgot');
    const connect = document.getElementById('connect');
    const registershow = document.getElementById('RegisterShow');
    const register = document.getElementById('register');

    if (hidden) {
      loginForm.classList.remove('hidden')
      forgot.classList.remove('hidden')
      connect.classList.add('hidden')
      registershow.classList.add('hidden')
      register.classList.remove('hidden')
    }

    if(!hidden) {
      loginForm.classList.add('hidden')
      forgot.classList.add('hidden')
      connect.classList.remove('hidden')
      connect.classList.add('connectwhenregister')
      registershow.classList.remove('hidden')
      register.classList.add('hidden')
    }
  }
  return (
    <>
      <button className="button login" id="connect" onClick={() => handleClick(true)}>Se connecter</button>
      <button className="button login" id="register" onClick={() => handleClick(false)}>S'inscrire</button>
    </>

  )
}
