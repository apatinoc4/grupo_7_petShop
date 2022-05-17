import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ShoppingCart = (props) => {
  const { shoppingCartExpanded, setShoppingCartExpanded, shoppingCart } = props;
  const [transaction, setTransaction] = useState(false);

  const subTotal = shoppingCart
    .map(({ precio, cantidad }) => precio * cantidad)
    .reduce((sum, i) => sum + i, 0);
  const taxRate = 0.19;
  const transactionTaxes = taxRate * subTotal;

  const handleCloseModal = () => {
    setShoppingCartExpanded(false);
    setTransaction(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={shoppingCartExpanded}
        onClose={() => handleCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={shoppingCartExpanded}>
          <Box>
            {!transaction ? (
              <>
                <p>Estos son los detalles de tu compra:</p>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Total Producto</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shoppingCart.map((elem, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell align="right">{elem.nombre}</TableCell>
                          <TableCell align="right">{elem.cantidad}</TableCell>
                          <TableCell align="right">${elem.precio}</TableCell>
                          <TableCell align="right">
                            ${elem.precio * elem.cantidad}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">${subTotal}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell>IVA</TableCell>
                        <TableCell align="right">{`${(taxRate * 100).toFixed(
                          0
                        )} %`}</TableCell>
                        <TableCell align="right">
                          ${Math.floor(transactionTaxes)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                          ${subTotal + transactionTaxes}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  onClick={() => setTransaction(true)}
                  variant="contained"
                >
                  Comprar
                </Button>
              </>
            ) : (
              <>
                <p>Muchas gracias por tu compra!</p>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
