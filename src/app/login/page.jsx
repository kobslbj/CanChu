"use client";

import React ,{useState} from 'react';
import SignIn from '../../../Components/SignIn';
import SignUp from '../../../Components/SignUp';

export default function SignUpPage(){
    const [ShowSignIn, setShowSignIn] = useState(true);
    const toggleComponent = () => {
    setShowSignIn(!ShowSignIn);
  };
  return (
    <div>
      {ShowSignIn ? <SignIn onStatechange={toggleComponent} /> : <SignUp onStatechange={toggleComponent} />}
    </div>
  );
}