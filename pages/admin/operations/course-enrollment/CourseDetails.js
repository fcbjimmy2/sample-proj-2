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
} from '@mui/material';

// project imports
import MainCard from '../../../../src/components/extended/MainCard';
import InputLabel from '../../../../src/components/extended/InputLabel';

// third-party
import { useIntl } from 'react-intl';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

// import modal
import CourseEnrollment from './modal/CourseEnrollment';

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

const Body = React.forwardRef(
  ({ handleClose, rowDetails, intl, handleOpenEnroll, handleCloseEnroll, openEnroll }, ref) => (
    <div ref={ref} tabIndex={-1}>
      <Grid item xs={12}>
        <MainCard
          // style={modalStyle}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            // width: { xs: '80%', ms: '60%', lg: '60%' },
            width: { xs: '400px', sm: '600px', md: '992px', lg: '1140px' },
            height: { xs: 'calc(100% - 3.5rem)', lg: 'calc(100% - 3.5rem)' },
            top: '50%',
            left: '50%',
            padding: '25px',
            transform: 'translate(-50%, -50%)',
          }}
          headersx={{ marginBottom: '25px' }}
          title={intl.formatMessage({ id: 'course detail' })}
          content={false}
          secondary={
            <IconButton onClick={handleClose} size="large">
              <Icon icon={CloseIcon} />
            </IconButton>
          }
        >
          <CardContent sx={{overflowY: 'scroll'}}>
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
                md={6}
                lg={2.5}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Master Code' })}</InputLabel>
                <TextField
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.CourseMasterCode,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={2.5}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Code' })}</InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.CourseCode,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={2}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Type' })}</InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.CourseType,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Title' })}</InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.CourseTitle,
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Description' })}</InputLabel>
                <TextField
                  inputProps={{
                    style: {
                      height: '110px',
                    },
                    readOnly: true,
                    value: rowDetails.CourseDesc,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Remark' })}</InputLabel>
                <TextField
                  inputProps={{
                    style: {
                      height: '110px',
                    },
                    readOnly: true,
                    value: rowDetails.CourseRemark,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Teacher' })}</InputLabel>
                <TextField
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.Name,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Venue' })}</InputLabel>
                <TextField
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.VenueName,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Time' })}</InputLabel>
                <TextField
                  InputProps={{
                    readOnly: true,
                    value: rowDetails.CourseTime,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course Start Date' })}</InputLabel>
                <TextField
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: '#E4EFFF',
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    value: new Date(rowDetails.CourseStart).toLocaleDateString('en-CA', {
                      timeZone: 'GMT',
                    }),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Course End Date' })}</InputLabel>
                <TextField
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: '#E4EFFF',
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    value: new Date(rowDetails.CourseEnd).toLocaleDateString('en-CA', {
                      timeZone: 'GMT',
                    }),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Enrollment Start' })}</InputLabel>
                <TextField
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: '#E6F5E5',
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    value: new Date(rowDetails.CourseActiveDate).toLocaleDateString('en-CA', {
                      timeZone: 'GMT',
                    }),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Enrollment End' })}</InputLabel>
                <TextField
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: '#E6F5E5',
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    value: new Date(rowDetails.CourseDeactiveDate).toLocaleDateString('en-CA', {
                      timeZone: 'GMT',
                    }),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Private Remark' })}</InputLabel>
                <TextField
                  fullWidth
                  inputProps={{
                    style: {
                      height: '110px',
                    },
                    readOnly: true,
                    value: rowDetails.CourseInternalRemark,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Payment Method' })}</InputLabel>
                <TextField
                  fullWidth
                  inputProps={{
                    style: {
                      height: '110px',
                    },
                    readOnly: true,
                    value: !rowDetails.PriceString ? 'N/A' : rowDetails.PriceString + '',
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Price' })}</InputLabel>
                <TextField
                  inputProps={{
                    readOnly: true,
                    value: rowDetails.CoursePrice + '',
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  padding: '20px',
                }}
              >
                <InputLabel>{intl.formatMessage({ id: 'Status' })}</InputLabel>
                <TextField
                  inputProps={{
                    readOnly: true,
                    value: rowDetails.NumOfStudent + ' / ' + rowDetails.CourseQuota,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <InputLabel />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ mb: 2 }} />
          <CardActions>
            <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenEnroll}
                  size="large"
                  sx={{ fontSize: 20 }}
                >
                  {intl.formatMessage({ id: 'enroll' })}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </Grid>
      <CourseEnrollment open={openEnroll} handleClose={handleCloseEnroll} />
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  rowDetails: PropTypes.object,
  intl: PropTypes.any,
  handleOpenEnroll: PropTypes.func,
  handleCloseEnroll: PropTypes.func,
  openEnroll: PropTypes.bool,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function CourseDetails({ open, setOpen, handleClose, rowDetails }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();
  const [openEnroll, setOpenEnroll] = React.useState(false);

  const handleOpenEnroll = () => {
    setOpenEnroll(true);
  };

  const handleCloseEnroll = () => {
    setOpenEnroll(false);
  };

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
          handleOpenEnroll={handleOpenEnroll}
          handleCloseEnroll={handleCloseEnroll}
          openEnroll={openEnroll}
        />
      </Modal>
    </Grid>
  );
}
