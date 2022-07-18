import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import { authService, db } from "./Firebase";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Detail from "./components/Detail";
import Profile from "./components/Profile";
import Edit from "./components/Edit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Notice from "./components/Notice";
import { NickAction } from "./module/reducer";
function App() {
  const [init, setInit] = useState(false);
  const [Login, setLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
        setUserObj(user);
        dispatch(NickAction(user))
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        {init ? (
          Login ? (
            <>
              <Route path="/" element={<Home user={userObj} />} />
              <Route
                path="/upload"
                element={<Upload user={userObj} navigate={navigate} />}
              />

              <Route
                path="/detail"
                element={
                  <Detail
                    user={userObj}
                    navigate={navigate}
                    dispatch={dispatch}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile user={userObj} navigate={navigate} />}
              />
              <Route
                path="/edit"
                element={<Edit user={userObj} navigate={navigate} />}
              />
              <Route path="/notice" element={<Notice />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Sign authService={authService} />} />
              <Route
                path="/Auth"
                element={
                  <Auth navigate={navigate} authService={authService} db={db} />
                }
              />
            </>
          )
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}

export default App;
