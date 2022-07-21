import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import "../asset/detail.scss";
import { useLocation } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import UseInput from "./hook/UseInput";
function Detail({ user, navigate, dispatch, db, storageService }) {
  const location = useLocation();
  const URLID = location.state.pageId;
  const [pageData, setPageData] = useState([]);
  const [FavoriteBtn, setFavoriteBtn] = useState(false);
  const [reply, setReply] = useState("");
  const [comment, setcomment] = UseInput("");
  const [fileNamed, setFileNamed] = useState();
  const [commentChange, setCommentChange] = useState(false);
  const [newComment, setNewComment] = UseInput("");
  const [imgLazy, setImageLazy] = useState(false);
  let clientWidths;
  let naturalWidths;

  const time = new Date();

  const timeData = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
  };

  useEffect(() => {
    db.collection("post")
      .doc(URLID)
      .onSnapshot((snapshot) => {
        let postArray = { ...snapshot.data() };
        setPageData(postArray);
      });
    let cookieCheck = document.cookie;
    if (cookieCheck === "Cookie=done") {
      setFavoriteBtn(true);
    } else {
      setFavoriteBtn(false);
    }
    //본문

    //리플
    db.collection("post")
      .doc(URLID)
      .collection("reply")
      .onSnapshot((replys) => {
        let replyArray = replys.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReply(replyArray);
      });
  }, []);

  function setCookie(name, value, expiredays) {
    time.setDate(time.getDate() + expiredays);
    document.cookie = `${name} = ${escape(
      value
    )}; expires =${time.toUTCString()};`;
  }

  async function onDelete(e) {
    e.preventDefault();
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    let locate = db.collection("post").doc(URLID);
    let storageRef = storageService.ref();
    if (ok) {
      reply.map(function (a, i) {
        locate.collection("reply").doc(reply[i].id).delete();
      });
      await locate.delete().then(() => {
        navigate("/");
      });
      if (fileNamed !== "") {
        fileNamed.map(function (a, i) {
          let imagesRef = storageRef.child(`${pageData.user}/${fileNamed[i]}`);
          imagesRef.delete();
        });
      }
    }
  }

  useEffect(() => {
    if (pageData.length !== 0) {
      setFileNamed(pageData.fileName);
    }
  }, [pageData]);

  return (
    <div className="detail_wrap">
      <Header user={user} />
      <div className="in_wrap">
        <section className="sub_header">
          <h1>{pageData.title}</h1>
          <div className="writer_wrap">
            <div className="left_wrap">
              <img src={pageData.profile} alt="" className="profile" />
              <p className="writer">{pageData.user}</p>
              <p className="date">{pageData.date}</p>
            </div>
            {user.uid === pageData.writer ||
            user.uid === "Lon5eQWCvHP8ZbwYZ4KHQYanV442" ? (
              <>
                <div className="right_wrap">
                  <button className="edit">수정</button>
                  <button className="delete" onClick={onDelete}>
                    삭제
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </section>
        <section className="content_wrap">
          <pre className="text">{pageData.text}</pre>
          <div className="grid">
            {/* {mapData
              .filter((value, idx, arr) => {
                return arr.findIndex((item) => item === value) === idx;
              })
              .map(function (url, i) {
                return <img src={url} className="att" alt="" key={i} />;
              })} */}
          </div>
          <div className="comment">
            <div className="favorite_wrap">
              <p className="com_title">게시글에 대한 댓글을 달아주세요.</p>
              <input
                type="checkbox"
                id="favorite_check"
                // onClick={(e) => {
                //   if (e.target.checked) {
                //     db.collection("post")
                //       .doc(쿼리스트링.get("id"))
                //       .update({
                //         favorite: pageData.favorite + 1,
                //       })
                //       .then(() => {
                //         setCookie("Cookie", "done", 1);
                //         setFavoriteBtn(true);
                //       });
                //   }
                // }}
              />
              {/* {favoriteBtn !== true ? (
                <>
                  <label htmlFor="favorite_check" className="favorite_btn">
                    <span>👍</span>추천&nbsp;{pageData.favorite}
                  </label>
                </>
              ) : (
                <div className="favorite_btn">
                  <span>👍</span>추천&nbsp;{pageData.favorite}
                </div>
              )} */}
            </div>
            {/* {reply.map(function (com, i) {
              return (
                <>
                  <div className="reply_wrap">
                    <div className="user_info">
                      <img src={com.profile} alt="" />
                      <div className="user_text">
                        <p className="reply_name">{com.replyrer}</p>
                        <p className="reply_date">{com.date}</p>
                      </div>
                      {user.uid === com.uids ? (
                        <>
                          <div className="edit_comment">
                            {commentChange === false ? (
                              <>
                                <div
                                  className="edit btns"
                                  data-index={i}
                                  onClick={edit_reply}
                                >
                                  수정
                                </div>
                              </>
                            ) : (
                              <div
                                className="edit btns"
                                data-index={i}
                                onClick={edit_end}
                              >
                                완료
                              </div>
                            )}
                            <div
                              className="delete btns"
                              data-index={i}
                              onClick={reply_delete}
                            >
                              삭제
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <p
                      className={`reply_text reply_text${i}`}
                      data-id={com.id}
                      data-index={i}
                    >
                      {com.comment}
                    </p>
                    <input
                      type="text"
                      className={`reply_input reply_input${i} form-control`}
                      placeholder={com.comment}
                      data-index={i}
                      data-id={com.id}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                </>
              );
            })} */}
            {/* <form onSubmit={commentUpload}>
              <TextareaAutosize
                cacheMeasurements
                onHeightChange={(height) => ""}
                minRows={4}
                className="comment_input"
                onChange={(e) => setcomment(e.target.value)}
              />
              <button className="btn">댓글 작성</button>
            </form> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Detail;
