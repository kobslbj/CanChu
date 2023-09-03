import React from 'react';
import Head from 'next/head';
import { UserProvider } from '../../UserInfo';
import { FriendProvider } from "../../FriendContext";

import './global.css';

 

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
       <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      </Head>
      <UserProvider>
        <FriendProvider>
        <body>
          {children}
        </body>
        </FriendProvider>
      </UserProvider>
    </html>
  );
}
