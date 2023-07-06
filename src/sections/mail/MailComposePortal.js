import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Paper,
  Stack,
  Portal,
  Button,
  Divider,
  Backdrop,
  InputBase,
  IconButton,
  Typography,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../../components/Iconify';
import Editor from '../../components/editor';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import EmailList from '../../components/mail-to-custom';
// utils
import axios from '../../../src/utils/axios';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

const ZINDEX = 1998;

const POSITION = 24;

MailComposePortal.propTypes = {
  onCloseCompose: PropTypes.func,
  emailList: PropTypes.array,
};

export default function MailComposePortal({ onCloseCompose, emailList }) {
  const intl = useIntl();

  const isDesktop = useResponsive('up', 'sm');

  const [message, setMessage] = useState('');

  const [to, setTo] = useState([]);
  
  const [subject, setSubject] = useState('');

  const [fullScreen, setFullScreen] = useState(false);

  const handleChangeMessage = (value) => {
    setMessage(value);
  };
  
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleSend = async () => {
      var raw = JSON.stringify({
        "to": to,
        "subject": subject,
        "message": message
      });

      var data = '';
      await axios.post("/api/mail/mail", raw, { headers: {'Content-Type': 'application/json'} })
      .then((response) => { data = response.data; })
      .catch((error) => { console.log(error); });

      onCloseCompose();
  };

  return (
    <Portal>
      {(fullScreen || !isDesktop) && <Backdrop open sx={{ zIndex: ZINDEX }} />}

      <Paper
        sx={{
          right: 0,
          bottom: 0,
          borderRadius: 2,
          zIndex: ZINDEX + 1,
          m: `${POSITION}px`,
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: (theme) => theme.customShadows.dropdown,
          ...(fullScreen && {
            m: 0,
            right: POSITION / 2,
            bottom: POSITION / 2,
            width: `calc(100% - ${POSITION}px)`,
            height: `calc(100% - ${POSITION}px)`,
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {intl.formatMessage({id: 'Mail-New Message'})}
          </Typography>

          <IconButton onClick={() => setFullScreen(!fullScreen)}>
            <Iconify icon={fullScreen ? 'eva:collapse-fill' : 'eva:expand-fill'} />
          </IconButton>

          <IconButton onClick={onCloseCompose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        {/* <InputBase placeholder="To" sx={{ px: 2, height: 40 }} onChange={handleChangeTo} /> */}

      <Autocomplete
        disablePortal
        id="combo-box-to"
        options={emailList}
        getOptionLabel={(option) => option.name + ' <' + option.email + '>'}
        value={to}
        onChange={(event, newValue) => {
          setTo(newValue);
        }}
        sx={{ px: 2, height: 40 }}
        multiple={true}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, disableUnderline: true }} 
            variant="standard"
            placeholder={intl.formatMessage({id: 'Mail-To'})}
          />
        )}
      />

        <Divider />

        <InputBase placeholder={intl.formatMessage({id: 'Mail-Subject'})} sx={{ px: 2, height: 40 }} onChange={handleChangeSubject}  />

        <Divider />

        <Editor
          simple
          id="compose-mail"
          value={message}
          onChange={handleChangeMessage}
          placeholder={intl.formatMessage({id: 'Mail-Type a message'})}
          sx={{ flexGrow: 1, borderColor: 'transparent' }}
        />

        <Divider />

        <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleSend} disabled={!to || !subject || !message}>
            {intl.formatMessage({id: 'Mail-Send'})}
          </Button>

          {/* <IconButton>
            <Iconify icon="ic:round-add-photo-alternate" />
          </IconButton>

          <IconButton>
            <Iconify icon="eva:attach-2-fill" />
          </IconButton> */}
        </Stack>
      </Paper>
    </Portal>
  );
}
