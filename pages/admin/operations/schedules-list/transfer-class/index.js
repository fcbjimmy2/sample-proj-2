import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  TextField,
  FormHelperText,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';

// project imports
import MainCard from '../../../../../src/components/extended/MainCard';
// import InputLabel from '../../../../../src/components/extended/InputLabel';

import StudentTransfer from './student-transfer';

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

const Body = React.forwardRef(
  ({ modalStyle, handleCloseTransferClassModal, transferClassStudents, intl }, ref) => (
    <div ref={ref} tabIndex={-1}>
      <MainCard
        sx={{
          position: 'absolute',
          width: { xs: 350, lg: 650 },
          minheight: { xs: 380, lg: '40%' },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        title={intl.formatMessage({ id: 'Student(s)' })}
        content={false}
        secondary={
          <IconButton onClick={handleCloseTransferClassModal} size="large">
            <Icon icon={CloseIcon} />
          </IconButton>
        }
      >
        <StudentTransfer transferClassStudents={transferClassStudents} />
      </MainCard>
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleCloseTransferClassModal: PropTypes.func,
  transferClassStudents: PropTypes.array,
  intl: PropTypes.any,
};

// ==============================|| SIMPLE MODAL ||============================== //
TransferClass.propTypes = {
  open: PropTypes.bool,
  handleCloseTransferClassModal: PropTypes.func,
  transferClassStudents: PropTypes.array,
};

export default function TransferClass({
  open,
  handleCloseTransferClassModal,
  transferClassStudents,
}) {
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
        onClose={handleCloseTransferClassModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleCloseTransferClassModal={handleCloseTransferClassModal}
          transferClassStudents={transferClassStudents}
          intl={intl}
        />
      </Modal>
    </Grid>
  );
}
