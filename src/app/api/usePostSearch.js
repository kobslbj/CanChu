/* eslint-disable no-shadow */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const usePostSearch = (userId) => {
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(false); // 初始值為 false
  const [isLoadingInitial, setIsLoadingInitial] = useState(true); // 新增 isLoadingInitial 狀態，初始值為 true
  const [isIwantPost, setIsIwantPost] = useState(false);
  const token = Cookies.get('token');
  const isInitialMount = useRef(true); // Ref to track the initial mount

  const fetchPosts = async () => {
    try {
      // Prepare the query parameters
      const queryParams = new URLSearchParams();
      if (userId) {
        queryParams.append('user_id', userId);
      }

      // If nextCursor is available, pass it as cursor parameter to API
      if (nextCursor && !isIwantPost) {
        queryParams.append('cursor', nextCursor);
      }

      // Make the API request
      const response = await axios.get(
        `https://justin-canchu-api.octave.vip/api/1.0/posts/search?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Set the fetched posts
      if (response.data.data.next_cursor) {
        setNextCursor(response.data.data.next_cursor);
        setCanLoadMore(true); // 設置為 true 表示可以載入更多貼文
      } else {
        // 如果next_cursor為null，設置canLoadMore為false，表示不能載入更多帖子
        setCanLoadMore(false);
      }

      // Set the fetched posts
      setPosts(
        isIwantPost
          ? [...response.data.data.posts]
          : (prevPosts) => [...prevPosts, ...response.data.data.posts],
      );
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      // 請求完成後，將isLoadingInitial設置為false
      setIsLoadingInitial(false);
      setIsIwantPost(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current || isIwantPost) {
      fetchPosts();
      isInitialMount.current = false;
    }
  }, [isIwantPost]);

  return {
    posts,
    fetchPosts,
    canLoadMore,
    isLoadingInitial,
    nextCursor,
    isIwantPost,
    setIsIwantPost,
    
  };
};

export default usePostSearch;
