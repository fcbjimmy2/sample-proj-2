import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { IconButton, Modal, Grid } from '@mui/material';

// project imports
import MainCard from '../../../../../../src/components/extended/MainCard';
import GetStudentContent from './modal-content/GetStudentContent';

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

const Body = React.forwardRef(({ handleClose, setStudentInfo, intl }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      // style={modalStyle}
      title={intl.formatMessage({ id: 'Students' })}
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
      sx={{
        position: 'absolute',
        width: { xs: 380, lg: '50%' },
        minHeight: { xs: 380, lg: '65%' },
        top: '50%',
        left: '50%',
        padding: '25px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <GetStudentContent setStudentInfo={setStudentInfo} handleClose={handleClose} />
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  setStudentInfo: PropTypes.func,
  intl: PropTypes.object,
};

GetStudentList.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setStudentInfo: PropTypes.func,
};
// ==============================|| SIMPLE MODAL ||============================== //

export default function GetStudentList({ open, handleClose, setStudentInfo }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();
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
        <Body
          modalStyle={modalStyle}
          handleClose={handleClose}
          setStudentInfo={setStudentInfo}
          intl={intl}
        />
      </Modal>
    </Grid>
  );
}
