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
  Radio,
  Avatar,
} from '@mui/material';

// project imports
import MainCard from '../../../../../src/components/extended/MainCard';
import TeacherList from './teacher-list';
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

const Body = React.forwardRef(({ modalStyle, handleCloseTeacherModal, intl }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      sx={{
        position: 'absolute',
        maxWidth: { xs: 300, lg: 500 },
        minHeight: { xs: 900, lg: 500 },
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      title={intl.formatMessage({ id: 'Change Teacher' })}
      content={false}
      secondary={
        <IconButton onClick={handleCloseTeacherModal} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
    >
      <TeacherList handleCloseTeacherModal={handleCloseTeacherModal} />
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function ChangeTeacherModal({ open, handleCloseTeacherModal }) {
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
        onClose={handleCloseTeacherModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleCloseTeacherModal={handleCloseTeacherModal}
          intl={intl}
        />
      </Modal>
    </Grid>
  );
}
