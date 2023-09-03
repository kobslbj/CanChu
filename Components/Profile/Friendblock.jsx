/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Skeleton from 'react-loading-skeleton';
import { useFriendContext } from "../../FriendContext";
import { useUserContext } from "../../UserInfo";
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "../../styles/profileblock.module.scss";


function Friendblock({params}) {
  const { friendData, setfriendData,isLoadingUser, setIsLoadingUser } = useFriendContext();
  const { userData, setUserData } = useUserContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState(null); 
  
  const token1 = Cookies.get("token");
  const authorid = Cookies.get("userid")
  const inputref =useRef(null);
  // const authorid = Cookies.get("userid");
  
  const userId  = params;

  const isEditable = userId === authorid;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setShowFileInput(!showFileInput);
    const imageURL = URL.createObjectURL(file);
    setSelectedImageURL(imageURL);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    // 在此顯示一些視覺提示，例如：高亮拖放區域
  };

  // 處理拖放離開區域的事件
  const handleDragLeave = (event) => {
    event.preventDefault();
    // 在此隱藏視覺提示，例如：取消高亮拖放區域
  };

  // 處理拖放放置事件
  const handleDrop = (event) => {
    event.preventDefault();
    // 在此處理上傳，取得拖放的檔案
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    const imageURL = URL.createObjectURL(file);
    setSelectedImageURL(imageURL);
    setShowFileInput(true);
  };


  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("picture", selectedFile);

      const response = await axios.put(
        "https://justin-canchu-api.octave.vip/api/1.0/users/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setfriendData((prevUserData) => ({
      ...prevUserData,
      picture: response.data.data.picture,
      }));
      setUserData((prevUserData) => ({
      ...prevUserData,
      picture: response.data.data.picture,
      }));
      
      setShowFileInput(!showFileInput)
      console.log("照片上傳成功：", response.data);

    } catch (error) {
      console.error("照片上傳失敗：", error);
    }
  };
  
    const handleEditProfile = () => {
    if (userId === authorid) {
      // Toggle the visibility of the file input when the button is clicked
      inputref.current.click();
    }
  };
    const handleCancel = () => {
    setShowFileInput(false);
  };
  console.log(friendData.picture)
  return (
     <div className={`${styles.profileblock} ${isEditable ? styles.editable : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // 需要阻止預設拖放行為
    >
      <div className={styles.Avator}>
      {isLoadingUser ? (
            <Skeleton
              className={styles.authorpic}
              width={180}
              height={180}
              circle={0.5} // You can adjust this value to make it a circle
            />
          ) : (
            <Image
            className={styles.myfriendpic}
            src={friendData.picture} // Use the updated user picture here
            alt="icon"
            width={180}
            height={180}
            quality={90}
            onClick={handleCancel}
          />
          )}

        {isEditable && (
          <button
            type="button" 
            className={styles.content}
            onClick={ handleEditProfile}> 
            編輯大頭貼
              <input
                id="upload-input"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                ref={inputref}
                style={{ display:"none" }}
              />
          </button>
             )}
      </div>
      <div className={styles.profileinfo}>
      {isLoadingUser ? (
            <Skeleton
              className={styles.profilename}
              width={200}
              height={36}
            />
          ) : (
              <p className={styles.profilename}>{friendData.name}</p>
          )}
        
        {isLoadingUser ? (
            <Skeleton
              className={styles.profilefriend}
              width={30}
              height={30}
            />
          ) : (
            <div className={styles.profilefriend}>
          
            {friendData.friend_count}位朋友</div>
          )}

      </div>
      <div id={styles.avatarEditor}  className={showFileInput ? "" : styles.hidden}>
        <div className={styles.titlebox}>
            <p className={styles.title}>編輯頭像</p>
            <button
              type ="button"
              className={styles.cancelpic}
              onClick={handleCancel} // Clicking on the button will now trigger handleCancel function
        >
              <Image
                src="/cancel.jpg"
                alt="icon"
                width={24}
                height={24}
                quality={90}
              />
              </button>
        </div>
            <div className={styles.editpic}>
              {selectedImageURL && (
            <Image
              src={selectedImageURL}
              alt="Selected"
              layout="fill"
              objectFit="contain"
            />
          )}
            </div>
            <button type="button" className={styles.upload} onClick={handleUpload}>上傳</button>

          </div>
    </div>
  );
}

export default Friendblock;