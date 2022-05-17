import React from "react";
import "./Cover.scss";

const Cover = () => {
  return (
    <div className="m-cover">
      <div className="m-cover-opaquebg"></div>
      <div className="m-cover-clipbg"></div>
      <div className="m-cover-cornerbox">
        <div className="m-cover-coverimg">
          <img src={require("../../../assets/img/bannerImg1.png")} alt="" />
        </div>
        <div className="m-cover-slogan">
          <p>Bienvenido a la beta de:</p>
          <h2>PetShop</h2>
          <p>versión React</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
