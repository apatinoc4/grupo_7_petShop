import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

const SuccessModal = (props) => {
  const { successModalExpanded, setSuccessModalExpanded } = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={successModalExpanded}
      onClose={() => setSuccessModalExpanded(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={successModalExpanded}>
        <Box className="MuiBox-shoppingCart">
          <p>Elemento creado</p>
          <p>Exitosamente</p>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;
