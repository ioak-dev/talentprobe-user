"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../Logo";
import UserForm from "../../app/UserForm";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <div className="main-page page-container">
      <UserForm />
    </div>
  );
};

export default MainPage;
