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
  InputLabel,
  TextField,
} from '@mui/material';

// project imports
import MainCard from '../MainCard';

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

const Body = React.forwardRef(({ modalStyle, handleClose, intl, contactDetails }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <MainCard
      sx={{
        position: 'absolute',
        maxWidth: { xs: 300, lg: '25% ' },
        minHeight: { xs: 900, lg: '20%' },
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      title={intl.formatMessage({ id: 'contact' })}
      content={false}
      secondary={
        <IconButton onClick={handleClose} size="large">
          <Icon icon={CloseIcon} />
        </IconButton>
      }
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            padding: '25px',
            color: 'black',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
          }}
        >
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: '20px',
            }}
          >
            <Typography>{intl.formatMessage({ id: 'name' })}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              padding: '20px',
            }}
          >
            <TextField
              InputProps={{
                readOnly: true,
                value: contactDetails.FirstName,
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: '20px',
            }}
          >
            <Typography>{intl.formatMessage({ id: 'mobile' })}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              padding: '20px',
            }}
          >
            <TextField
              InputProps={{
                readOnly: true,
                value: contactDetails.Mobile,
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: '20px',
            }}
          >
            <Typography>{intl.formatMessage({ id: 'email' })}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              padding: '20px',
            }}
          >
            <TextField
              InputProps={{
                readOnly: true,
                value: contactDetails.Email,
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: '20px',
            }}
          >
            <Typography>{intl.formatMessage({ id: 'emergency contact' })}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              padding: '20px',
            }}
          >
            <TextField
              InputProps={{
                readOnly: true,
                value: 'need to call show_student()',
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              padding: '20px',
            }}
          >
            <Typography>{intl.formatMessage({ id: 'emergency contact no' })}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            sx={{
              padding: '20px',
            }}
          >
            <TextField
              InputProps={{
                readOnly: true,
                value: 'need to call show_student()',
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
  contactDetails: PropTypes.object,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function StudentDetails({ open, handleClose, contactDetails }) {
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
        <Body
          modalStyle={modalStyle}
          handleClose={handleClose}
          intl={intl}
          contactDetails={contactDetails}
        />
      </Modal>
    </Grid>
  );
}

StudentDetails.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  contactDetails: PropTypes.object,
};
