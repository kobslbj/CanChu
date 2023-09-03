/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

"use client";

import Image from 'next/image';
import Link from 'next/link';
import React ,{ useState, useEffect}  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from "js-cookie";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useFriendContext } from "../../FriendContext";
import { useUserContext } from '../../UserInfo';
import Friendpost from './Friendpost';
import styles from '../../styles/post.module.scss';


function Post({ postdata, count, onVectorClick  , params,openaiResponse}) {
  
  const { friendData, setfriendData ,} = useFriendContext();
  const { userData,setUserData  } = useUserContext();
  const [editing, setEditing] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState(postdata.comments || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedcount, setIsLikedcount] = useState(postdata.like_count);
  const [ispostEditing, setpostIsEditing] = useState(false);
  const [editedContext, setEditedContext] = useState(postdata.context);
  const [showHover, setShowHover] = useState(false);
  const authorid = Cookies.get("userid");
  const [isExpanded, setIsExpanded] = useState(false);


  const token1 =Cookies.get("token");
  const userId  = params;

const handleEditPost = () => {
    // 準備要送出的編輯資料
    const editedPost = {
      context: editedContext,
    };

    // 呼叫 API 來更新貼文內容
    axios
      .put(`https://justin-canchu-api.octave.vip/api/1.0/posts/${postdata.id}`, editedPost, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token1}`,
        },
      })
      .then((response) => {
        // 更新貼文內容
        postdata.context = editedContext;

        // 關閉編輯功能
        setpostIsEditing(false);
      })
      .catch((error) => {
        console.error('編輯貼文失敗：', error.response);
      });
  };

  const handleBoardClick = () => {
    if (ispostEditing) {
      // 如果是編輯模式，則觸發 handleCancelClick 來關閉編輯模式
      handleCancelClick();
    } else {
      // 否則開啟編輯模式
      if (postdata.user_id.toString() === authorid.toString()) {
        setpostIsEditing(true);
      }
    }
  };
const handleCancelClick = () => {
  setpostIsEditing(false);
};

const handleVectorClick = () => {
  // 準備要送出的留言資料
  const newComment = {
    content: commentValue,
  };

  axios
    .post(
      `https://justin-canchu-api.octave.vip/api/1.0/posts/${postdata.id}/comment`,
      newComment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token1}`,
        },
      }
    )
    .then((response) => {
      // 更新 postdata.comments 狀態，將新的留言加入留言列表中
      setComments([...comments, response.data.data.comment]);

      // 重置留言編輯相關的狀態
      setEditing(false);
      setCommentValue('');
      onVectorClick();
    })
    .catch((error) => {
      console.error('新增留言失敗：', error.response);
    });
};




  // 處理按讚按鈕點擊事件
  const handleLikeClick = () => {
    if (isLiked) {
      // 如果貼文已經按讚，執行取消按讚的 API 請求
      
      axios
        .delete(`https://justin-canchu-api.octave.vip/api/1.0/posts/${postdata.id}/like`, {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLiked(false); // Update local isLiked state
            setIsLikedcount((prevCount) => prevCount - 1);
          } else {
            console.error('取消按讚失敗。狀態碼：', response.status);
          }
        })
        .catch((error) => {
          console.error('取消按讚請求發送時出現錯誤：', error);
        });
    } else {
      // 如果貼文還未按讚，執行按讚的 API 請求
      
      axios
        .post(`https://justin-canchu-api.octave.vip/api/1.0/posts/${postdata.id}/like`, null, {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLiked(true); // Update local isLiked state
            setIsLikedcount((prevCount) => prevCount + 1);
        } 
          else {
            console.error('按讚失敗。狀態碼：', response.status);
          }
        })
        .catch((error) => {
          console.error('按讚請求發送時出現錯誤：', error);
        });
    }
  };
    const handleEditClick = () => {
    setEditing(true);
  };
    const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };
  const handleReadMoreClick = () => {
    setIsExpanded(true);
  };

  const handleReadLessClick = () => {
    setIsExpanded(false);
  };

  // 在元件掛載時更新按讚狀態
  useEffect(() => {
    setIsLiked(postdata.is_liked);
  }, [postdata.is_liked]);

  useEffect(() => {
    setIsLikedcount(postdata.like_count);
  }, [postdata.like_count]);

    useEffect(() => { 
    setComments(postdata.comments || []);
  }, [postdata.comments]);
  // Function to handle updating the comments state with new comments
    useEffect(() => {

  }, [ setIsLiked]);
  return (
    <div>
        <div
          className={`${styles.board} ${count === 1 ? styles.marginLeft : ''}`}
          
        >
          {postdata.user_id === +authorid && (
          <div className={styles.hoverIcon} onClick={handleBoardClick} />
        )}
          <div className={styles.news}>
            <div className={styles.info}>
              <div>
                <Image
                  className={styles.photo}
                  src={authorid === userId ? userData.picture : postdata.picture}
                  alt={postdata.name}
                  width={76}
                  height={76}
                />
              </div>
              <div className={styles.author}>
                {postdata.name}
                <Link href={`/post/${postdata.id}`}>
                  <div className={styles.time}>{postdata.created_at}</div>
                </Link>
              </div>
            </div>
          {ispostEditing ? (
          <div>
            <textarea
              className={styles.postarea}
              defaultValue={postdata.context}
              onChange={(e) => setEditedContext(e.target.value)}
            />
            <div className={styles.buttonbox}>
            <button type="button" className={styles.confirmbtn} onClick={handleEditPost}>確認</button>
            <button type="button" className={styles.cancelbtn}  onClick={handleCancelClick}>取消</button>
            </div>
          </div>
        ) : (
          
          <div>
              <p
                className={`${styles.post} ${
                  isExpanded ? styles.expandedText : styles.clamptext
                }`}
              >
                {postdata.context}
              </p>
              {postdata && postdata.context && postdata.context.length > 3 * 40 && !isExpanded && (
                <button
                  type="button"
                  className={styles.readMoreButton}
                  onClick={handleReadMoreClick}
                >
                  Read More
                </button>
              )}
              {isExpanded && (
                <button
                  type="button"
                  className={styles.readMoreButton}
                  onClick={handleReadLessClick}
                >
                  Read Less
                </button>
              )}
          </div>
        )}
          </div>
          <div className={styles.lines} />
          <div className={styles.function}>
            <button 
              type='button'
              className={styles.btn1} 
              onClick={handleLikeClick}>
              <Image
                src={isLiked ? '/heart.png' : '/noheart.png'}
                alt="icon"
                width={isLiked ? 23 : 22}
                height={isLiked ? 23 : 22}
                quality={90}
                  />
            </button>
            <button 
              type='button'
              className={styles.btn2} >
              <Image
                src="/comment.png"
                alt="icon"
                width={20}
                height={20}
                quality={90}
              />
            </button>
          </div>
          <div className={styles.lines} />
          <div className={styles.numbers}>
           <Link href={`/post/${postdata.id}`}>
              <div className={styles.number_like}>
                {isLikedcount}人喜歡這則貼文
              </div>
            </Link>
            <Link href={`/post/${postdata.id}`}>
              <div className={styles.number_comment}>
                {postdata.comment_count}則留言
              </div>
            </Link>
          </div>
          <div>
            {count === 0 && postdata.comments && postdata.comments.length > 0 &&
            ( <Friendpost comments={postdata.comments} postdata={postdata.context} openaiResponse={openaiResponse} />)}
          </div>
          
            <div className={styles.comment_board}>
              <Image
                className={styles.profilepic}
                src={userData.picture} 
                alt="icon"
                width={52}
                height={52}
              />
              { count === 0? (
              <div >
                <textarea
                  className={styles.editcomment}
                  value={commentValue}
                  placeholder='留個言吧'
                  onChange={handleCommentChange} />
                  <button
                    type ="button"
                    className={styles.vectorbox}
                    onClick={handleVectorClick}
                  >
                    <Image
                      src="/Vector.png"
                      alt="icon"
                      width={24.5}
                      height={19.25} />
                 </button>
              </div>
            ) : (
            <Link href={`/post/${postdata.id}`}>
              <div className={styles.comment} onClick={handleEditClick}>
                <p className={styles.commenttitle}>留個言吧</p>
              </div>
            </Link>
            )}
            </div>

        </div>
    </div>
  );
}
export default Post;
Post.propTypes = {
  postdata: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    context: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    comment_count: PropTypes.number.isRequired,
    is_like: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
};