import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../../cards/MainCard';
import {
  Box,
  Modal,
  TextField,
  Fade,
  Button,
  Grid,
  Typography,
  InputLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Class_Info_Modal from './Class_Info_Modal';
import Card_Modal from './Card_Modal';
import Billing_Info_Modal from './Billing_Info_Modal';
import Textfield from './form_grid/Textfield';

// third-party
import { useIntl } from 'react-intl';

// start of modal position functions
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// end of modal position functions

export default function Profile_Modal(props) {
  const theme = useTheme();
  const intl = useIntl();
  const [modalStyle] = React.useState(getModalStyle);
  const [disabled, setDisabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const [profileOpen, setProfileOpen] = useState(true);
  const [classInfoOpen, setClassInfoOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [billingInfoOpen, setBillingInfoOpen] = useState(false);
  const modalData = props.modalData;
  const isModalOpen = props.isModalOpen;
  const handleModalClose = () => {
    handleProfileOpen();
    setDisabled(true);
    props.handleModalClose();
  };

  const handleEditClick = () => {
    setDisabled(false); // set disabled state to false when edit button is clicked
  };

  const handleSaveClick = () => {
    // handle save button click and set disabled state back to true
    setSaved(true);

    setTimeout(() => {
      handleModalClose();
      setDisabled(true);
      setSaved(false);
    }, 1000);
  };

  const handleClassInfoOpen = () => {
    setClassInfoOpen(true);
    setCardOpen(false);
    setBillingInfoOpen(false);
    setProfileOpen(false);
  };

  const handleProfileOpen = () => {
    setClassInfoOpen(false);
    setCardOpen(false);
    setBillingInfoOpen(false);
    setProfileOpen(true);
  };

  const handleCardOpen = () => {
    setClassInfoOpen(false);
    setCardOpen(true);
    setBillingInfoOpen(false);
    setProfileOpen(false);
  };

  const handleBillingOpen = () => {
    setClassInfoOpen(false);
    setCardOpen(false);
    setBillingInfoOpen(true);
    setProfileOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      sx={{ backdropFilter: 'blur(5px)', overflow: 'scroll' }}
    >
      <Fade in={isModalOpen}>
        <div>
          <Grid item xs={12} lg={6}>
            {profileOpen && (
              <MainCard
                modalStyle={modalStyle}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  height: '90%',
                  width: '80%',
                  '.MuiCardContent-root': {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  },
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ overflowY: 'scroll' }}
                >
                  <Grid item xs={10}>
                    <Textfield
                      disabled={disabled}
                      fieldName={intl.formatMessage({ id: 'Student Code' })}
                      defaultValue={modalData?.user_guid}
                    />

                    <Grid
                      item
                      xs={12}
                      sm={3}
                      lg={4}
                      sx={{ pt: { xs: 2, sm: '0 !important' }, mt: 2 }}
                    >
                      <InputLabel>{intl.formatMessage({ id: 'English School' })}</InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={9} lg={6}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-label="english_school"
                          value={modalData?.english_school}
                          name="english_school"
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={intl.formatMessage({ id: 'Yes' })}
                            disabled={disabled}
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={intl.formatMessage({ id: 'No' })}
                            disabled={disabled}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel>{intl.formatMessage({ id: 'English Name' })}</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9} lg={6}>
                        <TextField
                          fullWidth
                          disabled={disabled}
                          defaultValue={modalData?.eng_name}
                        />
                      </Grid>

                      <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel>{intl.formatMessage({ id: 'Chinese Name' })}</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9} lg={6}>
                        <TextField
                          fullWidth
                          disabled={disabled}
                          defaultValue={modalData?.chin_name}
                        />
                      </Grid> */}

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3} lg={6}>
                        <InputLabel>{intl.formatMessage({ id: 'English Name' })}</InputLabel>
                        <TextField
                          fullWidth
                          disabled={disabled}
                          defaultValue={modalData?.eng_name}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={3} lg={6}>
                        <InputLabel>{intl.formatMessage({ id: 'Chinese Name' })}</InputLabel>
                        <TextField
                          fullWidth
                          disabled={disabled}
                          defaultValue={modalData?.chin_name}
                        />
                      </Grid>

                      {/* Repeat the above Grid items for additional attributes */}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={3}
                      lg={4}
                      sx={{ pt: { xs: 2, sm: '0 !important' }, mt: 2 }}
                    >
                      <InputLabel>{intl.formatMessage({ id: 'Date of Birth' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField fullWidth disabled={disabled} defaultValue={modalData?.dob} />
                    </Grid>

                    <Textfield
                      fieldName={intl.formatMessage({ id: 'Email' })}
                      disabled={disabled}
                      defaultValue={modalData?.email}
                    />

                    <Textfield
                      fieldName={intl.formatMessage({ id: 'Mobile' })}
                      disabled={disabled}
                      defaultValue={modalData?.student_phone}
                    />

                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>{intl.formatMessage({ id: 'Address' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField
                        multiline
                        rows={3}
                        fullWidth
                        disabled={disabled}
                        defaultValue={modalData?.address}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>{intl.formatMessage({ id: 'Emergency Contact' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField
                        fullWidth
                        disabled={disabled}
                        defaultValue={modalData?.emergency_contact}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>
                        {intl.formatMessage({ id: 'Emergency Contact Mobile' })}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField
                        fullWidth
                        disabled={disabled}
                        defaultValue={modalData?.emergency_contact_mobile}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>{intl.formatMessage({ id: 'School' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField fullWidth disabled={disabled} defaultValue={modalData?.school} />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>{intl.formatMessage({ id: 'Current Level' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField fullWidth disabled={disabled} defaultValue={modalData?.level} />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                      <InputLabel>{intl.formatMessage({ id: 'Remarks' })}</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        disabled={disabled}
                        defaultValue={modalData?.remark}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/*-------------------------- Buttons ----------------------------------*/}
                <Grid container justifyContent="center" alignItems="center" sx={{ pt: 3 }}>
                  {disabled ? (
                    <>
                      <Button variant="contained" sx={{ mr: 1 }} onClick={handleBillingOpen}>
                        {intl.formatMessage({ id: 'Billing Info' })}
                      </Button>
                      <Button variant="contained" sx={{ mr: 1 }} onClick={handleClassInfoOpen}>
                        {intl.formatMessage({ id: 'Class Info' })}
                      </Button>
                      <Button variant="contained" sx={{ mr: 1 }} onClick={handleCardOpen}>
                        {intl.formatMessage({ id: 'Card' })}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          background: theme.palette.error.main,
                          '&:hover': { background: theme.palette.error.dark },
                          ml: 5,
                        }}
                        onClick={handleEditClick}
                      >
                        {intl.formatMessage({ id: 'edit' })}
                      </Button>
                    </>
                  ) : !saved ? (
                    <Button variant="contained" onClick={handleSaveClick}>
                      {intl.formatMessage({ id: 'Save' })}
                    </Button>
                  ) : (
                    <Box textAlign="center" mt={2}>
                      <Typography color="primary">
                        {intl.formatMessage({ id: 'Student Updated' })}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </MainCard>
            )}
            {billingInfoOpen && (
              <Billing_Info_Modal
                profileOpen={handleProfileOpen}
                classInfoOpen={handleClassInfoOpen}
              />
            )}
            {classInfoOpen && (
              <Class_Info_Modal profileOpen={handleProfileOpen} billingOpen={handleBillingOpen} />
            )}
            {cardOpen && <Card_Modal profileOpen={handleProfileOpen} />}
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
