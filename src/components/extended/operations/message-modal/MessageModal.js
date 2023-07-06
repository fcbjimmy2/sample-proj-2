import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { IconButton, Modal, Grid, Typography, Box } from '@mui/material';

// project imports
import MainCard from '../../MainCard';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

// third-party
import { useIntl } from 'react-intl';

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

const Body = React.forwardRef(({ handleClose, intl, message }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      // style={modalStyle}
      title={intl.formatMessage({ id: 'message' })}
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
      sx={{
        position: 'absolute',
        width: { xs: 380, lg: 480 },
        minHeight: { xs: 180, lg: 180 },
        top: '50%',
        left: '50%',
        padding: '25px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box sx={{ display: 'flex', height: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Typography>{message}</Typography>
      </Box>
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  setStudentInfo: PropTypes.func,
  intl: PropTypes.object,
  message: PropTypes.string,
};

MessageModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setStudentInfo: PropTypes.func,
  message: PropTypes.string,
};
// ==============================|| SIMPLE MODAL ||============================== //

export default function MessageModal({ open, handleClose, message }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();
  return (
    <Grid container justifyContent="flex-end">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body modalStyle={modalStyle} handleClose={handleClose} intl={intl} message={message} />
      </Modal>
    </Grid>
  );
}
