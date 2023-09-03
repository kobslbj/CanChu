/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */

"use client";

import Image from 'next/image';
import React , {useState} from 'react';
import axios from 'axios'
import Cookies from "js-cookie";
import Skeleton from 'react-loading-skeleton';
import {useUserContext} from '../../UserInfo';
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../../styles/Iwantpost.module.scss'



// eslint-disable-next-line react/prop-types
function Iwantpost({ fetchPosts, setIsIwantPost}) {
  const { userData, isLoadingUser } = useUserContext();
  const token1 = Cookies.get("token");
  const [postContent, setPostContent] = useState('');

  const handlePostButtonClick = async (e) => {
    e.preventDefault();
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token1}`,
      },
    };
    const requestBody = {
      context: postContent,
  };
    try {
      // Step 1: Create the post
      const response = await axios.post(
        "https://justin-canchu-api.octave.vip/api/1.0/posts",
        requestBody,
        config
      );
      console.log('貼文成功發佈：', response.data);
      if (!setIsIwantPost)
      {fetchPosts();}
      
      setIsIwantPost(true);
      setPostContent('');
      
      setTimeout(async () => {
        try {
          const aiResponse = await axios.post('/api/chat', { context: postContent }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const openAiComment ={ content:aiResponse.data.content};
          
          await axios.post(
            `https://justin-canchu-api.octave.vip/api/1.0/posts/${response.data.data.post.id}/comment`, 
            openAiComment,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE1LCJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiLojYnkvaDppqwiLCJlbWFpbCI6IjY2NkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9qdXN0aW4tY2FuY2h1LWFwaS5vY3RhdmUudmlwL2Fzc2V0cy8yMTUvM2IzYzEwMmUuanBlZyIsImlhdCI6MTY5MTkyNDQyN30.IciWx19Cp7GtykxDAkqqcgVdPzE3ac-eljVwaVJyk70`,
              },
            },
          );
          
          
        } catch (error) {
          console.error('AI Comment Error:', error);
        }
      }, 0);
      
    } catch (error) {
      console.error('Error:', error);
    }

  };
    return (
        <div>
            <div className={styles.Iwantpostboard}>
            {isLoadingUser ? (
                    <Skeleton
                        className={styles.photo}
                        width={74}
                        height={74}
                    />
                ) : (
                    <Image
                        className={styles.photo}
                        src={userData.picture}
                        alt="icon"
                        width={74}
                        height={74}
                    />
                )}
                <textarea 
                  className={styles.talktalk} 
                  placeholder="說點什麼嗎？"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}/>
                <button 
                    type='submit'
                    className={styles.posting}
                    onClick={handlePostButtonClick} >發佈貼文
                </button>
            </div>
        </div>
    );
  }
  
export default Iwantpost;
