import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [emailErrorMessages, setEmailErrorMessages] = useState([]);
  const [passwordErrorMessages, setPasswordErrorMessages] = useState([]);
  const [password2ErrorMessages, setPassword2ErrorMessages] = useState([]);

  const onSubmitHandler = async () => {
    try {
      const response = await fetch("http://invweb:8069/api/v2/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          password2,
        }),
      });

      if (response.ok) {
        // obsługa poprawnej odpowiedzi z serwera
        const data = await response.json();
        console.log(data);
      } else {
        // obsługa błedów z serwera
        const errors = await response.json();
        if (errors.email) {
          setEmailErrorMessages(errors.email)
        }
        if (errors.password) {
          setPasswordErrorMessages(errors.password)
        }
        if (errors.password2) {
          setPassword2ErrorMessages(errors.password2)
        }
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
            formNoValidate
          />
        </label>
        {emailErrorMessages.map((error) => <p className="small text-danger">{error}</p>)}
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
        {passwordErrorMessages.map((error) => <p className="small text-danger">{error}</p>)}
      </div>
      <div className="mb-3">
        <label className="form-label w-100">
          Repeat password
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        {password2ErrorMessages.map((error) => <p className="small text-danger">{error}</p>)}
      </div>

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

export default Register;
