import React, { useState } from "react";

function LoginUncontroled() {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const response = await fetch("http://invweb:8069/api/v2/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        setErrorMessage(data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="w-50 m-auto" onSubmit={onSubmitHndler} noValidate>
      <div className="mb-3">
        <label className="form-label w-100">
          Email address
          <input
            type="email"
            className="form-control"
            name="email"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label w-100">
          Password
          <input
            type="password"
            className="form-control"
            name="password"
          />
        </label>
      </div>
      <p className="text-danger">{errorMessage}</p>
      <button
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}

export default LoginUncontroled;
