/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Notification from './Notification';
import { useUserContext } from '../UserInfo';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../styles/navbar.module.scss';

function Navbar() {
  const router = useRouter();
  const { setUserData, userData, isLoadingUser, setIsLoadingUser } = useUserContext();
  const [searchResults, setSearchResults] = useState([]);
  const [userDataEvents, setUserDataEvents] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const userid = Cookies.get('userid');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // 發送 GET 請求取得通知數據
        const token = Cookies.get('token');

        const response = await axios.get(`https://justin-canchu-api.octave.vip/api/1.0/events/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 計算未讀通知數量
        const newNotifications = response.data.data.events.filter((event) => !event.is_read);
        setNotificationCount(newNotifications.length);
        setUserDataEvents(response.data.data.events);
      } catch (error) {
        console.error('獲取通知時發生錯誤：', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (showAllNotifications) {
      setVisibleNotifications(userDataEvents);
    } else {
      setVisibleNotifications(userDataEvents.slice(0, 5)); // 只顯示前五個通知
    }
  }, [showAllNotifications, userDataEvents]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(
          `https://justin-canchu-api.octave.vip/api/1.0/users/${userid}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 更新全域使用者資料
        setUserData(response.data.data.user);
        setIsLoadingUser(false);
      } catch (error) {
        console.error('獲取使用者資料時發生錯誤：', error);
      }
    };

    fetchUserProfile();
  }, [setUserData, userid]);

  const handleSearch = async (e) => {
    const keyword = e.target.value.trim();
    if (keyword === '') {
      setSearchResults([]); // 清空搜尋結果
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.get(
        `https://justin-canchu-api.octave.vip/api/1.0/users/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSearchResults(response.data.data.users);
    } catch (error) {
      console.error('搜尋時發生錯誤：', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login'); // 導向登入頁面或其他目標頁面
  };
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.twomainnav}>
          <Link href="/">
            <p className={styles.logo}>CanChu</p>
          </Link>
          <div className={styles.container}>
            <Image
              className={styles.searchlogo}
              src="/search.png" // 圖片前面一定要有一個slash，不用public
              alt="icon"
              width={17}
              height={17}
            />
            <input
              className={styles.searchbox}
              type="text"
              id="name"
              placeholder="搜尋"
              onChange={handleSearch} // 呼叫 handleSearch 函式來處理搜尋請求
              autoComplete="off"
            />
            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map((user, index) => (
                  <Link key={user.id} href={`../users/${user.id}`}>
                    <div className={styles.searchResult}>
                      <Image
                        className={styles.searchpic}
                        src={user.picture}
                        alt={user.name}
                        width={39}
                        height={39}
                      />
                      <p className={styles.searchResultName}>{user.name}</p>
                    </div>
                    {index !== searchResults.length - 1 && <div className={styles.line} />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.twoicon}>
          <div className={styles.notification}>
            <div className={styles.notification_icon}>
              <Image
                src="/notification.png"
                className={styles.notificationpic}
                alt="icon"
                width={36}
                height={36}
              />
              <div className={styles.notimenu}>
                <div className={styles.notidiv1}>
                  <Image
                    className={styles.notification_pic}
                    src="/notification2.png"
                    alt="notification"
                    width={38}
                    height={38}
                    quality={100}
                  />
                  <p className={styles.notititle}>我的通知</p>
                </div>
                {visibleNotifications.map((event) => (
                  <Notification
                    key={event.id}
                    event={event}
                    setNotificationCount={setNotificationCount}
                  />
                ))}
                {userDataEvents.length > 5 && !showAllNotifications && (
                  <button
                    type="button"
                    className={styles.viewMoreButton}
                    onClick={() => setShowAllNotifications(true)}
                  >
                    查看全部通知
                  </button>
                )}
              </div>
            </div>
            {notificationCount > 0 && (
              <div className={styles.is_readcircle}>{notificationCount}</div>
            )}
          </div>

          <div className={styles.profilepic}>
            {isLoadingUser ? (
              <Skeleton
                className={styles.authorpic}
                width={36}
                height={36}
                circle={0.5} // You can adjust this value to make it a circle
              />
            ) : (
              <Image
                src={userData.picture}
                className={styles.authorpic}
                alt="icon"
                width={36}
                height={36}
              />
            )}
            <div className={styles.menu}>
              <div className={styles.div1}>
                <Image
                  className={styles.profile_pic}
                  src={userData.picture}
                  alt="profilepic"
                  width={38}
                  height={38}
                  quality={100}
                />
                <p className={styles.yourname}>{userData.name}</p>
              </div>
              <div className={styles.div2}>
                <Link href={`/users/${userid}`}>
                  <div className={styles.hovertit}>查看個人檔案</div>
                </Link>
                <div className={styles.line} />
              </div>
              <div className={styles.div3} onClick={handleLogout}>
                <div className={styles.hovertit}>登出</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
