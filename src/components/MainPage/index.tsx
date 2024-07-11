"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../Logo";
import UserForm from "../UserForm";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <div className="main-page">
      <Logo />
      <UserForm />
    </div>
  );
};

export default MainPage;
