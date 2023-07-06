import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
  InputAdornment,
  TextField,
  Grid,
  IconButton,
  Paper,
  Modal,
  Typography,
  Radio,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

// project imports
import MainCard from '../../MainCard';
import SubCard from '../../SubCard';

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';
import CloseIcon from '@iconify/icons-carbon/close';

// third-party
import { useIntl } from 'react-intl';

//table
import StudentListTable from './StudentListTable';

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

const Body = React.forwardRef(({ modalStyle, handleClose, intl, studentInfoHandler }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      sx={{
        position: 'absolute',
        width: { xs: '400px', sm: '600px', md: 880, lg: 880 },
        height: {
          xs: 'calc(100% - 16rem)',
          sm: 'calc(100% - 16rem)',
          md: 'calc(100% - 16rem)',
          lg: 'calc(100% - 16rem)',
        },
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        padding: '20px',
      }}
      title={intl.formatMessage({ id: 'students' })}
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
    >
      <StudentListTable studentInfoHandler={studentInfoHandler} handleClose={handleClose} />
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
};

export default function StudentListModal({ open, handleClose, studentInfoHandler }) {
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
          intl={intl}
          studentInfoHandler={studentInfoHandler}
        />
      </Modal>
    </Grid>
  );
}

StudentListModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  studentInfoHandler: PropTypes.func,
};
