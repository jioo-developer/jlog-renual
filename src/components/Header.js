import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const [navToggle, setNavToggle] = useState(false);
  const [lazyloading, setlazy] = useState(false);
  const propsNickName = useSelector((state) => state.nickname);
  const navigate = useNavigate();
  function logout() {
    authService.signOut();
    navigate("/");
  }

  useEffect(() => {
    setTimeout(() => {
      setlazy(true);
    }, 500);
  }, []);

  return (
    <>
      <header>
        {lazyloading === true ? (
          <>
            <p className="title">
              <Link to="/">{propsNickName.displayName}.log</Link>
            </p>
            <div
              className="menu"
              onClick={() => {
                setNavToggle(!navToggle);
              }}
            >
              <img src={propsNickName.photoURL} alt="" className="profile" />
              <img src="./img/arrow.svg" alt="" className="arrow" />
            </div>
          </>
        ) : null}
      </header>
      {navToggle ? (
        <>
          <ul className="sub_menu">
            <li>
              <Link to="/profile">설정</Link>
            </li>
            <li>
              <Link to="notice">공지사항</Link>
            </li>
            <li onClick={logout}>로그아웃</li>
          </ul>
        </>
      ) : null}
    </>
  );
}

export default Header;
