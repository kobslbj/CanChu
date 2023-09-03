/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import React, { useRef ,useState} from "react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'
import styles from "../styles/signup.module.scss";


function SignUp({ ShowSignIn, onStatechange }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error , setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (name.trim() === '') {
      setError('名字不能是空的');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '名字不能是空的',
      })
      return;
    }

    if (!email.includes('@')) {
      setError('Email格式不正確');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email格式不正確!',
      })
      return;
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      setError('密碼需包含至少一個大寫字母、小寫字母和數字，且長度需大於八個字元');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '密碼需包含至少一個大寫字母、小寫字母和數字，且長度需大於八個字元!',
      })
      return;
    }
    if (password !== confirmPassword) {
      setError('密碼不一致');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '密碼不一致!',
      })
      return;
    }


    const userData = {
      name,
      email,
      password,
    };

		console.log(userData);
    try {
      const response = await axios.post("https://justin-canchu-api.octave.vip/api/1.0/users/signup", userData);
      console.log(response.data); 
      Swal.fire({
        icon: 'success',
        title: '註冊成功',
      })
			onStatechange(!ShowSignIn);

    }
		catch  {
    console.error(error);
    if (error.response && error.response.status >= 500 && error.response.status < 600) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something's wrong. Please try again later or notify our engineering team.",
      })
      } else {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '註冊失敗，請重試!',
      })
      }
  }
  finally {
    setIsLoading(false); // 請求完成，停止載入
  }
  };

  const Setstate = () => {
    onStatechange(!ShowSignIn);
  };

  return (
    <div>
      <div className={styles.Container}>
        <form className="form" onSubmit={handleSignUp}>
          <div className={styles.signinboard}>
            <div className={styles.left}>
              <p className={styles.logo}>CanChu</p>
              <p className={styles.title}>會員註冊</p>
              <div className={styles.signinform}>
                <div className={styles.signingroup}>
                  <label className={styles.subtitle} htmlFor="userid">
                    使用者名稱
                    <input
                      className={styles.inputbox}
                      type="name"
                      id="name"
                      placeholder="例: Justin Li"
                      ref={nameRef}
                    />
                  </label>
                </div>
                <div className={styles.signingroup}>
                  <label className={styles.subtitle} htmlFor="email">
                    電子郵件
                    <input
                      className={styles.inputbox}
                      type="email"
                      id="userID"
                      placeholder="例: justinli@appworks.tw"
                      ref={emailRef}
                    />
                  </label>
                </div>
                <div className={styles.signingroup}>
                  <label className={styles.subtitle} htmlFor="password">
                    密碼
                    <input
                      className={styles.inputbox}
                      type="password"
                      placeholder="請輸入密碼"
                      ref={passwordRef}
                    />
                  </label>
                </div>
                <div className={styles.signingroup}>
                  <label className={styles.subtitle} htmlFor="confirmpassword">
                    再次輸入密碼
                    <input
                      className={styles.inputbox}
                      type="password"
                      placeholder="再次輸入密碼"
                      ref={confirmPasswordRef}
                    />
                  </label>
                </div>
              </div>
              <button type="submit" className={styles.signinbtn} disabled={isLoading}>
                {isLoading ? "載入中..." : "註冊"}
              </button>
              <div className={styles.remind}>
                <p className={styles.remind_1}>已經是會員了?</p>
                <button
                  type="button"
                  className={styles.remind_2}
                  onClick={Setstate}
                >
                  會員登入
                </button>
              </div>
            </div>
            <div className={styles.right} />
          </div>
        </form>
        <p className={styles.copyright}>
          關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
        </p>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  ShowSignIn: PropTypes.string.isRequired, // Add the missing prop type validation
  onStatechange: PropTypes.string.isRequired, // Add the missing prop type validation
};

export default SignUp;
