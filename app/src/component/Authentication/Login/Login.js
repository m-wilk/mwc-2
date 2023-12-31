import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmitHandler = async () => {
    try {
      const response = await fetch("http://invweb:8069/api/v2/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        // 
        const data = await response.json();
        setErrorMessage(data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-50 m-auto">
      <div className="mb-3">
        <label className="form-label w-100">
          Email address
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label w-100">
          Password
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <p className="text-danger">{errorMessage}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onSubmitHandler}
      >
        Submit
      </button>
    </div>
  );
}

export default Login;
