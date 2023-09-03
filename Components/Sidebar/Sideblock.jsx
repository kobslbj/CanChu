/* eslint-disable react/button-has-type */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from "js-cookie";
import styles from '../../styles/sidebar.module.scss';

function Sideblock() {
  const token = Cookies.get('token');
  const [friendList, setFriendList] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  
  const [showAll, setShowAll] = useState(false);

  const handleShowAllClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  
  // Function to fetch the list of friends
  function fetchFriends() {
    const url = 'https://justin-canchu-api.octave.vip/api/1.0/friends/';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        const { users } = response.data.data;
        setFriendList(users);
        console.log('Successfully fetched the friend list');
      })
      .catch((error) => {
        console.error('Error fetching friend list:', error);
      });
  }

  // Function to fetch the list of pending friend requests
  function fetchPendingRequests() {
    const url = 'https://justin-canchu-api.octave.vip/api/1.0/friends/pending';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        const { users } = response.data.data;
        setPendingRequests(users);
        console.log('Successfully fetched pending friend requests');
      })
      .catch((error) => {
        console.error('Error fetching pending friend requests:', error);
      });
  }
    useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);

  // Function to handle confirming a friend request
  const handleAcceptFriendRequest = async (friendshipId) => {
    try {
      const url = `https://justin-canchu-api.octave.vip/api/1.0/friends/${friendshipId}/agree`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, null, config);
      console.log('Successfully confirmed friend request');
      // Update the friend list and pending requests
      fetchFriends();
      fetchPendingRequests();
    } catch (error) {
      console.error('Failed to confirm friend request:', error.response);
    }
  };

  // Function to handle canceling a friend request
  const handleCancelFriendRequest = async (friendshipId) => {
    try {
      const url = `https://justin-canchu-api.octave.vip/api/1.0/friends/${friendshipId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(url, config);
      console.log('Successfully canceled friend request');
      // Update the pending requests
      fetchPendingRequests();
    } catch (error) {
      console.error('Failed to cancel friend request:', error.response);
    }
  };
  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);


  return (
    <div>
      
      {showAll ? (
        pendingRequests.map((request) => (
          <div key={request.id} className={styles.author_info}>
            <Link href={`/users/${request.id}`}>
<Image
  className={styles.author_pic}
  src={request.picture}
  alt="Pending Friend Request Profile Picture"
  width={42}
  height={42}
  quality={100}
/>
</Link>
<Link href={`/users/${request.id}`}>
<div className={styles.author_name}>{request.name}</div>
</Link>
<button  className={styles.confirmbtn} onClick={() => handleAcceptFriendRequest(request.friendship.id)}>確認</button>
<button  className={styles.cancelbtn} onClick={() => handleCancelFriendRequest(request.friendship.id)}>取消</button>
          </div>
        ))
      ) : (
        pendingRequests.slice(0, 3).map((request) => (
          <div key={request.id} className={styles.author_info}>
<Link href={`/users/${request.id}`}>
<Image
  className={styles.author_pic}
  src={request.picture}
  alt="Pending Friend Request Profile Picture"
  width={42}
  height={42}
  quality={100}
/>
</Link>
<Link href={`/users/${request.id}`}>
<div className={styles.author_name}>{request.name}</div>
</Link>
<div className={styles.btn}>
<button  className={styles.confirmbtn} onClick={() => handleAcceptFriendRequest(request.friendship.id)}>確認</button>
<button  className={styles.cancelbtn} onClick={() => handleCancelFriendRequest(request.friendship.id)}>取消</button>
          </div>
          </div>
        ))
      )}
      
      {showAll ? (
        friendList.map((friend) => (
          <Link href={`/users/${friend.id}`}>
<div key={friend.id} className={styles.author_info}>
  <Image
    className={styles.author_pic}
    src={friend.picture}
    alt="icon"
    width={42}
    height={42}
    quality={100}
  />
  <div className={styles.author_name}>{friend.name}</div>
</div>
</Link>
        ))
      ) : (
        friendList.slice(0, 4).map((friend) => (
          <Link href={`/users/${friend.id}`}>
<div key={friend.id} className={styles.author_info}>
  <Image
    className={styles.author_pic}
    src={friend.picture}
    alt="icon"
    width={42}
    height={42}
    quality={100}
  />
  <div className={styles.author_name}>{friend.name}</div>
</div>
</Link>
        ))
      )}
       {(pendingRequests.length + friendList.length > 6) && (     
      <div className={styles.lookforall}>
          <Image
            className={styles.lookforalllogo}
            src="/options.png"
            alt="icon"
            width={39}
            height={39}
            quality={100}
          />
          <button type="button" className={styles.lookforalltitle}  onClick={handleShowAllClick}>{showAll ? '收回全部' : '查看全部'}</button>
      </div>
            )}
    </div>
  );
}

export default Sideblock;