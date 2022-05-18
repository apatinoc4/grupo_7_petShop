import React from "react";
import "./AboutUs.scss";
import DevCard from "../../atoms/dev-card/DevCard";

const AboutUs = () => {
  const mazo = {
    name: "Andrés Mazo",
    title: "Don Gorangutan",
    pictureName: "Mazo.PNG",
  };
  const patino = {
    name: "Andrés Patiño",
    title: "El Andy",
    pictureName: "Patino.PNG",
  };
  return (
    <div className="m-aboutus">
      <div className="m-aboutus-cornerbox">
        <div className="m-aboutus-title">
          <h2>El Equipo</h2>
        </div>
        <div className="m-aboutus-devcards">
          <DevCard dev={mazo} orientation="left" />
          <DevCard dev={patino} orientation="right" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
