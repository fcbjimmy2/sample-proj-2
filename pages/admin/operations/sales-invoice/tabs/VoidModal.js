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
  TextField,
  Typography,
} from '@mui/material';

// project imports
import MainCard from '../../../../../src/components/extended/MainCard';
import InputLabel from '../../../../../src/components/extended/InputLabel';

// third-party
import { useIntl } from 'react-intl';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

// import LinkTwoToneIcon from '@mui/icons-material/link';

// generate random
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const Body = React.forwardRef(({ modalStyle, handleClose }, ref) => (
//     <div ref={ref} tabIndex={-1}>
//         <MainCard
//             style={modalStyle}
//             sx={{
//                 position: 'absolute',
//                 width: { xs: 280, lg: 450 },
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)'
//             }}
//             title="Course Detail"
//             content={false}
//             secondary={
//                 <IconButton onClick={handleClose} size="large">
//                     <CloseIcon  />
//                 </IconButton>
//             }
//         >
//             <CardContent>
//                 <Typography variant="body1">Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.</Typography>
//                 <Typography variant="body2" sx={{ mt: 2 }}>
//                     Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
//                     mollit irure enim tempor in.
//                 </Typography>
//             </CardContent>
//             <Divider />
//             <CardActions>
//                 <SimpleModal />
//             </CardActions>
//         </MainCard>
//     </div>
// ));

const Body = React.forwardRef(({ handleClose, rowDetails, intl }, ref) => (
  <div ref={ref} tabIndex={-1}>
    <Grid item xs={12}>
      <MainCard
        // style={modalStyle}
        sx={{
          position: 'absolute',
          width: { xs: 380, lg: '40%' },
          height: { xs: 480, lg: '40%' },
          top: '50%',
          left: '50%',
          padding: '25px',
          transform: 'translate(-50%, -50%)',
        }}
        headersx={{ marginBottom: '15px' }}
        title={`${intl.formatMessage({ id: 'Void invoice' })} # ${rowDetails}`}
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
            spacing={1}
            alignItems="center"
            sx={{
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
            <Grid item xs={12} lg={12}>
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                multiline
                rows={4}
                fullWidth
                defaultValue="Reason"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container alignItems="center" justifyContent="center" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="info"
                sx={{ marginRight: 2, fontSize: 20 }}
                onClick={handleClose}
              >
                {intl.formatMessage({ id: 'cancel' })}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ marginRight: 2, fontSize: 20 }}>
                {intl.formatMessage({ id: 'confirm' })}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </MainCard>
    </Grid>
  </div>
));

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  rowDetails: PropTypes.string,
  intl: PropTypes.any,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function VoidModal({ open, handleClose, rowDetails }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //     setOpen(true);
  // };

  // const handleClose = () => {
  //     setOpen(false);
  // };

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
          rowDetails={rowDetails}
          intl={intl}
        />
      </Modal>
    </Grid>
  );
}
