import React from "react";
import "./AboutUs.scss";
import DevCard from "../../atoms/dev-card/DevCard";

const AboutUs = () => {
  const mazo = {
    name: "Andrés Mazo",
    title: "Don Gorangutan",
    pictureName: "Mazo.PNG",
    description:
      'Ingeniero de sonido, director de proyectos de audio y acústica arquitectónica, Lider de su propia banda "Gorangutan" y combate el crimen por las noches.',
  };
  const patino = {
    name: "Andrés Patiño",
    title: "El Andy",
    pictureName: "Patino.PNG",
    description:
      "Ingeniero de diseño de producto, desarrollador front-end, amante de las hamburguesas, se sabe los primeros 151 Pokemones de memoria.",
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
