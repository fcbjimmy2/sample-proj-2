import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Modal,
  Typography,
  Grid,
} from '@mui/material';

// project imports
import MainCard from '../../../../src/components/extended/MainCard';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';
//modal content
import ModalContent from './ModalContent';

// generate random
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Body = React.forwardRef(({ handleClose, rowCode }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      // style={modalStyle}
      title={`Classes of Course: ${rowCode}`}
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
      sx={{
        position: 'absolute',
        width: { xs: 380, lg: '60%' },
        minHeight: { xs: 380, lg: '65%' },
        top: '50%',
        left: '50%',
        padding: '25px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <ModalContent handleClose={handleClose} rowCode={rowCode} />
    </MainCard>
  </div>
));

// const deleted = (
//     <>
//         {' '}
//         <CardContent>
//             <Typography variant="body1">Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.</Typography>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//                 Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in mollit
//                 irure enim tempor in.
//             </Typography>
//         </CardContent>
//         <Divider />
//         <CardActions>
//             <SimpleModal />
//         </CardActions>
//     </>
// );

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  rowCode: PropTypes.string,
};

SimpleModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  rowCode: PropTypes.string,
};
// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleModal({ open, handleClose, rowCode }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Grid container justifyContent="flex-end">
      {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body modalStyle={modalStyle} handleClose={handleClose} rowCode={rowCode} />
      </Modal>
    </Grid>
  );
}
