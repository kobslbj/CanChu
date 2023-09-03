/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */

"use client";

import React, { useEffect, useState,useCallback }from 'react';
import axios from 'axios'
import Cookies from "js-cookie";
import Navbar from '../../../../Components/Navbar';
import Friendblock from '../../../../Components/Profile/Friendblock';
import Introblock from '../../../../Components/Profile/Introblock';
import Iwantpost from '../../../../Components/Post/Iwantpost';
import {useFriendContext} from '../../../../FriendContext';
import Post from '../../../../Components/Post/Post';
import usePostSearch from '../../api/usePostSearch';
import useInfiniteScroll from '../../api/useInfiniteScroll';
import Skeleton from '../../../../Components/Skeleton/Skeleton'
import styles from "../../../../styles/profile.module.scss";

export default function Friendpage({ params }) {
  const { friendData, setfriendData,isLoadingUser, setIsLoadingUser } = useFriendContext();
  const { userId } =params;
  const token1 =Cookies.get("token");
  const authorid =Cookies.get("userid");


const { posts ,fetchPosts , canLoadMore ,isLoadingInitial,nextCursor,isIwantPost, setIsIwantPost} = usePostSearch(userId); 
console.log('nextCursor:',canLoadMore);
console.log('isLoadingInitial:', isLoadingInitial);
console.log('nextCursor:', nextCursor);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const response = await axios.get(`https://justin-canchu-api.octave.vip/api/1.0/users/${userId}/profile`, {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        });
        // 更新全域使用者資料
      setfriendData(response.data.data.user);
      setIsLoadingUser(false);
      } catch (error) {
        console.error("獲取使用者資料時發生錯誤：", error);
      }
    };

    fetchFriendProfile();
  }, [ setfriendData, userId]);

  const fetchMorePosts = useCallback(() => {
    if(canLoadMore===true){
      fetchPosts();
    }
  }, [fetchPosts]);

    useInfiniteScroll(fetchMorePosts, 500, 100);
  return (
    <div className={styles.profile}>
      <Navbar  />
      <Friendblock params={userId}/>
      <div className={styles.line}/>
      <div className={styles.posttitle}>貼文</div>
      <div className={styles.line2}/>
      <div className={styles.mainblock}>
          <Introblock params={userId} />
          <div className={styles.rightblock}>
            {authorid === userId && <Iwantpost fetchPosts={fetchPosts} setIsIwantPost={setIsIwantPost} />}
            {isLoadingInitial ? (
              <Skeleton />
            ) : (
              posts.map((post) => (
                <Post key={post.id} postdata={post}  count={1} />
              ))
            )}
          </div>
      </div>
    </div>
  );
}
