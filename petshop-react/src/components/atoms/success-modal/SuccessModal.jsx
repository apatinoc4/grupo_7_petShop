import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import "./SuccessModal.scss";

const SuccessModal = (props) => {
  const {
    successModalExpanded,
    setSuccessModalExpanded,
    setParentModalExpanded,
  } = props;
  const handleNestedModalExpansion = () => {
    setSuccessModalExpanded(false);
    setParentModalExpanded(false);
  };
  return (
    <div className="a-successmodal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={successModalExpanded}
        onClose={
          setParentModalExpanded
            ? () => handleNestedModalExpansion()
            : () => setSuccessModalExpanded(false)
        }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={successModalExpanded}>
          <Box className="MuiBox-successModal">
            <div className="a-successmodal-slogan">
              <div className="a-successmodal-contents">
                <p>Operación</p>
                <h3>Exitosa</h3>
                <p>Buen trabajo!</p>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SuccessModal;
