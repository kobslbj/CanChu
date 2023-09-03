/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React , { useState }from 'react';
import Image from 'next/image';
import Cookies from "js-cookie";
import axios from 'axios';
import styles from '../styles/navbar.module.scss';

function Notification({ event, setNotificationCount}) {
  const { summary, is_read, created_at } = event; 
  const [isNotificationRead, setIsNotificationRead] = useState(is_read);
  const [isCheckCircleVisible, setIsCheckCircleVisible] = useState(!is_read);
  const handleNotificationClick = async () => {
    try {
      if (!isNotificationRead) {
        const token = Cookies.get('token');
        await axios.post(
          `https://justin-canchu-api.octave.vip/api/1.0/events/${ event.id}/read`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsNotificationRead(true);
        setIsCheckCircleVisible(false);
        setNotificationCount(prevCount => prevCount - 1);
      }
    } catch (error) {
      console.error('標記通知為已讀時發生錯誤：', error);
    }
  };
  return (
    <div>
    <div className={styles.div2}>
    <div
          className={
            isNotificationRead
              ? styles.noticontentRead
              : styles.noticontent
          }
        >
          {summary}
        </div>
        {isCheckCircleVisible && (
          <Image
            className={styles.checkCircle_pic}
            src="/checkCircle.png"
            alt="checkCircle"
            width={12}
            height={12}
            quality={100}
            onClick={handleNotificationClick}
          />
        )}
    </div>
    <div
        className={
          isNotificationRead
            ? styles.create_timeRead
            : styles.create_time
        }
      >
        {created_at}
      </div>
    <div className={styles.notiline}/>
    </div>
  );
}

export default  Notification;