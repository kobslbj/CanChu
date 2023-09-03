/* eslint-disable react/prop-types */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import styles from '../../styles/friendpost.module.scss';


function FriendPost({ comments }) {
  const [friendComments, setFriendComments] = useState(comments || []);

    useEffect(() => {
    setFriendComments(comments || []);
  }, [comments]);

  return (
    <div>
      {friendComments.map((comment) => (
        <div className={styles.friendmain} key={comment.id}> {/* 注意加上key屬性 */}
          <div className={styles.friendblock}>
            <div>
              <Image
                className={styles.friendpic}
                src={comment.user.picture}
                alt="icon"
                width={32}
                height={32}
              />
            </div>
            <div className={styles.friendcomment}>
              <div className={styles.friendname}>{comment.user.name}</div>
              <div className={styles.friendcontent}>{comment.content}</div>
            </div>
          </div>
          <div className={styles.friendtime}>{comment.created_at}</div>
        </div>
      ))}
    </div>
  );
}

export default FriendPost;



