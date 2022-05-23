import { React, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import "./WarningModal.scss";
import ReportIcon from "@mui/icons-material/Report";
import Button from "@mui/material/Button";
import SuccessModal from "../success-modal/SuccessModal";

const WarningModal = (props) => {
  const {
    warningModalExpanded,
    setWarningModalExpanded,
    updater,
    id,
    deleting,
  } = props;
  const [successModalExpanded, setSuccessModalExpanded] = useState(false);

  const handleProductDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `/api/producto/${id}/eliminar`,
      requestOptions
    );

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  const handleUserDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/usuario/${id}/eliminar`, requestOptions);

    if (response.status === 200) {
      setSuccessModalExpanded(true);
    }

    updater();
  };

  return (
    <div className="a-warningmodal">
      <Modal
        open={warningModalExpanded}
        onClose={() => setWarningModalExpanded(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={warningModalExpanded}>
          <Box className="MuiBox-warningModal">
            <ReportIcon />
            <div>
              <p className="a-warningmodal-title">Cuidado!</p>
              <p>Esta operación no es reversible, estas seguro?</p>
              <Button
                onClick={
                  deleting === "user"
                    ? () => handleUserDelete()
                    : () => handleProductDelete()
                }
                className="MuiButton-agreecontinue"
                variant="contained"
              >
                Entiendo, deseo continuar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <SuccessModal
        successModalExpanded={successModalExpanded}
        setSuccessModalExpanded={setSuccessModalExpanded}
        setParentModalExpanded={setWarningModalExpanded}
      />
    </div>
  );
};

export default WarningModal;
