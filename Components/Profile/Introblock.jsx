/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../UserInfo";
import { useFriendContext } from "../../FriendContext";

import styles from "../../styles/Introblock.module.scss";



function Introblock( {params} ) {
  const { userData, setUserData } = useUserContext();
  const { friendData, setfriendData } = useFriendContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedIntroduction, setUpdatedIntroduction] = useState("");
  const [updatedTags, setUpdatedTags] = useState("");

  const userId  = params;
  const token1 = Cookies.get("token");
  const authorid =Cookies.get("userid")

  useEffect(() => {
    setfriendData(userId); // Pass the userId as a parameter to the fetchUserProfile function
  }, [userId, setfriendData]);
  

  const handleConfirmEdit = async () => {
    try {
      const response = await axios.put(
        "https://justin-canchu-api.octave.vip/api/1.0/users/profile",
        {
          introduction: updatedIntroduction,
          tags: updatedTags,
          name: userData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token1}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("使用者資訊已更新：", response.data);
      setIsEditMode(false); // 更新成功後，退出編輯模式
    // Manually update the userData state after successful response
      setfriendData((prevFriendData) => ({
        ...prevFriendData,
        introduction: updatedIntroduction,
        tags: updatedTags,
      }));
    } catch (error) {
      console.error("更新使用者資訊時發生錯誤：", error);
      // 可以顯示錯誤訊息或其他操作
    }
    
  };

    
  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };

  const handleIntroductionChange = (event) => {
    setUpdatedIntroduction(event.target.value);
  };

  const handleTagsChange = (event) => {
    setUpdatedTags(event.target.value);
  };


  useEffect(() => {
    setUpdatedIntroduction(userData.introduction);
    setUpdatedTags(userData.tags);
  }, [userData]);

   const handleFriendRequest = async () => {
    try {
      const response = await axios.post(
        `https://justin-canchu-api.octave.vip/api/1.0/friends/${userId}/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );

      console.log("好友邀請已發送：", response.data);
      // 更新friendData中的friendship狀態
      setfriendData((prevFriendData) => ({
        ...prevFriendData,
        friendship: {
          id: response.data.data.friendship.id,
          status: "requested",
        },
      }));
    } catch (error) {
      console.error("發送好友邀請時發生錯誤：", error);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      const response = await axios.delete(
        `https://justin-canchu-api.octave.vip/api/1.0/friends/${friendData.friendship.id}`,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );

      console.log("好友邀請已取消：", response.data);
      // 更新friendData中的friendship狀態
      setfriendData((prevFriendData) => ({
        ...prevFriendData,
        friendship: null,
      }));
    } catch (error) {
      console.error("取消好友邀請時發生錯誤：", error);
    }
  };

const handleAcceptFriendRequest = async () => {
  try {
    if (!friendData.friendship) {
      console.error("Friendship data not available.");
      return;
    }

    const response = await axios.post(
      `https://justin-canchu-api.octave.vip/api/1.0/friends/${friendData.friendship.id}/agree`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      }
    );

    console.log("Friend request accepted:", response.data);

    // Update friendData to change the status of the friendship
    setfriendData((prevFriendData) => ({
      ...prevFriendData,
      friendship: {
        ...prevFriendData.friendship,
        status: "friend", // Change the status to "friend" after accepting the request
      },
    }));
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
};

  const isMyProfile = userId === authorid;
  const renderButton = () => {
    // If it's the user's own profile, show the edit button
    if (isMyProfile) {
      return (
        <button type="button" className={styles.edit} onClick={handleEditProfile}>
          編輯個人檔案
        </button>
      );
    }

    // If a friend request has been sent, show the cancel button
    if (friendData.friendship?.status === "requested") {
      return (
        <button type="button" className={styles.canceledit} onClick={handleCancelFriendRequest}>
          刪除好友邀請
        </button>
      );
    }
    if( friendData.friendship?.status === "pending"){
      return(
      <div>
      <button type="button" className={styles.edit} onClick={handleAcceptFriendRequest}>
        同意交友邀請
      </button>
      <button type="button" className={styles.canceledit1} onClick={handleCancelFriendRequest}  >
        取消交友邀請
      </button>
    </div>)
    }
    if( friendData.friendship?.status === "friend"){
      return(
      <button type="button" className={styles.edit} onClick={handleCancelFriendRequest}>
        刪除朋友
      </button>
      )
    }
    return (
      <button type="button" className={styles.edit} onClick={handleFriendRequest}>
        邀請成為好友
      </button>
    );
  };
  return (
    <div>
      {isEditMode ? (
        <div className={styles.Introblockbtn}>
          <button
            type="button"
            className={styles.editbtn}
            onClick={handleEditProfile}
          >
            編輯個人檔案
          </button>
          <div className={styles.Introtitle}>自我介紹</div>
          <textarea
            className={styles.IntroEdit}
            value={updatedIntroduction}
            onChange={handleIntroductionChange}
          />
          <div className={styles.Introtitle}>興趣</div>
          <textarea
            className={styles.IntroEdit}
            value={updatedTags}
            onChange={handleTagsChange}
          />
          <div className={styles.btnbox}>
            <button
              type="submit"
              className={styles.editbtnok}
              onClick={handleConfirmEdit}
            >
              確認
            </button>
            <button
              type="button"
              className={styles.editbtnno}
              onClick={handleEditProfile} // Handle cancel by reverting to the original values
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.Introblock}>
          {renderButton()} 
          <div className={styles.Introtitle}>自我介紹</div>
          <p className={styles.IntroContent}>{friendData.introduction}</p>
          <div className={styles.Introtitle}>興趣</div>
          <p className={styles.IntroTags}>{friendData.tags}</p>
        </div>
      )}
      <p className={styles.copyright}>
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </p>
    </div>
  );
}

export default Introblock;


          