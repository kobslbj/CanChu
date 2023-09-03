/* eslint-disable no-redeclare */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../../styles/post.module.scss';

function skeleton() {

    return (
        <div>
            <div className={styles.board}>
              <div className={styles.news}>
                <div className={styles.info}>
                  <Skeleton count={1} height={76} width={76} circle={0.5} />

                  <div className={styles.author}>
                        <Skeleton count={2} height={20} width={76}/>
              </div>
                </div>
              <div>
                  <p
                    className={styles.post}
                  >
                    <Skeleton count={1} height={120} width={600}/>
                  </p>
              </div>
              </div>
              <div className={styles.lines} />
              <div className={styles.numbers}>
                  <div className={styles.number_like}>
                  <Skeleton count={1} height={25} width={76}/>
                  </div>
                  <div className={styles.number_comment}>
                  <Skeleton count={1} height={25} width={76}/>
                  </div>
              </div>
                <div className={styles.comment_board}>
                <Skeleton count={1} height={52} width={52} circle={0.5} />
                  <Skeleton  className={styles.comment} />
                </div>
    
            </div>
        </div>
      );
  }
  
  export default skeleton;