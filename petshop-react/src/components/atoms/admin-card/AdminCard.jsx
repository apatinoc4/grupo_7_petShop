import { React } from "react";
import "./AdminCard.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";

const AdminCard = (props) => {
  const { option } = props;
  const { title, description, img, links } = option;
  return (
    <Link to={links === "users" ? "#user-list" : "#product-list"} smooth>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={require(`../../../assets/img/${img}`)}
            alt="bannerImage"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={title}>
          <Button size="small" color="primary">
            Comencemos
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default AdminCard;
