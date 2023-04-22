import React from "react";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { charset } from "../../utils/charset";

import "./Card.css";
import "react-toastify/dist/ReactToastify.css";

const Card = () => {
  const [width, setWidth] = useState(16);
  const [password, setPassword] = useState("Generate Password");
  const [passwordCharset, setPasswordCharset] = useState(charset.join(""));
  const [checkedState, setCheckedState] = useState(new Array(4).fill(true));

  const firebaseConfig = {
    apiKey: "AIzaSyAAEHVNdXrIIMacUvyIKl2YfRcWDjwLSrc",
    authDomain: "strongpassword-app.firebaseapp.com",
    projectId: "strongpassword-app",
    storageBucket: "strongpassword-app.appspot.com",
    messagingSenderId: "325311417408",
    appId: "1:325311417408:web:8fe137bacc2e51c44f23a5",
    measurementId: "G-VRJPGBKQ0N",
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    if (updatedCheckedState.includes(true)) {
      setCheckedState(updatedCheckedState);

      const parsedCharset = updatedCheckedState.reduce(
        (currentSet, currentState, index) => {
          if (currentState === true) {
            return currentSet + charset[index];
          }
          return currentSet;
        },
        ""
      );

      setPasswordCharset(parsedCharset);
    } else {
      toast("You must select at least one option.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const changeWidth = (event) => {
    setWidth(event.target.value);
  };

  const generatePassword = () => {
    const crypto = window.crypto || window.msCrypto;

    if (typeof crypto === "undefined") {
      throw new Error(
        "Crypto API is not supported. Please upgrade your web browser"
      );
    }

    const indexes = crypto.getRandomValues(new Uint32Array(width));

    let secret = "";

    for (const index of indexes) {
      secret += passwordCharset[index % passwordCharset.length];
    }

    return secret;
  };

  const copyPassoword = () => {
    navigator.clipboard.writeText(password);

    toast("🔥 Successfully Copied!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      theme: "dark",
    });
  };

  const reloadPassoword = () => {
    setPassword(generatePassword);

    toast("🔒 New Password Generated!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    setPassword(generatePassword());
  }, [width, passwordCharset]);

  return (
    <>
      <div className="card">
        <div className="password-wrapper">
          <input value={password} readOnly />
          <button onClick={copyPassoword} className="button-icon">
            <FontAwesomeIcon className="icon" icon={faCopy} />
          </button>
        </div>
        <div className="row">
          <span style={{ fontSize: 16 }}>Password Length:</span>
          <span style={{ color: "white", marginLeft: 8 }}>{width}</span>
          <input
            type="range"
            className="range blue"
            onChange={changeWidth}
            min={3}
            max={50}
            step={1}
            value={width}
          />
        </div>

        <div className="row">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              onChange={() => handleOnChange(0)}
              checked={checkedState[0]}
            />
            <span>ABC</span>
          </label>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              onChange={() => handleOnChange(1)}
              checked={checkedState[1]}
            />
            <span>abc</span>
          </label>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              onChange={() => handleOnChange(2)}
              checked={checkedState[2]}
            />
            <span>123</span>
          </label>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              onChange={() => handleOnChange(3)}
              checked={checkedState[3]}
            />
            <span>#&?</span>
          </label>
          <span
            style={{ marginLeft: "auto", color: "white", fontWeight: "700" }}
          >
            REFRESH
          </span>
          <button
            onClick={() => reloadPassoword()}
            className="button-icon"
            style={{ marginLeft: 8 }}
          >
            <FontAwesomeIcon className="icon" icon={faRefresh} />
          </button>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        progressStyle={{ backgroundColor: "#1e5a24" }}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Card;
