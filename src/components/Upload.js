import React, { useEffect, useState } from "react";
import "../asset/upload.scss";
import TextareaAutosize from "react-textarea-autosize";
import UseInput from "./hook/UseInput";
function Upload({ db, storageService, user, navigate }) {
  const [title, setTitle] = UseInput("");
  const [posts, setPosts] = useState([]);
  const [textarea, setTextarea] = UseInput("");
  const [preview, setPreview] = useState([]);
  const [filename, setFileName] = useState([]);

  const timeData = {
    time: new Date(),
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
  };

  const maxPost = 10000;

  return (
    <div className="upload">
      <form onSubmit={post}>
        <input
          type="text"
          className="form-control titlearea"
          id="title"
          placeholder="제목을 입력하세요."
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="textarea">
          <TextareaAutosize
            cacheMeasurements
            contenteditable="true"
            onHeightChange={(height) => console.log(height)}
            className="text"
            placeholder="당신의 이야기를 적어보세요."
            onChange={(e) => setTextarea(e.target.value)}
          />
          <figure>
            {preview &&
              preview.map(function (url, i) {
                return <img src={url} alt="" className="att" key={i}></img>;
              })}
          </figure>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-form"
          id="image"
          onChange={onFileChange}
        />
        <label htmlFor="image" className="Attachment image-att">
          이미지를 담아주세요
        </label>
        <p className="warnning">※ 이미지를 한번에 업로드 해주세요. (하나씩X)</p>
        <div className="bottom_wrap">
          <div
            className="exit"
            onClick={() => {
              navigate("/");
            }}
          >
            ← &nbsp;나가기
          </div>
          <div className="cancel_wrap">
            {title !== "" && textarea !== "" ? (
              <button type="submit" className="post" onClick={reset}>
                글작성
              </button>
            ) : (
              <div
                className="none_text post"
                onClick={() => {
                  window.alert("제목과 내용을 다 입력하셨는지 확인해주세요");
                }}
              >
                글작성
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Upload;
