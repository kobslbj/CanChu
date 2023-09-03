/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

"use client";

// Postpage.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../../../../Components/Navbar';
import Post from '../../../../Components/Post/Post';

export default function Postpage({ params }) {
  const [postDetail, setPostDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const token1 = Cookies.get('token');
  const { post_id } = params;
  
  // 請求 post 詳細內容的函式
  function fetchComment() {
    const url = `https://justin-canchu-api.octave.vip/api/1.0/posts/${post_id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        const { post } = response.data.data;
        setPostDetail(post);
      })
      .catch((error) => {
        console.error('API 請求失敗：', error.response);
      });
  }
function handleLikeChange(postId, newLikeCount) {
  setPostDetail(prevPostDetail => ({
    ...prevPostDetail,
    is_liked: isLiked,
    like_count: newLikeCount
  }));
}
  useEffect(() => {
    // 使用 fetchComment 函式取得詳細內容
    fetchComment();
  }, [post_id, token1]);

  // 重新fetch資料的callback函式
  function handleVectorClick() {
    fetchComment();
  }

  return (
    
    <div>
      <Navbar />
      <div className='postdetail'>
        {postDetail && <Post postdata={postDetail} count={0} onVectorClick={handleVectorClick} handleLikeChange={handleLikeChange}/>}
      </div>
    </div>
  );
}
