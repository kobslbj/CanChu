/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */

"use client";

import React,{useState, useCallback } from 'react';

// import axios from 'axios'
// eslint-disable-next-line import/no-extraneous-dependencies
// import Cookies from "js-cookie";

import usePostSearch from './api/usePostSearch';
import useInfiniteScroll from './api/useInfiniteScroll';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Post from '../../Components/Post/Post';
import Skeleton from '../../Components/Skeleton/Skeleton'
import Iwantpost from '../../Components/Post/Iwantpost';

export default function Home() {
const { posts ,fetchPosts , canLoadMore ,isLoadingInitial, nextCursor, isIwantPost, setIsIwantPost,addAICommentToPost} = usePostSearch();
console.log('nextCursor:',canLoadMore);
console.log('isLoadingInitial:', isLoadingInitial);
console.log('nextCursor:', nextCursor);

  const fetchMorePosts = useCallback(() => {
    if(canLoadMore===true){
      fetchPosts();
    }
  }, [fetchPosts]);
    useInfiniteScroll(fetchMorePosts, 500, 100);


  return (
    <div >
      <Navbar />
      <div className="main">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Iwantpost fetchPosts={fetchPosts} setIsIwantPost={setIsIwantPost}/>
          {isLoadingInitial ? (
            <Skeleton />
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                postdata={post}
                count={1}

              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
