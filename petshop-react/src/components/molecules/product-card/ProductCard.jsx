import { React, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./ProductCard.scss";
import QuantityInput from "../../atoms/quantity-input/QuantityInput";

const ProductCard = (props) => {
  const {
    product,
    number,
    setShoppingCartExpanded,
    shoppingCart,
    setShoppingCart,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const handleExpanded = () => {
    setExpanded(!expanded);
  };
  const [quantity, setQuantity] = useState(0);
  const handleShoppingCartEdit = (item) => {
    if (quantity > 0 && !shoppingCart.find((elem) => elem.id === item.id)) {
      setShoppingCart([...shoppingCart, { ...item, cantidad: quantity }]);
      console.log(shoppingCart);
    } else if (
      quantity > 0 &&
      shoppingCart.find(
        (elem) => elem.id === item.id && elem.cantidad !== quantity
      )
    ) {
      let modifiedCart = [...shoppingCart];
      const existingIndex = modifiedCart.indexOf(
        modifiedCart.find((elem) => elem.id === product.id)
      );

      modifiedCart[existingIndex] = { ...product, cantidad: quantity };
      setShoppingCart(modifiedCart);
    } else if (
      shoppingCart.find(
        (elem) => elem.id === item.id && elem.cantidad !== quantity
      ) &&
      quantity === 0
    ) {
      const shoppingCartDeletedProduct = shoppingCart.filter(
        (elem) => elem.id !== product.id
      );
      setShoppingCart(shoppingCartDeletedProduct);
    }
  };
  return (
    <div className="a-productcard-container">
      <Accordion expanded={expanded} onChange={() => handleExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p className="a-productcard-index">{number + 1}</p>
          <div className="a-productcard-productimage">
            <img
              src={require(`../../../../../public/img/productos/${product.imagen}`)}
              alt="img"
            />
          </div>
          <Typography
            className="MuiAccordionSummary-name"
            sx={{ width: "60%", flexShrink: 0 }}
          >
            {product.nombre}
          </Typography>
          <Typography
            className="MuiAccordionSummary-price"
            sx={{ color: "text.secondary" }}
          >
            ${product.precio}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography sx={{ width: "50%", flexShrink: 0 }}>
              {product.descripcion}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Box className="MuiAccordionDetails-buyBox">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              <Button
                onClick={() => handleShoppingCartEdit(product)}
                startIcon={<AddShoppingCartIcon />}
                variant="contained"
              >
                Agregar
              </Button>
              <Button
                onClick={() => setShoppingCartExpanded(true)}
                variant="contained"
              >
                Comprar
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductCard;
