import React from "react";
import "./DevCard.scss";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

const DevCard = (props) => {
  const { orientation, dev } = props;
  const { pictureName, name, title, description, linkedin, ig, gh } = dev;
  const iconSize = "65px";

  return (
    <div className={`a-devcard ${orientation === "left" ? "left" : "right"}`}>
      <div className="a-devcard-info">
        <h3>{name}</h3>
        <p className="a-devcard-title">{title}</p>
        <p className="a-devcard-description">{description}</p>
        <div className="a-devcard-buttons">
          <IconButton
            href={linkedin}
            ttarget="_blank"
            className="MuiSocialMedia"
          >
            <LinkedInIcon target="_blank" sx={{ fontSize: iconSize }} />
          </IconButton>
          <IconButton href={gh} target="_blank" className="MuiSocialMedia">
            <GitHubIcon sx={{ fontSize: iconSize }} />
          </IconButton>
          <IconButton href={ig} target="_blank" className="MuiSocialMedia">
            <InstagramIcon sx={{ fontSize: iconSize }} />
          </IconButton>
        </div>
      </div>
      <div className="a-devcard-picture">
        <img src={require(`../../../assets/img/${pictureName}`)} alt="" />
      </div>
    </div>
  );
};

export default DevCard;
