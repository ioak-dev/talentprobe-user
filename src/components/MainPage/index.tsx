"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../Logo";
import UserForm from "../../app/UserForm";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <div className="main-page-container">
      <div className="main-page">
        <div className="main-page__left">
        <p><b>Question 1 of 10</b></p>
          <h2>Fill in your details to start the assessment</h2>
          <p>Select one answer</p>
        </div>
        <div className="main-page__right">
          <div>
          <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
