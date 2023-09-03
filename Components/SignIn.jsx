/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

"use client";

import React, {  useRef ,useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import styles from "../styles/signin.module.scss";


function SignIn({ ShowSignIn, onStatechange }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
	const router = useRouter();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(); // 用於保存計時器引用
  
  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
			provider:"native",
      email,
      password,
    };

    try {
      const response = await axios.post("https://justin-canchu-api.octave.vip/api/1.0/users/signin", userData);
      const token = response.data.data.access_token;
      const userid = response.data.data.user.id;
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        text: '一起CanChu，體驗新生活',
      })

try {
  const defaultPictureResponse = await fetch("/picture.png"); // 取得預設圖片的 response 物件
  const defaultPictureBlob = await defaultPictureResponse.blob(); // 將 response 轉換為 Blob 物件

  const formData = new FormData();
  formData.append("picture", defaultPictureBlob, "picture.png"); // 設定 FormData 中的檔案物件及檔名

  // 將登入成功後的新圖片資料設定為預設照片
  if (!response.data.data.user.picture) {
    const response1 = await axios.put(
      "https://justin-canchu-api.octave.vip/api/1.0/users/picture",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("照片上傳成功：", response1.data);
  }
} catch (error) {
  console.error("照片上傳失敗：", error);
}
      
			Cookies.set("token", token);
      Cookies.set("userid",userid);
			router.push("/");

    } catch (error) {
      console.error(error);
      setFailedAttempts((prevAttempts) => prevAttempts + 1);
      if (failedAttempts === 2) {
        setRemainingTime(30); 
        setTimeout(() => {
          setFailedAttempts(0); // Reset failedAttempts after 30 seconds
        }, 30000);
      }
      const remainingAttempts = 3 - failedAttempts - 1;
      const errorMessage = remainingAttempts > 0
        ? `登入失敗! 還剩 ${remainingAttempts} 次嘗試`
        : `登入失敗! 已連續失敗 3 次，請等待 ${remainingTime} 秒後再試。`;
        if (remainingAttempts > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          });
  
          // 清除之前的計時器
          clearInterval(timerRef.current);
  
          // 開始新的計時器
          timerRef.current = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
          }, 1000);
  
          setTimeout(() => {
            clearInterval(timerRef.current);
            setRemainingTime(30); // 重置剩餘秒數
          }, remainingTime * 1000);
      }

    }
    finally {
      setIsLoading(false); // 請求完成，停止載入
    }
    
  };

  const handleSignUp = () => {
    onStatechange(!ShowSignIn);
  };

  return (
    <div>
      <div className={styles.Container}>
        <form className="form" onSubmit={handleSignIn}>
          <div className={styles.signinboard}>
            <div className={styles.left}>
              <p className={styles.logo}>CanChu</p>
              <p className={styles.title}>會員登入</p>
              <div className={styles.signinform}>
                <div className={styles.signingroup}>
                  <label className={styles.subtitle} htmlFor="email">
                    電子郵件
                    <input
                      className={styles.inputbox}
                      type="email"
                      id="userID"
                      placeholder="例: shirney@appworks.tw"
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
              </div>
              <button type="submit" className={styles.signinbtn} disabled={isLoading}>
                {isLoading ? "載入中..." : "登入"}
              </button>
              <div className={styles.remind}>
                <p className={styles.remind_1}>尚未成為會員？</p>
                <button
                  type="button"
                  className={styles.remind_2}
                  onClick={handleSignUp}
                >
                  會員註冊
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


SignIn.propTypes = {
  ShowSignIn: PropTypes.bool.isRequired,
  onStatechange: PropTypes.func.isRequired,
};

export default SignIn;
