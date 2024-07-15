import React, { useEffect, useState } from "react";
import "./style.css";
import logoWhite from "@/svg/westernacher_logo_white.svg";
import logoBlack from "@/svg/westernacher_logo_black.svg";
import { DarkModeState } from "@/store/ProfileStore";
import { redirect, useRouter } from "next/navigation";

interface Props {
  black?: boolean;
}

const Logo = (props: Props) => {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    DarkModeState.asObservable().subscribe((event) => {
      setDarkMode(event);
    });
  });
  return (
    <div className="logo">
      <div className="logo--image">
        {darkMode && (
          <img
            src={logoWhite.src}
            alt="Talentprobe logo"
            onClick={() => router.push("/")}
          />
        )}
        {!darkMode && (
          <img
            src={logoWhite.src}
            alt="Talentprobe logo"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default Logo;
