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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateFormModal from "../update-form/UpdateForm";
import WarningModal from "../../atoms/warning-modal/WarningModal";

const ProductCard = (props) => {
  const {
    currentUser,
    product,
    number,
    setShoppingCartExpanded,
    shoppingCart,
    setShoppingCart,
    updater,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const [updateModalExpanded, setUpdateModalExpanded] = useState(false);
  const handleExpanded = () => {
    setExpanded(!expanded);
  };
  const [warningModalExpanded, setWarningModalExpanded] = useState(false);
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
      <Accordion
        className={
          product.tipo_id === 1 ? "MuiAccordion-food" : "MuiAccordion-toy"
        }
        expanded={expanded}
        onChange={() => handleExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box className="MuiAccordionIndex">
            <p className="a-productcard-index">{number + 1}</p>
          </Box>
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
          <Box sx={{ width: "100%" }}>
            <div className="MuiAccordionDetails-description">
              <Typography>
                <span>Categoria: </span>
                {product.tipo_id === 1 ? "Alimento" : "Juguete"}
              </Typography>
              <Typography>{product.descripcion}</Typography>
            </div>
            <Divider orientation="vertical" flexItem />
            <Box className="MuiAccordionDetails-buyBox">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              <Button
                className="MuiButton-add"
                onClick={() => handleShoppingCartEdit(product)}
                startIcon={<AddShoppingCartIcon />}
                variant="contained"
              >
                Agregar
              </Button>
              <Button
                className="MuiButton-buy"
                onClick={() => setShoppingCartExpanded(true)}
                variant="contained"
              >
                Comprar
              </Button>

              {currentUser.admin === 1 ? (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    className="MuiButton-edit"
                    onClick={() => setUpdateModalExpanded(true)}
                    startIcon={<EditIcon />}
                    variant="contained"
                  >
                    Editar
                  </Button>
                  <Button
                    className="MuiButton-delete"
                    onClick={() => setWarningModalExpanded(true)}
                    startIcon={<DeleteIcon />}
                    variant="contained"
                  >
                    Eliminar
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <WarningModal
        warningModalExpanded={warningModalExpanded}
        setWarningModalExpanded={setWarningModalExpanded}
        updater={updater}
        id={product.id}
        deleting="product"
      />
      <UpdateFormModal
        updateModalExpanded={updateModalExpanded}
        setUpdateModalExpanded={setUpdateModalExpanded}
        updating={"product"}
        object={product}
        updater={updater}
      />
    </div>
  );
};

export default ProductCard;
