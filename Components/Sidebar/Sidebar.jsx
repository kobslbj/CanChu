/* eslint-disable import/no-extraneous-dependencies */
import Image from "next/image";
import React  from "react";
import Skeleton from 'react-loading-skeleton';
import {useUserContext} from '../../UserInfo';
import 'react-loading-skeleton/dist/skeleton.css'
import Sideblock from "./Sideblock";
import styles from "../../styles/sidebar.module.scss";

function Sidebar() {
  const {  userData , isLoadingUser} = useUserContext();

  return (
    <div className={styles.sideboardContainer}>
      <div className={styles.sideboard}>
        <div className={styles.sidecontents}>
          <div className={styles.author_info}>
          {isLoadingUser ? (
                    <Skeleton
                        className={styles.author_pic}
                        width={42}
                        height={42}
                    />
                ) : (
                  <Image
                  className={styles.author_pic}
                  src={userData.picture}
                  alt="icon"
                  width={42}
                  height={42}
                  quality={100}
                />
                )}

        <div className={styles.author_name}>{userData.name}</div>
        </div>
          <div className={styles.mygoodfriend}>
            <div className={styles.goodfriendinfo}>
              <Image
                className={styles.myfriendlogo}
                src="/myfriend.png"
                alt="icon"
                width={26.79}
                height={25}
                quality={100}
              />
              <div className={styles.myfriendtitle}>我的好友</div>
            </div>
            <Sideblock showAllContent/>

          </div>
        </div>
      </div>
      <p className={styles.copyright}>
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </p>
    </div>
  );
}

export default Sidebar;
