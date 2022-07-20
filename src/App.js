import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import { authService, db, storageService } from "./Firebase";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Detail from "./components/Detail";
import Profile from "./components/Profile";
import Edit from "./components/Edit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function App() {
  const [init, setInit] = useState(false);
  const [Login, setLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  let [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
        setUserObj(user);
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);

  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
      let postArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postArray);
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
                element={
                  <Upload
                    user={userObj}
                    navigate={navigate}
                    db={db}
                    storageService={storageService}
                  />
                }
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
                element={
                  <Profile
                    user={userObj}
                    navigate={navigate}
                    db={db}
                    authService={authService}
                    storageService={storageService}
                  />
                }
              />
              <Route
                path="/edit"
                element={<Edit user={userObj} navigate={navigate} />}
              />
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
